window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temp-description')
  let temperatureDegree = document.querySelector('.temp-degree')
  let locationTimeZone = document.querySelector('.location-timezone')
  let temperatureSection = document.querySelector('.degree-section')
  const temperatureSpan = document.querySelector('.degree-section span')

  let d = new Date();

  document.querySelector('.date').textContent = d.getFullYear();

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
          // const { summary } = data.daily;
          // Set DOM Elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone
          // Set Icon
          setIcons(icon, document.querySelector(".icon"))

          // Change temp to Celsius/Fahrenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
            } else {
              temperatureSpan.textContent = "F";
            }
          })
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
