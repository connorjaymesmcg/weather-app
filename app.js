// TODO: add location selector to select element 
// add onclick to text elements to show hourly forecast 
// fix location selector / add functionality 


window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temp-description')
  let temperatureDegree = document.querySelector('.temp-degree')
  let locationTimeZone = document.querySelector('.location-timezone')
  let temperatureSection = document.querySelector('.degree-section')
  let forecast = document.querySelector('.forecast')
  const temperatureSpan = document.querySelector('.degree-section span')
  let timeZone = document.querySelector('#location-select')

  let d = new Date();
  d.toString()

  document.querySelector('.date').textContent = ` Today is ${d}`;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('workingngggn')
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/3f31fca7de464011a43ef7ba494e2d76/${lat},${long}`;
      fetch(api)

        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon, humidity } = data.currently;
          // const { minSummary } = data.minutely;
          const { } = data.daily.summary;
          // Set DOM Elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = `Your timezone is ${data.timezone}`;
          forecast.textContent = data.minutely.summary
          // Set Icon
          setIcons(icon, document.querySelector(".icon"))

          // Change temp to Celsius/Fahrenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
            } else {
              temperatureSpan.textContent = "F";
            }
          });
          timeZone.addEventListener('click', () => {
            if (timeZone.value === "est") {
              
              console.log('recorded')
            } else { console.log('default location selected') }
          });

        });
    });
  }
  function setIcons(icon, icondID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(icondID, Skycons[currentIcon]);
  }
});
