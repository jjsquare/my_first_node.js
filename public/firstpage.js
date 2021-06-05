let lat,lng;
if ('geolocation' in navigator){

    // console.log("geolacation available");
    navigator.geolocation.getCurrentPosition(async postion => {
        // console.log(postion.coords);
        lat = postion.coords.latitude;
        lng = postion.coords.longitude;
        document.getElementById("lat").textContent = lat.toFixed(4);
        document.getElementById("lng").textContent = lng.toFixed(4);
        const data = {lat , lng};
        const api_url = `weather/${lat},${lng}`
        // const api_url = `/weather`;
        const response = await fetch(api_url);
        const json = await response.json();
        // console.log(json);
        const temp = json.current.temp-273.15;
        document.getElementById("summary").textContent = json.current.weather[0].description;
        document.getElementById("temp").textContent = temp.toFixed(2);
    });

}
else{
    console.log("geolacation is not available");
}
const button = document.getElementById('submit');
button.addEventListener('click', async event =>{
    const name_of_client = document.getElementById("name").value;
    const data = {lat , lng, name_of_client};
        
        const options = {
            method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        // console.log(json);
});