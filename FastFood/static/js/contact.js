document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submitMessage");
    const returnHomeButton = document.getElementById("returnHome");

    // Submit contact form
    submitButton.addEventListener("click", () => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !phone || !message) {
            alert("Please fill out all fields.");
            return;
        }

        fetch("/contact/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({ name, email, phone, message }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server error: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    alert("Message sent successfully! We will reply soon at your email. Thanks you for supporting us!");
                    window.location.reload();
                } else {
                    alert(`Error: ${data.message}`);
                }
            })
            .catch((error) => {
                console.error("Error submitting message:", error);
                alert("An error occurred. Please try again.");
            });
    });

    // Return Home button
    returnHomeButton.addEventListener("click", () => {
        window.location.href = "/";
    });

    // Function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split("; ");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + "=")) {
                    cookieValue = decodeURIComponent(cookie.slice(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
