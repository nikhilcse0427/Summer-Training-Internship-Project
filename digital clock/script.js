let clockInterval;

function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');  // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = `${year}-${month}-${day}`;
}

function startClock() {
    if (!clockInterval) {
        updateClock();  // Initial call to set the clock and date immediately
        clockInterval = setInterval(updateClock, 1000);
    }
}

function stopClock() {
    clearInterval(clockInterval);
    clockInterval = null;
}
