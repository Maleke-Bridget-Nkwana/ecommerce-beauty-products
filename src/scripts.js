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
}

// Function to Decrease Quantity
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    removeFromCart(index);
  }
  updateCartDisplay();
}

// Function to Remove Item from Cart
function removeFromCart(index) {
  let removedItem = cart.splice(index, 1)[0];
  alert(`${removedItem.name} has been removed from the cart!`);
  updateCartDisplay();
}
