$("document").ready(function () {

    $("#go").click(cd);

    function cd() {
        let city = $("#city").val();
        
        
        $("#out").html(`The current weather for ${($("#city").val().toUpperCase())}`);

        // these are the fields for which we are getting the weather information
        // we could get more depending on what we want to display an what the api
        // has to offer i.e the returned object from the api 
        let dataName = ["clouds", "pressure", "sunrise", "sunset", "temp", "weather", "visibility", "windSpeed"];
        
        
        const current = getData(city);
        // we change the source (src) attribute of each image after getting the
        // image from the url. The url returned is the link to gif only for 
        // the the user who has api key.

        $("#weather").attr("src", imageUrl(current[5]));
        $("#clouds").attr("src", imageUrl("clouds"));
        $("#pressure").attr("src", imageUrl("pressure"));
        $("#sunrise").attr("src", imageUrl("sunrise"));
        $("#sunset").attr("src", imageUrl("sunset"));
        $("#temp").attr("src", imageUrl("temperature"));
        $("#wind_speed").attr("src", imageUrl("storm"));
        $("#visibility").attr("src", imageUrl("look"));

        for (let i = 0; i < current.length; i++) {
            $(`#${dataName[i]}Val`).html(`${dataName[i]} = ${current[i]}`)
        }
        // default display of allImages (the div in html) is set to be none;

        $("#allImages").css("display", "block")
    }

    function getData(city) {
        let objstr = new XMLHttpRequest();
        let lat = 0;
        let lon = 0;

// Add your api key. You can get api key from https://openweathermap.org/api 
//  You may have to sign in to get the api key.  When you have it, add that 
// api key as a string in api_key variable.
// this api also has some limits to number of calls per minute.
// but for a single user it should be fine. ( developer practice).

        let api_key = "YOUR API KEY";  // it will look somethin like
        // "g2621eeabd0q6b470e1b75w9a48d020b"
        objstr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`, false);
        objstr.send();
        let obj = JSON.parse(objstr.response);
        // let obj = JSON.parse(result);
        lon = obj.coord.lon;
        lat = obj.coord.lat;
        console.log(obj);
        return Current(lat, lon);
    }

    function Current(lat, lon) {
        let objstr2 = new XMLHttpRequest();
// Add your api key. You can get api key from https://openweathermap.org/api 
//  You may have to sign in to get the api key.  When you have it, add that 
// api key as a string in api_key variable.

        let api_key = "YOUR API KEY";  // it will look somethin like
        // "g2621eeabd0q6b470e1b75w9a48d020b"
        // same as above

        objstr2.open('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=metric&appid=${api_key}`, false);
        objstr2.send();
        let obj2 = JSON.parse(objstr2.response);
        let currentData = [];
        console.log(obj2);
        let sunriseDate = new Date(obj2.current.sunrise);
        let sunsetDate = new Date(obj2.current.sunset);
        currentData.push(`${obj2.current.clouds}%`);
        currentData.push(`${obj2.current.pressure} PSI`);
        currentData.push(`${sunriseDate.getHours()}:${sunriseDate.getMinutes()}:${sunriseDate.getSeconds()}`);
        currentData.push(`${sunsetDate.getHours()}:${sunsetDate.getMinutes()}:${sunsetDate.getSeconds()}`);
        currentData.push(`${obj2.current.temp} &#176C`);
        currentData.push(obj2.current.weather[0].main);
        currentData.push(`${obj2.current.visibility} Metres`);
        currentData.push(`${(obj2.current.wind_speed*3.6).toFixed(2)} km/h`);
        return currentData;
    }

    function imageUrl(tag) {
        let gif = new XMLHttpRequest();

// Add your api key. You can get api key from https://developers.giphy.com/ 
//  You may have to sign in to get the api key.  When you have it, add that 
// api key as a string in api_keyParameter1 variable.

        let gifUrl = "https://api.giphy.com/v1/gifs/random";
        let api_keyParameter1 = "YOUR API kEY FOR GIF"; // it will look something
        // like "W333dsad21cdfvaasfhkokj32"

        
        let finalUrl = `${gifUrl}?api_key=${api_keyParameter1}&tag=${tag}`;
        gif.open("GET", finalUrl, false);
        gif.send();
        let obje = JSON.parse(gif.response);
        return obje.data.images.original.url;
    }
});