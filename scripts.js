const API_kEY = 'cde500865b040bff958bab839bc60394';
const fetchData = position =>{
    const {latitude , longitude} = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_kEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

const setWeatherData = data =>{
    console.log(data);
    const weatherData ={
        ubicacion: data.name,
        descripcion: data.weather[0].main,
        humedad: data.main.humidity,
        presion: data.main.pressure,
        temperatura: data.main.temp,
        fecha: getDate(),
    }

    Object.keys(weatherData).forEach( key =>{
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp();
}

const cleanUp = () =>{
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')

    loader.style.display='none';
    container.style.display='flex';
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onload =() =>{
    navigator.geolocation.getCurrentPosition(fetchData);
}