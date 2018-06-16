var app = new Vue({
  el: '#app',
  data: {
    currentDate: null,
    currentTime: null,
    tiles:[
      {heading: 'Public Transport', content:''},
      {heading: 'Twitter', content:''},
      {heading: 'Weather', content:'', icon:'', isCenter:true},
      {heading: 'Calendar', content:''},
      {heading: 'Pollen', content:''},
      {heading: 'Air Pollution', content:''},
      {content:'', mapHtml:"<div id='map'></div>", isBig: true}
    ]
  },
  methods: {
    updateCurrentDateAndTime(){
      this.currentDate = moment().format('Do MMMM YYYY');
      this.currentTime = moment().format('LTS');
    }
  },
  created() {
    moment.locale('de');
    this.currentDate = moment().format('Do MMMM YYYY');
    this.currentTime = moment().format('LTS');
    setInterval(() => this.updateCurrentDateAndTime(), 1*1000)
    axios.get('https://api.openweathermap.org/data/2.5/weather?id=2935020&appid='+ apiKeys.openWeatherMapApiKey +'&units=metric')
    .then(function (response) {
      console.log("Weather data: " + response.data.main.temp);
      var weatherObj = app.tiles[2];
      weatherObj.content = response.data.main.temp + '°C ' + response.data.weather[0].description;
      weatherObj.icon = 'owf owf-' + response.data.weather[0].id;
      app.$set(app.tiles, 2, weatherObj);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
})
