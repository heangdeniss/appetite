document.addEventListener('DOMContentLoaded', () => {
    // Add click event to menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const url = item.getAttribute('data-url');
            if (url) {
                window.location.href = url; // Navigate to the section URL
            }
        });
    });

    // Handle the Return Button
    const returnButton = document.getElementById('returnButton');
    returnButton.addEventListener('click', () => {
        window.location.href = '/'; // Navigate to the index page
    });
});
