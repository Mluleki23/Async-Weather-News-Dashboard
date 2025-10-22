import http from "https";
// Refactor Promise code to use async/await
export async function fetchGeocode(city: string): Promise<{ lat: number; lon: number } | null> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          const result = JSON.parse(data);
          if (result.results && result.results.length > 0) {
            const { latitude, longitude } = result.results[0];
            resolve({ lat: latitude, lon: longitude });
          } else {
            resolve(null);
          }
        });
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      });
  });
}
export async function fetchWeatherData(lat: number, lon: number): Promise<any> {
  const apiKey = "YOUR_API_KEY";
  const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`;
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      });
  });
}
export async function fetchNews(): Promise<any> {
  const apiKey = "YOUR_API_KEY";
  const url = `https://dummyjson.com/posts`;
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      });
  });
}
// Example usage:
async function displayData() {
  const city = process.argv[2] || "London";
  try {
    const coords = await fetchGeocode(city);
    if (!coords) {
      throw new Error(`Error: Could not find coordinates for city: ${city}`);
    }
    const weatherData = await fetchWeatherData(coords.lat, coords.lon);
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

      const newsData = await fetchNews();
      if (newsData && newsData.posts) {
        console.log("News:");
        newsData.posts.slice(0, 3).forEach((post: any, index: number) => {
          console.log(`${index + 1}. ${post.title}`);
        });
      }
    } else {
      throw new Error("Failed to fetch weather data");
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}
displayData();
