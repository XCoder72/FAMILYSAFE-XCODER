// src/config.js
const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://familysafe-xcoder.onrender.com";

export default API_BASE_URL;