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
    // Save order details to localStorage
    localStorage.setItem("orderSummary", JSON.stringify(cart));

    // Redirect to confirmation page
    window.location.href = "confirmation.html";
    alert(
      `Thank you for shopping with us! Your total is R${totalPrice.toFixed(2)}.`
    );

    // Clear the cart
    cart = [];
    saveCart();

    // Update the display
    updateCartDisplay();
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

loadCart();
