window.onload = function() {
    maintainMode();
    loadFlag();
    loadCurrencies();
    loadCountryCodes();

   
   };
   let score = 0;
   let tries = 0;


   //GAME
   loadFlag = () => {
       let apiURL =`https://restcountries.eu/rest/v2/all`;
       fetch(apiURL)
       .then((data) => {
           if(data.ok){
               return data.json()
            }
            throw new Error ("Fetch response not ok");
        })
        .then((data) =>{
            let i = Math.floor((Math.random() * (data.length))) ;
            let country = data[i].name.toLowerCase();
            let countryAbr = data[i].alpha2Code;
            document.getElementById('tries').innerHTML = ` <p id = "tries"> Tries: ${tries}/25</p>`;
            document.getElementById("flagImageDiv").innerHTML = `<img src='${data[i].flag}' id = "countryFlag" data-country = "${country}" width = "200" height = "100"></img>`;
            let differentFlagButton = document.getElementById('differentFlag');
            differentFlagButton.disabled = true;
        })
        .catch((error) => console.log("Error", error))
   }

    let gameInput = document.getElementById('gameInput')
    gameInput.addEventListener('keyup', (e) => {
        if(e.keyCode === 13){
            gameInput.disabled = true;
            tries ++;
            let differentFlagButton = document.getElementById('differentFlag');
            differentFlagButton.disabled = false;
            let country = document.getElementById('countryFlag').getAttribute("data-country")
            if ((e.target.value).toLowerCase() === country ){
                document.getElementById("messageDiv").innerHTML =`<p>Correct!</p>`;
                document.getElementById('tries').innerHTML = ` <p id = "tries">Tries: ${tries}/25</p>`;
                score ++;
            } else {
                document.getElementById("messageDiv").innerHTML = `<p>Incorrect! Right Answer: ${country.toUpperCase()}</p>`;
                document.getElementById('tries').innerHTML = ` <p id ="tries">Tries: ${tries}/25</p>`;
            }

        if (tries == 25){
            document.getElementById("messageDiv").innerHTML = `Game Over! Score: ${score}/25`;
            tries = 0;
            score=0;
        }
        }
    })

   let differentFlag = document.getElementById('differentFlag')
   differentFlag.addEventListener('click', (e) => {
       let gameInput = document.getElementById("gameInput");
       if (gameInput.disabled == true){
           document.getElementById("messageDiv").innerHTML = "";
           gameInput.disabled = false;
           gameInput.value = '';
           loadFlag();
        }
   })

   // MAINTAIN MODE
   maintainMode = () => {
       let maintainMode = localStorage.getItem("colorMode");
       let body = document.getElementById('body');
       if(maintainMode == 'darkMode') {
           if(body.classList.contains('lightMode')) {
               body.classList.remove('lightMode');
               body.classList.add('darkMode');
            }
        } else {
            if(body.classList.contains('darkMode')) {
                body.classList.remove('darkMode');
                body.classList.add('lightMode');
            }
        }
   }

   // MODE BUTTONS
   let darkModeButton = document.getElementById('darkMode');
   darkModeButton.addEventListener('click', (e) =>{
       localStorage.setItem("colorMode", event.target.id);
       let body = document.getElementById('body');
       if(event.target.id == 'darkMode') {
           if(body.classList.contains('lightMode')) {
               body.classList.remove('lightMode');
               body.classList.add('darkMode');
            }
        } else {
            if(body.classList.contains('darkMode')) {
                body.classList.remove('darkMode');
                body.classList.add('lightMode');
            }
        }
   });


   let lightModeButton = document.getElementById('lightMode');
   lightModeButton.addEventListener('click', (e) =>{
       let body = document.getElementById('body');
       localStorage.setItem("colorMode", event.target.id);
       if(event.target.id == 'darkMode') {
           if(body.classList.contains('lightMode')) {
               body.classList.remove('lightMode');
               body.classList.add('darkMode');
            }
        } else {
            if(body.classList.contains('darkMode')) {
                body.classList.remove('darkMode');
                body.classList.add('lightMode');
            }
        }
   });


   //UNSPLASH API
   let unsplashApiPath = 'https://api.unsplash.com/search/photos?query=';
   let unsplashApiKey = '&client_id=_mgJeiuLpytr_wDgnrNvv6aMDHlokOb5zW2pmJr1lDY';
   let photoSearch = document.getElementById('photoSearch')
   photoSearch.addEventListener('keyup', (e) => {
       if(e.keyCode === 13){
           let imageGallery = document.getElementById('imageGallery');
           while (imageGallery.firstChild) {
               imageGallery.removeChild(imageGallery.firstChild);
            }

        let country = e.target.value
        let unsplashApiURL = `${unsplashApiPath}${country}${unsplashApiKey}`
        fetch(unsplashApiURL)
        .then((data) => {
            if(data.ok){
                return data.json()
            }
            throw new Error ("Fetch response not ok");
            
        })
        .then((data) => {
            data.results.forEach((photo) =>{
                let html = `<div class="photo"><img src="${photo.urls.regular}"></div>`;
                $("#imageGallery").append(html)
            })
        })
        .catch((error) => console.log("Error", error))
   
        }
    })


   let weatherApiPath ="http://api.weatherapi.com/v1/forecast.json?key=c380e05b4316423c83e223849211308&q="
   let days = "&days=7"
   let weatherSearch = document.getElementById('weatherSearch')
   weatherSearch.addEventListener('keyup', (e) => {
       if(e.keyCode === 13){
           let weatherGallery = document.getElementById('weatherGallery');
           while (weatherGallery.firstChild) {
               weatherGallery.removeChild(weatherGallery.firstChild);
            }
        let city = e.target.value
        let weatherApiURL = `${weatherApiPath}${city}${days}`;
        console.log(weatherApiURL)
        fetch(weatherApiURL)
        .then((data) => {
            console.log(data)
            if(data.ok){
                return data.json()
            }
            throw new Error ("Fetch response not ok");
        })
        .then((data) =>{
            for (let i =0; i < data.forecast.forecastday.length; i++) {
                let html = `
                <div class = "weatherCard">
                <img class="weatherIcon" src ="${data.forecast.forecastday[i].day.condition.icon}">
                <p>Date: ${data.forecast.forecastday[i].date}</p>
                <p>Daily Avergae: ${data.forecast.forecastday[i].day.avgtemp_f}</p>
                <p>Chance of Rain: ${data.forecast.forecastday[i].day.daily_chance_of_rain}</p>
                </div>`;
                $("#weatherGallery").append(html)
            }
        })
        .catch((error) => console.log("Error", error))
        }
    })


   loadCurrencies = () => {
       let apiURL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`
        fetch(apiURL)
        .then((data) => {
            if(data.ok){
                return data.json()
            }
            throw new Error ("Fetch response not ok");
        })
        .then((data) =>{
            for (let prop in data) {
                let html = `<option value = "${prop}" > "${data[prop]}"</option>`
                $("#currencyList").append(html)
        }
        })
        .catch((error) => console.log("Error", error))
    }

    loadCountryCodes = () => {
            let apiURL =`https://www.travel-advisory.info/api`
            fetch(apiURL)
            .then((data) => {
                if(data.ok){
                    return data.json()
                }
                throw new Error ("Fetch response not ok");
            })
            .then((dataa) =>{
                for (let prop in dataa.data) {
                    let html = `<option value = "${prop}" id = "optionId" > "${dataa.data[prop].name}"</option>`
                    $("#countryCodeList").append(html)
            }
            })
            .catch((error) => console.log("Error", error))
        }



   let convertButton = document.getElementById('convert')
   convertButton.addEventListener('click', (e) => {
        let apiPath = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/`;
        let to = document.getElementById('to');
        let from = document.getElementById('from');
        apiFrom = `${from.value}/`;
        apiTo = `${to.value}.json` ;
        apiURL = apiPath + apiFrom + apiTo;
        if (from.value != "" & to.value != ""){
            fetch(apiURL)
            .then((data) => {
                if(data.ok){
                    return data.json()
                }
                throw new Error ("Fetch response not ok");
            })
            .then((data) =>{
                document.getElementById('currencyMessageDiv').innerHTML = `1 ${from.value} = ${data[`${to.value}`]}${to.value}`;
            })
            .catch((error) => console.log("Error", error))
        }
   })

   let safetyButton = document.getElementById('safety')
   safetyButton.addEventListener('click', (e) => {
        let apiPath = `https://www.travel-advisory.info/api?countrycode=`;
        countryCode = document.getElementById('newsSearch')
        countryCodeA = `${countryCode.value}` ;
        apiURL = apiPath + countryCodeA;
        if (countryCode.value != ""){
            fetch(apiURL)
            .then((data) => {
                if(data.ok){
                    return data.json()
                }
                throw new Error ("Fetch response not ok");
            })
            .then((dataa) =>{
                document.getElementById('newsGallery').innerHTML = `${dataa.data[`${countryCodeA}`].advisory.message}`;
            })
            .catch((error) => console.log("Error", error))
        }
   })




   
