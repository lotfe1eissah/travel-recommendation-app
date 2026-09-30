document.getElementById('btnSearch').addEventListener('click', searchCondition);
document.getElementById('btnClear').addEventListener('click', clearSearch);

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase().trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!input) {
        resultDiv.innerHTML = '<p style="color: white;">Please enter a search term (e.g. beach, temple, or Australia).</p>';
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let found = false;

            // Search Beaches
            if (input.includes('beach')) {
                data.beaches.forEach(item => {
                    displayCard(item.name, item.imageUrl, item.description);
                });
                found = true;
            } 
            // Search Temples
            else if (input.includes('temple')) {
                data.temples.forEach(item => {
                    displayCard(item.name, item.imageUrl, item.description);
                });
                found = true;
            } 
            // Search Countries or Specific City/Country
            else {
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(input) || input.includes('country')) {
                        country.cities.forEach(city => {
                            displayCard(city.name, city.imageUrl, city.description);
                        });
                        found = true;
                    }
                });
            }

            if (!found) {
                resultDiv.innerHTML = '<p style="color: white;">No results found. Try searching for "beach", "temple", or "Australia".</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching recommendations:', error);
            resultDiv.innerHTML = '<p style="color: white;">Failed to load data. Please try again.</p>';
        });
}

function displayCard(name, imgUrl, description) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML += `
        <div class="card">
            <img src="${imgUrl}" alt="${name}">
            <div class="card-details">
                <h3>${name}</h3>
                <p>${description}</p>
                <button>Visit</button>
            </div>
        </div>
    `;
}

function clearSearch() {
    document.getElementById('conditionInput').value = '';
    document.getElementById('result').innerHTML = '';
}