document.addEventListener("DOMContentLoaded", () => {
    const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    function updateClock() {
        const now = new Date();

        // Format time in 24-hour format
        const hours = zeroPadding(now.getHours(), 2);
        const minutes = zeroPadding(now.getMinutes(), 2);
        const seconds = zeroPadding(now.getSeconds(), 2);

        // Format date
        const year = now.getFullYear();
        const month = zeroPadding(now.getMonth() + 1, 2);
        const date = zeroPadding(now.getDate(), 2);
        const day = WEEK[now.getDay()];

        // Update DOM elements
        document.getElementById("time").innerText = `${hours}:${minutes}:${seconds}`;
        document.getElementById("date").innerText = `${year}-${month}-${date} ${day}`;
    }

    function zeroPadding(num, digit) {
        return String(num).padStart(digit, '0');
    }

    // Initialize and update clock every second
    updateClock();
    setInterval(updateClock, 1000);
});
