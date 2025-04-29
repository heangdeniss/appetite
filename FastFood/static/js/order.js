document.addEventListener("DOMContentLoaded", () => {
    const totalPriceElement = document.getElementById("totalPrice");
    const submitOrderButton = document.getElementById("submitOrder");
    const returnHomeButton = document.getElementById("returnToMenu");

    // Function to calculate total price
    function calculateTotalPrice() {
        const categories = [
            { select: "burgerSelect", qty: "burgerQty" },
            { select: "pizzaSelect", qty: "pizzaQty" },
            { select: "burritoSelect", qty: "burritoQty" },
            { select: "drinkSelect", qty: "drinkQty" },
            { select: "icecreamSelect", qty: "icecreamQty" },
            { select: "wineSelect", qty: "wineQty" },
        ];

        let total = 0;

        categories.forEach(({ select, qty }) => {
            const itemSelect = document.getElementById(select);
            const quantity = parseInt(document.getElementById(qty).value) || 0;
            const price = parseFloat(itemSelect.value);

            if (!isNaN(price) && quantity > 0) {
                total += price * quantity;
            }
        });

        totalPriceElement.textContent = `Total Price: $${total.toFixed(2)}`;
        return total;
    }

    // Event listener for quantity or selection changes
    document.querySelectorAll("select, input[type='number']").forEach((element) => {
        element.addEventListener("change", calculateTotalPrice);
    });

    // Submit order
    submitOrderButton.addEventListener("click", () => {
        const customerName = document.getElementById("customerName").value;
        const customerEmail = document.getElementById("customerEmail").value;
        const customerPhone = document.getElementById("customerPhone").value;
        const customerLocation = document.getElementById("customerLocation").value;

        const orderDetails = [];
        const categories = [
            { select: "burgerSelect", qty: "burgerQty" },
            { select: "pizzaSelect", qty: "pizzaQty" },
            { select: "burritoSelect", qty: "burritoQty" },
            { select: "drinkSelect", qty: "drinkQty" },
            { select: "icecreamSelect", qty: "icecreamQty" },
            { select: "wineSelect", qty: "wineQty" },
        ];

        categories.forEach(({ select, qty }) => {
            const itemSelect = document.getElementById(select);
            const quantity = parseInt(document.getElementById(qty).value) || 0;

            if (itemSelect.value !== "0" && quantity > 0) {
                const itemName = itemSelect.options[itemSelect.selectedIndex].text.split(" - $")[0];
                const itemPrice = parseFloat(itemSelect.value);

                orderDetails.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: quantity,
                    total: (itemPrice * quantity).toFixed(2),
                });
            }
        });

        const totalPrice = calculateTotalPrice();

        if (!customerName || !customerEmail || !customerPhone || !customerLocation) {
            alert("Please fill out all personal details.");
            return;
        }

        if (orderDetails.length === 0) {
            alert("Please select at least one item.");
            return;
        }

        fetch("/submit_order/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                name: customerName,
                email: customerEmail,
                phone: customerPhone,
                location: customerLocation,
                orderDetails: orderDetails,
                totalPrice: totalPrice,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server error: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    alert("Order submitted successfully! Thank you for your purchase! Your food will be delivered soon!");
                } else {
                    alert(`Error: ${data.message}`);
                }
                window.location.reload(); // Always reload the page after submission
            })
            .catch((error) => {
                console.error("Error submitting order:", error);
                alert("An error occurred. Please try again.");
                window.location.reload(); // Reload even if there is an error
            });
    });

    // Function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Redirect to the index page when clicking "Return Home"
    returnHomeButton.addEventListener("click", () => {
        window.location.href = "/";
    });
});
