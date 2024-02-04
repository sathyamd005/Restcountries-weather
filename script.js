// creating a container for displaying the countries  data
let container = document.createElement("div");
container.setAttribute("class", "container");

// creating a row
let row = document.createElement("div");
row.setAttribute("class", "row");
row.style.margin = "30px";

// declaring countries array to store fetched data
let countries = [];

// appending row into a container
container.append(row);

async function foo() {
    let res = await fetch("https://restcountries.com/v2/all");
    countries = await res.json(); // store data in the countries array
    return fun(countries);
}

async function bar(index) {
    let country = countries[index];
    let res1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.name}&appid=04e30ae6d6f70e345abc60348896ebd5`);
    res1 = await res1.json();
    const weatherInfo = `
        Temperature: ${res1.main.temp}°C
        Feels Like: ${res1.main.feels_like}°C
        Min Temperature: ${res1.main.temp_min}°C
        Max Temperature: ${res1.main.temp_max}°C
        Pressure: ${res1.main.pressure} hPa
        Humidity: ${res1.main.humidity}%
    `;
    alert(weatherInfo);
}

function fun(res) {
    for (let i in res) {
        row.innerHTML += `
        <div class="col-lg-4 col-sm-12">
            <div class="card bg-light mb-3 text-center" style="max-width: 35rem;">
                <div class="card-header bg-dark text-white">${res[i].name}</div>
                <div style=" background-image: linear-gradient(to right,rgb(250, 247, 247),rgb(5, 16, 16));">
                    <img src="${res[i].flags.svg}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">Capital: ${res[i].capital}</p>
                        <p class="card-text">Region: ${res[i].region}</p>
                        <p class="card-text">Countrycode: ${res[i].cioc}</p>
                        <div class="card-footer border-white">
                            <button class="btn btn-primary" type="button" onclick="bar(${i})">Click for Weather</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.body.append(container);
}

foo();
