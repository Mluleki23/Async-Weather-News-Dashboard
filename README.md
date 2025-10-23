🧠 Project Overview

This project demonstrates different asynchronous programming styles in Node.js by fetching weather data and news headlines from public APIs.
It showcases how callbacks, promises, and async/await handle asynchronous operations and error management.

🚀 Features

Fetch live weather data (Open-Meteo API)

Fetch news headlines (DummyJSON or similar API)

Implemented using:

🧩 Callbacks

🔗 Promises

⚙️ Async/Await (try...catch)

Uses:

Promise.all() → Fetch weather + news simultaneously

Promise.race() → Display fastest response

🗂️ Folder Structure
src/
 ├── callbackVersion.ts
 ├── promiseVersion.ts
 ├── asyncAwaitVersion.ts

🧪 Run the App

Use the following commands to test each version:

# Callback version
npm run callback

# Promise version
npm run promise

# Async/Await version
npm run async


(You can define these scripts in package.json for convenience.)

⚙️ Technologies Used

Node.js

TypeScript

ts-node

https module

Public APIs (Open-Meteo, DummyJSON)
