document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItems = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout-button");

    // Add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const product = button.closest(".product");
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    // Update cart UI
    function updateCart() {
        cartItems.innerHTML = "";

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - ₹.${item.price.toFixed(2)} × ${item.quantity}
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartItems.appendChild(li);
        });
    }

    // Remove item from cart
    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    // Checkout
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("🛒 Your cart is empty!");
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert(`🧾 Total Price: ₹${total.toFixed(2)}\n\nThank you for shopping with us!`);

        cart.length = 0; // Clear cart
        updateCart();
    });
});
