/* ==========================================
   RAJPUROHIT SKINCARE
   Website JavaScript
   Owner: Akshay Singh Rajpurohit
========================================== */

let cart = [];


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("show");
}


/* =========================
   CART
========================= */

function addToCart(name, price) {

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  showToast(name + " added to cart ✓");

  openCart();
}


function updateCart() {

  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  cartCount.textContent = totalQuantity;

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty.
      </p>
    `;

  } else {

    cartItems.innerHTML = cart.map((item, index) => {

      return `
        <div class="cart-item">

          <div>
            <h4>${item.name}</h4>
            <p>
              ₹${item.price} × ${item.quantity}
            </p>
          </div>

          <div>
            <strong>
              ₹${item.price * item.quantity}
            </strong>

            <br>

            <button
              class="remove-item"
              onclick="removeFromCart(${index})">
              Remove
            </button>
          </div>

        </div>
      `;

    }).join("");

  }

  cartTotal.textContent = "₹" + totalPrice;
}


function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();

  showToast("Product removed from cart");
}


function openCart() {

  document.getElementById("cartDrawer")
    .classList.add("open");

  document.getElementById("cartOverlay")
    .classList.add("show");
}


function closeCart() {

  document.getElementById("cartDrawer")
    .classList.remove("open");

  document.getElementById("cartOverlay")
    .classList.remove("show");
}


function checkout() {

  if (cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }

  alert(
    "Checkout system is ready to connect with Razorpay, Stripe or another payment gateway."
  );
}


/* =========================
   PRODUCT FILTER
========================= */

function filterProducts(category, button) {

  const products = document.querySelectorAll(".product-card");
  const filters = document.querySelectorAll(".filter");

  filters.forEach(filter => {
    filter.classList.remove("active");
  });

  button.classList.add("active");

  products.forEach(product => {

    if (
      category === "all" ||
      product.dataset.category === category
    ) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }

  });
}


/* =========================
   WISHLIST
========================= */

function toggleWishlist(button) {

  button.classList.toggle("liked");

  if (button.classList.contains("liked")) {
    button.textContent = "♥";
    showToast("Added to wishlist ♥");
  } else {
    button.textContent = "♡";
    showToast("Removed from wishlist");
  }
}


/* =========================
   SEARCH
========================= */

function openSearch() {

  document
    .getElementById("searchOverlay")
    .classList.add("show");

  setTimeout(() => {
    document.getElementById("searchInput").focus();
  }, 100);
}


function closeSearch() {

  document
    .getElementById("searchOverlay")
    .classList.remove("show");

  document.getElementById("searchInput").value = "";

  document.getElementById("searchResults").innerHTML = "";
}


function searchProducts() {

  const query =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();

  const products =
    document.querySelectorAll(".product-card");

  const results =
    document.getElementById("searchResults");

  if (!query) {
    results.innerHTML = "";
    return;
  }

  let found = [];

  products.forEach(product => {

    const name =
      product.querySelector("h3").textContent;

    if (name.toLowerCase().includes(query)) {
      found.push(name);
    }

  });

  if (found.length === 0) {

    results.innerHTML = `
      <div class="search-result">
        No products found.
      </div>
    `;

  } else {

    results.innerHTML = found.map(name => `
      <div class="search-result">
        <strong>${name}</strong>
      </div>
    `).join("");

  }
}


/* =========================
   NEWSLETTER
========================= */

function subscribe(event) {

  event.preventDefault();

  const email =
    document.getElementById("email").value;

  if (!email) return;

  showToast("Welcome to the Glow Club ✨");

  document.getElementById("email").value = "";
}


/* =========================
   CONTACT FORM
========================= */

function sendMessage(event) {

  event.preventDefault();

  showToast("Message sent successfully ✓");

  event.target.reset();
}


/* =========================
   TOAST
========================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);
}


/* =========================
   CLOSE SEARCH WITH ESC
========================= */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closeSearch();
    closeCart();
  }

});


/* =========================
   INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded", function() {

  updateCart();

  console.log(
    "Rajpurohit Skincare | Owned by Akshay Singh Rajpurohit"
  );

});
