import http from "https";

function fetchGeocode(city: string, callback: (coords: { lat: number; lon: number } | null) => void): void {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  http
    .get(url, (res: any) => {
      let data = "";
      res.on("data", (chunk: any) => {
        data += chunk;
      });
      res.on("end", () => {
        const result = JSON.parse(data);
        if (result.results && result.results.length > 0) {
          const { latitude, longitude } = result.results[0];
          callback({ lat: latitude, lon: longitude });
        } else {
          callback(null);
        }
      });
    })
    .on("error", (err: any) => {
      console.error(err);
      callback(null);
    });
}

function fetchWeatherData(lat: number, lon: number, callback: (data: any) => void): void {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,windspeed_10m`;
  http
    .get(url, (res: any) => {
      let data = "";
      res.on("data", (chunk: any) => {
        data += chunk;
      });
      res.on("end", () => {
        callback(JSON.parse(data));
      });
    })
    .on("error", (err: any) => {
      console.error(err);
      callback(null);
    });
}

function fetchNews(callback: (data: any) => void): void {
  const url = `https://dummyjson.com/posts`;
  http
    .get(url, (res: any) => {
      let data = "";
      res.on("data", (chunk: any) => {
        data += chunk;
      });
      res.on("end", () => {
        callback(JSON.parse(data));
      });
    })
    .on("error", (err: any) => {
      console.error(err);
      callback(null);
    });
}

const city = process.argv[2] || "London";
fetchGeocode(city, (coords) => {
  if (coords) {
    fetchWeatherData(coords.lat, coords.lon, (weatherData) => {
      if (weatherData) {
        // Get current time index (assuming hourly data starts from current hour)
        const now = new Date();
        const currentHour = now.getUTCHours();
        const currentIndex = currentHour;

        const temperature = weatherData.hourly.temperature_2m[currentIndex];
        const windspeed = weatherData.hourly.windspeed_10m[currentIndex];
        const time = weatherData.hourly.time[currentIndex];

        console.log(`Weather in ${city}:`);
        console.log(`   Temperature: ${temperature}°C`);
        console.log(`   Windspeed: ${windspeed} km/h`);
        console.log(`   Time: ${time}`);

        fetchNews((newsData) => {
          if (newsData && newsData.posts) {
            console.log("News:");
            newsData.posts.slice(0, 3).forEach((post: any, index: number) => {
              console.log(`${index + 1}. ${post.title}`);
            });
          }
        });
      }
    });
  } else {
    console.log(`Error: Could not find coordinates for city: ${city}`);
  }
});
