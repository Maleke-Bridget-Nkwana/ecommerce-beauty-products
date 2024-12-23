// Shopping Cart Array
let cart = [];

// Function to Add to Cart
function addToCart(productName, productPrice) {
  let existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1; // Increase quantity if product already exists
  } else {
    let product = { name: productName, price: productPrice, quantity: 1 };
    cart.push(product);
  }
  alert(`${productName} has been added to the cart!`);
  updateCartDisplay();
  saveCart(); //Save cart data
}

// Function to Display Cart Contents
function updateCartDisplay() {
  let cartContainer = document.querySelector(".cart-container");
  let cartTotal = document.querySelector(".cart-total");
  cartContainer.innerHTML = ""; // Clear previous content

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: R0.00";
  } else {
    let totalPrice = 0;
    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;
      cartContainer.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} - R${item.price} x ${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
    });
    cartTotal.textContent = `Total: R${totalPrice.toFixed(2)}`;
  }
}

// Function to Increase Quantity
function increaseQuantity(index) {
  cart[index].quantity += 1;
  updateCartDisplay();
  saveCart();
}

// Function to Decrease Quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    removeFromCart(index);
  }
  updateCartDisplay();
  saveCart();
}

// Function to Remove Item from Cart
function removeFromCart(index) {
  let removedItem = cart.splice(index, 1)[0];
  alert(`${removedItem.name} has been removed from the cart!`);
  updateCartDisplay();
  saveCart();
}

// Checkout Button Functionality
document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before checking out.");
  } else {
    let totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    alert(
      `Thank you for shopping with us! Your total is R${totalPrice.toFixed(2)}.`
    );
    cart = []; // Clear the cart
    updateCartDisplay(); // Update the display
  }
});

// Save Cart to Local Storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCart() {
  let savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
  }
}

loadCart();
