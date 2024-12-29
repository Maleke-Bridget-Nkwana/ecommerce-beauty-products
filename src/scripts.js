// Shopping Cart Array
let cart = [];

// Function to Add to Cart
function addToCart(productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find((item) => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} has been added to your cart!`);
}

// Expose the function globally
window.addToCart = addToCart;

// Function to Update Quantity
function updateCartItemQuantity(index, action) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {
    if (action === "increase") {
      cart[index].quantity += 1; // Increase quantity
    } else if (action === "decrease") {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Decrease quantity
      } else {
        cart.splice(index, 1); // Remove item if quantity reaches 0
      }
    }

    // Save updated cart and refresh display
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  } else {
    console.error("Item not found in cart at index:", index);
    alert("Error: Item not found in the cart.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
});

// Function to Display Cart Contents
function updateCartDisplay() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.querySelector(".cart-container");
  let cartTotal = document.querySelector(".cart-total");

  if (!cartContainer || !cartTotal) {
    console.error("Cart container or total not found in the DOM.");
    return;
  }

  cartContainer.innerHTML = ""; // Clear the container

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: R0.00";
  } else {
    let totalPrice = 0;

    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;

      cartContainer.innerHTML += `
        <div class="cart-item">
          <p>${item.name} - R${item.price.toFixed(2)} x ${item.quantity}</p>
          <button onclick="updateCartItemQuantity(${index}, 'increase')">+</button>
          <button onclick="updateCartItemQuantity(${index}, 'decrease')">-</button>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });

    cartTotal.textContent = `Total: R${totalPrice.toFixed(2)}`;
  }
}

// Function to Increase Quantity
function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay(); // Refresh the cart display
  saveCart();
}

// Function to Decrease Quantity
function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    // Optionally confirm before removing
    if (confirm("Do you want to remove this item?")) {
      cart.splice(index, 1); // Remove the item if quantity is 1
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay(); // Refresh the cart display
  saveCart();
}

// Function to Remove Item from Cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item removed from your cart.");
    updateCartDisplay(); // Refresh the cart display
  } else {
    alert("Error: Item not found in the cart.");
  }

  saveCart();
}

// Checkout Button Functionality
document.getElementById("checkout-button").addEventListener("click", () => {
  // Fetch the cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty! Add items before checking out.");
  } else {
    let totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save order details to localStorage
    localStorage.setItem("orderSummary", JSON.stringify(cart));

    // Display a thank-you message
    alert(
      `Thank you for shopping with us! Your total is R${totalPrice.toFixed(2)}.`
    );

    // Redirect to confirmation page
    window.location.href = "confirmation.html";

    // Clear the cart in localStorage after redirect
    localStorage.removeItem("cart");
  }
  // Clear the cart
  cart = [];
  saveCart();
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

// Product Data Structure
let products = [
  {
    name: "Cocoa Elegance Lip Kit",
    price: 220,
    type: "lip-kit",
    image: "images/Beauty-Bliss-Brown-Kit.png",
  },
  {
    name: "Rosy Radiance Lip Kit",
    price: 220,
    type: "lip-kit",
    image: "images/Beauty_Bliss_Pink_Kit.jpg",
  },
  {
    name: "Chestnut Lip Liner",
    price: 50,
    type: "lip-liner",
    image: "images/Beauty-Bliss-Brown-Lip-Liner.webp",
  },
  {
    name: "Scarlet Lip Liner",
    price: 50,
    type: "lip-liner",
    image: "images/Beauty-Bliss-Pink-Lip-Liner.webp",
  },
  {
    name: "Glass Shine Lip Oil",
    price: 80,
    type: "lip-oil",
    image: "images/Beauty-Bliss-Clear-Lip-Oil.webp",
  },
  {
    name: "Watermelon Shine Lip Oil",
    price: 90,
    type: "lip-oil",
    image: "images/Beauty_Bliss_Watermelon_Lip_Oil.jpg",
  },
  {
    name: "Cocoa Kiss Lip Gloss",
    price: 90,
    type: "lip-gloss",
    image: "images/Beauty-Bliss-Brown-Lip-Gloss.webp",
  },
  {
    name: "Strawberry Kiss Lip Gloss",
    price: 90,
    type: "lip-gloss",
    image: "images/Beauty_Bliss_Pink_Lip_Gloss.jpg",
  },
];

function displayProducts(productsToDisplay) {
  let productContainer = document.querySelector(".product-grid");

  if (!productContainer) {
    console.error("Error: Element with class 'product-grid' not found.");
    return;
  }

  productContainer.innerHTML = ""; // Clear existing products

  productsToDisplay.forEach((product) => {
    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R${product.price.toFixed(2)}</p>
        <button onclick="addToWishlist('${
          product.name
        }')">Add to Wishlist</button>
        <button class="add-to-cart" onclick="addToCart('${product.name}', ${
      product.price
    })">Add to Cart</button>
      </div>
    `;
  });
}

// Filtering
function filterProducts() {
  let typeFilter = document.getElementById("product-type").value;
  let priceFilter = document.getElementById("price-range").value;

  let filteredProducts = products;

  // Filter by type
  if (typeFilter !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.type === typeFilter
    );
  }

  // Filter by price
  if (priceFilter === "low") {
    filteredProducts = filteredProducts.filter(
      (product) => product.price < 100
    );
  } else if (priceFilter === "medium") {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= 100 && product.price <= 200
    );
  } else if (priceFilter === "high") {
    filteredProducts = filteredProducts.filter(
      (product) => product.price > 200
    );
  }

  console.log("Filtered Products:", filteredProducts); // Debugging

  displayProducts(filteredProducts); // Display the filtered products
}

document
  .getElementById("product-type")
  .addEventListener("change", filterProducts);
document
  .getElementById("price-range")
  .addEventListener("change", filterProducts);

// Search Functionality
function searchProducts() {
  let searchTerm = document.getElementById("search-bar").value.toLowerCase();
  let filteredProducts = products.filter((products) =>
    products.name.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
}

// Event Listener for Search Bar
document.getElementById("search-bar").addEventListener("input", searchProducts);

// Sorting Functionality
function sortProducts() {
  let sortOption = document.getElementById("sort-options").value;
  let sortedProducts = [...products]; // Create a copy of the products array

  if (sortOption === "price-low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "alphabetical") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  displayProducts(sortedProducts);
}

// Event Listener for Sorting Dropdown
document
  .getElementById("sort-options")
  .addEventListener("change", sortProducts);

// Reviews Functionality
let reviews = {}; // Object to store reviews for each product

function showReviewForm(productName) {
  document.getElementById("review-modal").classList.remove("hidden");
  document.getElementById("review-modal").dataset.product = productName;
}

function closeReviewForm() {
  document.getElementById("review-modal").classList.add("hidden");
}

function submitReview() {
  let productName = document.getElementById("review-modal").dataset.product;
  let name = document.getElementById("review-name").value;
  let text = document.getElementById("review-text").value;
  let rating = parseInt(document.getElementById("review-rating").value);

  if (!reviews[productName]) {
    reviews[productName] = [];
  }

  reviews[productName].push({ name, text, rating });

  document.getElementById("review-modal").classList.add("hidden");
  displayReviews(productName);
}

function displayReviews(productName) {
  let reviewList = document.querySelector(
    `.product-card:has(h3:contains("${productName}")) .review-list`
  );

  if (reviewList) {
    reviewList.innerHTML = "";
    reviews[productName].forEach((review) => {
      reviewList.innerHTML += `
        <div class="review-item">
          <p><strong>${review.name}:</strong> ${review.text}</p>
          <p>Rating: ${review.rating}/5</p>
        </div>
      `;
    });
  }
}

// Login/Signup Modal
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login functionality to be implemented!");
  closeModal("login-modal");
});

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Signup functionality to be implemented!");
  closeModal("signup-modal");
});

// Wishlist Array (loaded from localStorage or initialized empty)
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Function to Add to Wishlist
function addToWishlist(productName, productPrice) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlist.some((item) => item.name === productName)) {
    wishlist.push({ name: productName, price: productPrice });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${productName} has been added to your wishlist!`);
  } else {
    alert(`${productName} is already in your wishlist!`);
  }
}

// Expose the function globally
window.addToWishlist = addToWishlist;

loadCart();
