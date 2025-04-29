document.addEventListener('DOMContentLoaded', () => {
    // Handle the Return Button
    const returnButton = document.getElementById('returnButton');
    returnButton.addEventListener('click', () => {
        // Navigate back to the previous page or a fallback URL
        if (document.referrer) {
            window.location.href = document.referrer; // Go back to the previous page
        } else {
            window.location.href = '/foodmenu/'; // Default fallback URL
        }
    });
});
