// Shopping Cart Array
let cart = [];

// Function to Add to Cart
function addToCart(productName, productPrice) {
  let product = { name: productName, price: productPrice };
  cart.push(product);
  alert(`${productName} has been added to the cart!`);
  updateCartDisplay();
}

// Function to Display Cart Contents
function updateCartDisplay() {
  let cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = ""; // Clear previous content
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      cartContainer.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} - R${item.price}</span>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
    });
  }
}

// Function to Remove Item from Cart
function removeFromCart(index) {
  let removedItem = cart.splice(index, 1)[0];
  alert(`${removedItem.name} has been removed from the cart!`);
  updateCartDisplay();
}
