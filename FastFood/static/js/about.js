document.addEventListener("DOMContentLoaded", () => {
    // Get the Back Home button
    const backHomeButton = document.getElementById("backHome");

    // Redirect to the home page when "Back Home" is clicked
    backHomeButton.addEventListener("click", () => {
        window.location.href = "/";
    });

    // (Keep any other functionality from your previous script here if needed)
});
