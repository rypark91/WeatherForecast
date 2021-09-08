var city = document.querySelector("#city");
var countryID = document.querySelector("#country");
var b = document.querySelector("#button");
var feedback = document.querySelector("#feedback")
var forecast = document.querySelector("table");
let foreCastList;

forecast.style.visibility  = "hidden";

b.addEventListener("click",function(){
	forecast.style.visibility = "hidden";
	feedback.innerText = "";
    let changedCity = String(city.value).toLowerCase().trim().replace(/\s+/g,"%20").trim();
	b.disabled = true;
    fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${changedCity}%2C${countryID.value}&units=imperial`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "08de0fa1b3mshc88eaff21fbf380p15fd7fjsn2fdca5c03488",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => {

	if(response.status === 404){
		feedback.innerText = "City in country not found.  Please check spelling or select a different country."
		b.disabled = false;
	}
	else{
		response.json().then(data => {
			foreCastList = [new ForecastData("",[],[],[],[],"unknown",""),
			new ForecastData("",[],[],[],[],"unknown",""),
			new ForecastData("",[],[],[],[],"unknown",""),
			new ForecastData("",[],[],[],[],"unknown",""),
			new ForecastData("",[],[],[],[],"unknown","")];
			getForecastData(data);
			writeForecast();
			foreCastList = [];
			forecast.style.visibility = "visible";
			b.disabled = false;
					});
	}
    

})
.catch(err => {
	feedback.innerText = "Error.  Unable to get forecast."
	b.disabled = false;
});
});
class ForecastData{
    constructor(date, high, low, windDirection, windSpeed, condition,
		icon){
        this.date = date;
        this.high = high;
        this.low = low;
        this.windDirection = windDirection;
        this.windSpeed = windSpeed;
        this.condition = condition;
		this.icon = icon;
    }
}

let dates = document.querySelector("#dates");
let conditions = document.querySelector("#conditions");
let temperatures = document.querySelector("#temperatures");
let speeds = document.querySelector("#windspeeds");
let directions = document.querySelector("#winddirections");
let icons = document.querySelector("#icons");

function getForecastData(foreCastData){
    var i;
    for(i = 0; i < 40; i++){
        var num = Math.floor(i/8);
        var item = foreCastData.list;
        foreCastList[num].high.push(item[i].main.temp_max);
        foreCastList[num].low.push(item[i].main.temp_max);
        foreCastList[num].windDirection.push(item[i].wind.deg);
        foreCastList[num].windSpeed.push(item[i].wind.speed);
        if(i % 8 === 4){
            foreCastList[num].date = item[i].dt_txt.slice(5,10);
            foreCastList[num].condition = item[i].weather[0].description;
			foreCastList[num].icon = item[i].weather[0].icon;
        }
    }
}
function getDirections(windlist){
    var avg = 0;
    var i;
    var length = windlist.length;
    for(i = 0; i < length; i++){
        avg += windlist[i];
    }
    avg /= length;
    let finalAngle = avg.toFixed(0);
    if(finalAngle <= 22 || finalAngle >= 338){
        return "N";
    }
    else if(finalAngle >= 23 && finalAngle <= 67){
        return "NE";
    }
    else if(finalAngle >= 68 && finalAngle <= 112){
        return "E";
    }
    else if(finalAngle >= 113 && finalAngle <= 157){
        return "SE";
    }
    else if(finalAngle >= 158 && finalAngle <= 202){
        return "S";
    }
    else if(finalAngle >= 203 && finalAngle <= 247){
        return "SW";
    }
    else if(finalAngle >= 248 && finalAngle <= 292){
        return "W";
    }
    else if(finalAngle >= 293 && finalAngle <= 337){
        return "NW";
    }

}

function writeForecast(){

    dates.children[1].innerText = foreCastList[0].date;
    dates.children[2].innerText = foreCastList[1].date;
    dates.children[3].innerText = foreCastList[2].date;
    dates.children[4].innerText = foreCastList[3].date;
    dates.children[5].innerText = foreCastList[4].date;

	icons.children[1].innerHTML = `<img src="http://openweathermap.org/img/wn/${foreCastList[0].icon}@2x.png" alt="cloud">`;
    icons.children[2].innerHTML = `<img src="http://openweathermap.org/img/wn/${foreCastList[1].icon}@2x.png" alt="cloud">`;
    icons.children[3].innerHTML = `<img src="http://openweathermap.org/img/wn/${foreCastList[2].icon}@2x.png" alt="cloud">`;
    icons.children[4].innerHTML = `<img src="http://openweathermap.org/img/wn/${foreCastList[3].icon}@2x.png" alt="cloud">`;
    icons.children[5].innerHTML = `<img src="http://openweathermap.org/img/wn/${foreCastList[4].icon}@2x.png" alt="cloud">`;
	
    conditions.children[1].innerText = foreCastList[0].condition.toUpperCase();
    conditions.children[2].innerText = foreCastList[1].condition.toUpperCase();
    conditions.children[3].innerText = foreCastList[2].condition.toUpperCase();
    conditions.children[4].innerText = foreCastList[3].condition.toUpperCase();
    conditions.children[5].innerText = foreCastList[4].condition.toUpperCase();

    temperatures.children[1].innerText = Math.max(...foreCastList[0].high).toFixed(0) + ' F\xB0/' + Math.min(...foreCastList[0].low).toFixed(0) + ' F\xB0';
    temperatures.children[2].innerText = Math.max(...foreCastList[1].high).toFixed(0) + ' F\xB0/' + Math.min(...foreCastList[1].low).toFixed(0) + ' F\xB0';
    temperatures.children[3].innerText = Math.max(...foreCastList[2].high).toFixed(0) + ' F\xB0/' + Math.min(...foreCastList[2].low).toFixed(0) + ' F\xB0';
    temperatures.children[4].innerText = Math.max(...foreCastList[3].high).toFixed(0) + ' F\xB0/' + Math.min(...foreCastList[3].low).toFixed(0) + ' F\xB0';
    temperatures.children[5].innerText = Math.max(...foreCastList[4].high).toFixed(0) + ' F\xB0/' + Math.min(...foreCastList[4].low).toFixed(0) + ' F\xB0';

    speeds.children[1].innerText = Math.max(...foreCastList[0].windSpeed) + " MPH";
    speeds.children[2].innerText = Math.max(...foreCastList[1].windSpeed) + " MPH";
    speeds.children[3].innerText = Math.max(...foreCastList[2].windSpeed) + " MPH";
    speeds.children[4].innerText = Math.max(...foreCastList[3].windSpeed) + " MPH";
    speeds.children[5].innerText = Math.max(...foreCastList[4].windSpeed) + " MPH";

    directions.children[1].innerText = getDirections(foreCastList[0].windDirection);
    directions.children[2].innerText = getDirections(foreCastList[1].windDirection);
    directions.children[3].innerText = getDirections(foreCastList[2].windDirection);
    directions.children[4].innerText = getDirections(foreCastList[3].windDirection);
    directions.children[5].innerText = getDirections(foreCastList[4].windDirection);
    
}




