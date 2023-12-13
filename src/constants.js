export const APIENDPOINT = "https://greencanyonapp.com/api"; // "http://localhost"; 

// Set a cookie without expiration
export function setCookie(name, value) {
    localStorage.setItem(name, value);
}

// Get a cookie
export function getCookie(name) {
    return localStorage.getItem(name);
}


// Get date from timestamp
export function getDate(d) {
    const timestamp = d * 1000;
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export function shorten(str) {
    return str.length > 35 ? str.substring(0, 35) + '...' : str;
}