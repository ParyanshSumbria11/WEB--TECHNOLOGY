const products = [
    { id: 1, name: "Sneakers", price: 1299, category: "Footwear", brand: "WalkStyle", description: "Comfortable sneakers for daily use, casual outings, and walking.", availability: "In Stock" },
    { id: 2, name: "Classic Watch", price: 2999, category: "Accessories", brand: "TimeCraft", description: "A stylish wristwatch for everyday use and special occasions.", availability: "In Stock" },
    { id: 3, name: "Handbag", price: 1899, category: "Accessories", brand: "StyleCarry", description: "A fashionable handbag for carrying your everyday essentials.", availability: "In Stock" },
    { id: 4, name: "Headphones", price: 2499, category: "Electronics", brand: "SoundMax", description: "Comfortable headphones for music, videos, and entertainment.", availability: "In Stock" },
    { id: 5, name: "Sunglasses", price: 799, category: "Accessories", brand: "SunStyle", description: "Modern sunglasses for sunny days and outdoor activities.", availability: "In Stock" },
    { id: 6, name: "Hoodie", price: 1499, category: "Clothing", brand: "UrbanWear", description: "A comfortable hoodie suitable for casual everyday wear.", availability: "In Stock" },
    { id: 7, name: "Camera", price: 4999, category: "Electronics", brand: "ClickPro", description: "A digital camera for capturing everyday moments and memories.", availability: "In Stock" },
    { id: 8, name: "Perfume", price: 1299, category: "Accessories", brand: "FreshAura", description: "A fragrance suitable for everyday use and special occasions.", availability: "In Stock" }
];

let cart = JSON.parse(localStorage.getItem("shopEaseCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("shopEaseWishlist")) || [];

const saveCart = () => localStorage.setItem("shopEaseCart", JSON.stringify(cart));
const saveWishlist = () => localStorage.setItem("shopEaseWishlist", JSON.stringify(wishlist));

function getProductImage(id) {
    const card = document.querySelector(`.product-card[data-id="${id}"]`);
    return card ? card.querySelector("img")?.src || "" : "";
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById("cartCount");
    if (cartCount) cartCount.textContent = count;
}

function addToCart(id) {
    const product = products.find(item => item.id === Number(id));
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1, image: getProductImage(product.id) });
    }

    saveCart();
    updateCartCount();
    alert(`${product.name} added to your cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== Number(id));
    saveCart();
    updateCartCount();
    displayCart();
}

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === Number(id));
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) return removeFromCart(id);
    }
    saveCart();
    updateCartCount();
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    let subtotal = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add products to start shopping.</p>
                <a href="products.html" class="shop-button">Browse Products</a>
            </div>`;
    }

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const imgTag = item.image ? `<img src="${item.image}" alt="${item.name}">` : "";
        cartItems.innerHTML += `
            <div class="cart-item">
                ${imgTag}
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price.toLocaleString("en-IN")}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>`;
    });

    const delivery = subtotal === 0 ? 0 : 50;
    const total = subtotal + delivery;

    const summaryItems = document.getElementById("summaryItems");
    const subtotalEl = document.getElementById("cartSubtotal");
    const deliveryEl = document.getElementById("deliveryCharge");
    const totalEl = document.getElementById("cartTotal");
    const checkoutBtn = document.getElementById("checkoutButton");

    if (summaryItems) summaryItems.textContent = cart.reduce((c, i) => c + i.quantity, 0);
    if (subtotalEl) subtotalEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
    if (deliveryEl) deliveryEl.textContent = delivery === 0 ? "Free" : "₹" + delivery;
    if (totalEl) totalEl.textContent = "₹" + total.toLocaleString("en-IN");
    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
}

function addToWishlist(id) {
    const product = products.find(item => item.id === Number(id));
    if (!product) return;

    if (wishlist.some(item => item.id === product.id)) {
        alert("This product is already in your wishlist!");
        return;
    }

    wishlist.push({ ...product, image: getProductImage(product.id) });
    saveWishlist();
    displayWishlist();
    alert(`${product.name} added to your wishlist!`);
}

function displayWishlist() {
    const wishlistItems = document.getElementById("wishlistItems");
    if (!wishlistItems) return;

    wishlistItems.innerHTML = "";
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<p class="wishlist-empty">Your wishlist is empty. Visit Products page to add favourites.</p>';
        return;
    }

    wishlist.forEach(item => {
        const imgTag = item.image ? `<img src="${item.image}" alt="${item.name}">` : "";
        wishlistItems.innerHTML += `
            <div class="wishlist-card">
                ${imgTag}
                <div class="wishlist-card-info">
                    <h3>${item.name}</h3>
                    <p>Category: ${item.category}</p>
                    <p>Price: ₹${item.price.toLocaleString("en-IN")}</p>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                    <button onclick="removeFromWishlist(${item.id})">Remove</button>
                </div>
            </div>`;
    });
}

function removeFromWishlist(id) {
    wishlist = wishlist.filter(item => item.id !== Number(id));
    saveWishlist();
    displayWishlist();
}

function viewDetails(id) {
    const product = products.find(item => item.id === Number(id));
    const modal = document.getElementById("productDetailsModal");
    const details = document.getElementById("productDetails");

    if (!product || !modal || !details) return;

    let image = getProductImage(product.id) || wishlist.find(i => i.id === product.id)?.image || "";
    const imgTag = image ? `<img src="${image}" alt="${product.name}">` : "";

    details.innerHTML = `
        ${imgTag}
        <h2>${product.name}</h2>
        <h3>₹${product.price.toLocaleString("en-IN")}</h3>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Availability:</strong> ${product.availability}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="wishlist-button" onclick="addToWishlist(${product.id})">♡ Wishlist</button>`;

    modal.style.display = "flex";
}

function closeDetails() {
    const modal = document.getElementById("productDetailsModal");
    if (modal) modal.style.display = "none";
}

function searchProducts() {
    const searchInput = document.getElementById("homeSearch") || document.getElementById("productSearch");
    const val = searchInput ? searchInput.value.trim() : "";
    window.location.href = val ? `products.html?search=${encodeURIComponent(val)}` : "products.html";
}

function filterProducts() {
    const productList = document.getElementById("productList");
    if (!productList) return;

    const searchText = (document.getElementById("productSearch")?.value || "").toLowerCase().trim();
    const selectedCategory = document.getElementById("categoryFilter")?.value || "All";
    const productCards = productList.querySelectorAll(".product-card");
    let visibleProducts = 0;

    productCards.forEach(card => {
        const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const desc = card.querySelector(".product-description")?.textContent.toLowerCase() || "";
        const category = card.getAttribute("data-category") || "";

        const matchesSearch = name.includes(searchText) || desc.includes(searchText);
        const matchesCategory = selectedCategory === "All" || category.toLowerCase() === selectedCategory.toLowerCase();

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleProducts++;
        } else {
            card.style.display = "none";
        }
    });

    const noProducts = document.getElementById("noProducts");
    if (noProducts) noProducts.style.display = visibleProducts === 0 ? "block" : "none";
}

function setupEvents() {
    document.getElementById("homeSearch")?.addEventListener("keydown", e => e.key === "Enter" && searchProducts());
    document.getElementById("productSearch")?.addEventListener("input", filterProducts);
    document.getElementById("categoryFilter")?.addEventListener("change", filterProducts);

    const themeButton = document.getElementById("themeButton");
    if (localStorage.getItem("shopEaseTheme") === "dark") document.body.classList.add("dark-mode");
    
    if (themeButton) {
        themeButton.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("shopEaseTheme", isDark ? "dark" : "light");
            themeButton.textContent = isDark ? "Light Mode" : "Dark Mode";
        });
    }

    document.getElementById("contactForm")?.addEventListener("submit", e => {
        e.preventDefault();
        const status = document.getElementById("contactStatus");
        if (status) status.textContent = "Thank you! Your demo form was submitted successfully.";
        e.target.reset();
    });

    document.getElementById("checkoutButton")?.addEventListener("click", () => {
        if (cart.length === 0) return alert("Your cart is empty!");
        alert("This is a demo checkout. No payment has been made.");
        cart = [];
        saveCart();
        updateCartCount();
        displayCart();
    });
}

function loadPageSettings() {
    const url = new URLSearchParams(window.location.search);
    const searchText = url.get("search");
    const category = url.get("category");

    const pSearch = document.getElementById("productSearch");
    const cFilter = document.getElementById("categoryFilter");

    if (pSearch && searchText) pSearch.value = searchText;
    if (cFilter && category) {
        const option = Array.from(cFilter.options).find(o => o.value.toLowerCase() === category.toLowerCase());
        if (option) cFilter.value = option.value;
    }
    filterProducts();
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCart();
    displayWishlist();
    setupEvents();
    loadPageSettings();
});
document.addEventListener("DOMContentLoaded", () => {
    const prodLink = document.getElementById("navProducts");
    const catLink = document.getElementById("navCategories");

    if (prodLink && catLink) {
        catLink.addEventListener("click", () => {
            prodLink.classList.remove("active");
            catLink.classList.add("active");
        });

        prodLink.addEventListener("click", () => {
            catLink.classList.remove("active");
            prodLink.classList.add("active");
        });
    }
});