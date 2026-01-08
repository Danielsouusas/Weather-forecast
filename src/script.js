
document.querySelector('#search').addEventListener('submit', async (event) => {
     event.preventDefault();

     const cityName = document.querySelector('#city_name').value.trim();

     if (!cityName) {
          return showAlert('voçê não digitou o nome de uma cidade...');
     }
     const apikey = '1fbe15d288fca6ba78d574b393958f57';
     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apikey}&units=metric&lang=pt`;

     try {
     const results = await fetch(apiUrl);
     if (!results.ok) {
          showAlert('Cidade não encontrada.');
          return;
     }

     const json = await results.json();

     // quando a resposta é OK, mostramos as infos
     if (json && (json.cod == 200 || results.ok)) {
          showinfo({
               city: json.name,
               country: json.sys.country,
               temp: json.main.temp,
               tempMax: json.main.temp_max,
               tempMin: json.main.temp_min,
               description: json.weather[0].description,
               tempIcon: json.weather[0].icon,
               windSpeed: json.wind.speed,
               humidity: json.main.humidity,
          });
     } else {
          showAlert('Cidade não encontrada.');
     }
}     catch (error) {
     showAlert('Erro ao buscar os dados do API.');
     console.error(error);

}
});

function showinfo(json) {
     showAlert('');

     document.querySelector("#weather").classList.add('show');

     document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

     document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;

     document.querySelector('#temp_description').innerHTML = `${json.description}`;
     document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
}

function showAlert(msg) {
     document.querySelector('#alert').innerHTML = msg;
}


