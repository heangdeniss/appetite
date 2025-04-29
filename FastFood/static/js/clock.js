const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function updatetime() {
    var now = new Date();

    document.getElementById("time").innerText = 
        zeroPadding(now.getHours(), 2) + ":" +
        zeroPadding(now.getMinutes(), 2) + ":" +
        zeroPadding(now.getSeconds(), 2);

    document.getElementById("date").innerText =
        now.getFullYear() + "-" +
        zeroPadding(now.getMonth() + 1, 2) + "-" +
        zeroPadding(now.getDate(), 2) + " " +
        WEEK[now.getDay()];

}

updatetime();
setInterval(updatetime, 1000);

function zeroPadding(num, digit) {
    return string(num).padStart(digit, '0');
}