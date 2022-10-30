Vue.component('weather-plugin',{
    // name: "Weather-Plugin",
    props: {
        author:{
            default: '',
            type: String,
        }
    },
    data() {
        return {
          informations: {
            main: {
              temp: undefined,
            },
          },
          posts: undefined,
          weatherDataList: []
        }
      },
      computed: {
        getCelsius() {
          return +((this.informations.main.temp - 273.15).toFixed(2));
        }
      },
      methods: {
        fetchWeather() {
            /**
             * Change {city}
             * and 
             * Change {api_key}
             */
          fetch('https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}')
          .then((res) => res.json())
          .then(json => {
              this.informations = json;
            });
    
          // const options = {
          //   method: 'GET',
          //   headers: {
          //     'X-RapidAPI-Key': 'api_key',
          //     'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          //   }
          // };
    
          // fetch('https://weatherapi-com.p.rapidapi.com/future.json?q=London&dt=2022-12-25', options)
          //   .then(response => response.json())
          //   .then(response => console.log(response))
          //   .catch(err => console.error(err));
        },
        fetchPosts(){
            fetch('http://localhost/wp-json/wp/v2/posts')
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                this.posts = JSON.parse(data);
            });
        },
        getWeatherData() {
            fetch("http://localhost/wp-content/plugins/weather-plugin/weather.json")
              .then(response => response.json())
              .then(data => {
                console.log(data);
                this.weatherDataList = data
            });
          },
      },
      mounted() {
        this.fetchWeather();
        this.fetchPosts();
      },
      template:`<div>
        <div id='WeatherPlugin' class='alert alert-primary d-flex align-items-center' role='alert'>
            <pre>
                Currently, the temperature in Matosinhos is: {{ getCelsius }} degrees.                   
                Plugin by {{ author }}.
            </pre>
        </div>
      
        <div v-for='post, index in posts' :keys='index'>
            <p style="white-space: pre-line" v-if='post.content.rendered' v-html='post.content.rendered'/>
            <br>
        </div>

        <div>
            <h1>My Weather App</h1>
            <button v-on:click="getWeatherData">Get Weather Data</button>
            <div v-for="weatherData in weatherDataList" :key="weatherData.id" class="weather-data">
            <div class="weather-stats">
                <div>
                <span>{{ weatherData.time }}</span>
                </div>
                <div>
                <span class="location">{{ weatherData.location }}</span>
                </div>
            </div>
            <div class="weather-icon">
                <img :src="weatherData.abbr">
            </div>
            <div class="weather-temp">
                <span>{{ weatherData.temp }}°</span>
            </div>
            </div>
        </div>
      </div>`
})

var vm = new Vue({
    el: '#appvue',
});