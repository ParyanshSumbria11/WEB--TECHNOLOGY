
const products = [
    {
        id: 1,
        name: "Sneakers",
        price: 1299,
        category: "Footwear",
        brand: "WalkStyle",
        description: "Comfortable sneakers for daily use, casual outings, and walking.",
        availability: "In Stock"
    },
    {
        id: 2,
        name: "Classic Watch",
        price: 2999,
        category: "Accessories",
        brand: "TimeCraft",
        description: "A stylish wristwatch for everyday use and special occasions.",
        availability: "In Stock"
    },
    {
        id: 3,
        name: "Handbag",
        price: 1899,
        category: "Accessories",
        brand: "StyleCarry",
        description: "A fashionable handbag for carrying your everyday essentials.",
        availability: "In Stock"
    },
    {
        id: 4,
        name: "Headphones",
        price: 2499,
        category: "Electronics",
        brand: "SoundMax",
        description: "Comfortable headphones for music, videos, and entertainment.",
        availability: "In Stock"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 799,
        category: "Accessories",
        brand: "SunStyle",
        description: "Modern sunglasses for sunny days and outdoor activities.",
        availability: "In Stock"
    },
    {
        id: 6,
        name: "Hoodie",
        price: 1499,
        category: "Clothing",
        brand: "UrbanWear",
        description: "A comfortable hoodie suitable for casual everyday wear.",
        availability: "In Stock"
    },
    {
        id: 7,
        name: "Camera",
        price: 4999,
        category: "Electronics",
        brand: "ClickPro",
        description: "A digital camera for capturing everyday moments and memories.",
        availability: "In Stock"
    },
    {
        id: 8,
        name: "Perfume",
        price: 1299,
        category: "Accessories",
        brand: "FreshAura",
        description: "A fragrance suitable for everyday use and special occasions.",
        availability: "In Stock"
    }
];

let cart = JSON.parse(localStorage.getItem("shopEaseCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("shopEaseWishlist")) || [];

function saveCart() {
    localStorage.setItem("shopEaseCart", JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem("shopEaseWishlist", JSON.stringify(wishlist));
}

function getProductImage(id) {
    let card = document.querySelector(
        '.product-card[data-id="' + id + '"]'
    );

    if (card) {
        let image = card.querySelector("img");

        if (image) {
            return image.src;
        }
    }

    return "";
}

function updateCartCount() {
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

function addToCart(id) {
    let product = products.find(function(item) {
        return item.id === Number(id);
    });

    if (!product) {
        return;
    }

    let existingItem = cart.find(function(item) {
        return item.id === product.id;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        let image = getProductImage(product.id);

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            quantity: 1,
            image: image
        });
    }

    saveCart();
    updateCartCount();

    alert(product.name + " added to your cart!");
}

function removeFromCart(id) {
    cart = cart.filter(function(item) {
        return item.id !== Number(id);
    });

    saveCart();
    updateCartCount();
    displayCart();
}

function changeQuantity(id, amount) {
    let item = cart.find(function(product) {
        return product.id === Number(id);
    });

    if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }

    saveCart();
    updateCartCount();
    displayCart();
}

function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let summaryItems = document.getElementById("summaryItems");
    let subtotalElement = document.getElementById("cartSubtotal");
    let deliveryElement = document.getElementById("deliveryCharge");
    let totalElement = document.getElementById("cartTotal");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<div class="empty-cart">' +
            '<h3>Your cart is empty</h3>' +
            '<p>Add products to start shopping.</p>' +
            '<a href="products.html" class="shop-button">Browse Products</a>' +
            '</div>';
    }

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];

        subtotal += item.price * item.quantity;

        let imageHTML = "";

        if (item.image) {
            imageHTML =
                '<img src="' + item.image +
                '" alt="' + item.name + '">';
        }

        cartItems.innerHTML +=
            '<div class="cart-item">' +
                imageHTML +
                '<div>' +
                    '<h3>' + item.name + '</h3>' +
                    '<p>Price: ₹' +
                    item.price.toLocaleString("en-IN") + '</p>' +
                    '<p>Quantity: ' + item.quantity + '</p>' +
                    '<button onclick="changeQuantity(' + item.id + ', -1)">-</button> ' +
                    '<button onclick="changeQuantity(' + item.id + ', 1)">+</button> ' +
                    '<button onclick="removeFromCart(' + item.id + ')">Remove</button>' +
                '</div>' +
            '</div>';
    }

    let delivery = subtotal === 0 ? 0 : 50;
    let total = subtotal + delivery;

    if (summaryItems) {
        summaryItems.textContent = cart.reduce(function(count, item) {
            return count + item.quantity;
        }, 0);
    }

    if (subtotalElement) {
        subtotalElement.textContent =
            "₹" + subtotal.toLocaleString("en-IN");
    }

    if (deliveryElement) {
        deliveryElement.textContent =
            delivery === 0 ? "Free" : "₹" + delivery;
    }

    if (totalElement) {
        totalElement.textContent =
            "₹" + total.toLocaleString("en-IN");
    }

    let checkoutButton = document.getElementById("checkoutButton");

    if (checkoutButton) {
        checkoutButton.disabled = cart.length === 0;
    }
}

/* WISHLIST FUNCTIONS */

function addToWishlist(id) {
    let product = products.find(function(item) {
        return item.id === Number(id);
    });

    if (!product) {
        return;
    }

    let existingItem = wishlist.find(function(item) {
        return item.id === product.id;
    });

    if (existingItem) {
        alert("This product is already in your wishlist!");
        return;
    }

    wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        description: product.description,
        availability: product.availability,
        image: getProductImage(product.id)
    });

    saveWishlist();
    displayWishlist();

    alert(product.name + " added to your wishlist!");
}

function displayWishlist() {
    let wishlistItems = document.getElementById("wishlistItems");

    if (!wishlistItems) {
        return;
    }

    wishlistItems.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistItems.innerHTML =
            '<p class="wishlist-empty">Your wishlist is empty. ' +
            'Visit the Products page to add your favourites.</p>';
        return;
    }

    for (let i = 0; i < wishlist.length; i++) {
        let item = wishlist[i];
        let imageHTML = "";

        if (item.image) {
            imageHTML =
                '<img src="' + item.image +
                '" alt="' + item.name + '">';
        }

        wishlistItems.innerHTML +=
            '<div class="wishlist-card">' +
                imageHTML +
                '<div class="wishlist-card-info">' +
                    '<h3>' + item.name + '</h3>' +
                    '<p>Category: ' + item.category + '</p>' +
                    '<p>Price: ₹' +
                    item.price.toLocaleString("en-IN") + '</p>' +
                    '<button onclick="addToCart(' + item.id + ')">Add to Cart</button> ' +
                    '<button onclick="removeFromWishlist(' + item.id + ')">Remove</button>' +
                '</div>' +
            '</div>';
    }
}

function removeFromWishlist(id) {
    wishlist = wishlist.filter(function(item) {
        return item.id !== Number(id);
    });

    saveWishlist();
    displayWishlist();
}

/* VIEW DETAILS FUNCTIONS */

function viewDetails(id) {
    let product = products.find(function(item) {
        return item.id === Number(id);
    });

    if (!product) {
        return;
    }

    let modal = document.getElementById("productDetailsModal");
    let details = document.getElementById("productDetails");

    if (!modal || !details) {
        alert("The product details popup is missing from this HTML page.");
        return;
    }

    let image = getProductImage(product.id);

    if (!image) {
        let savedItem = wishlist.find(function(item) {
            return item.id === product.id;
        });

        if (savedItem) {
            image = savedItem.image;
        }
    }

    let imageHTML = "";

    if (image) {
        imageHTML =
            '<img src="' + image + '" alt="' + product.name + '">';
    }

    details.innerHTML =
        imageHTML +
        '<h2>' + product.name + '</h2>' +
        '<h3>₹' + product.price.toLocaleString("en-IN") + '</h3>' +
        '<p><strong>Brand:</strong> ' + product.brand + '</p>' +
        '<p><strong>Category:</strong> ' + product.category + '</p>' +
        '<p><strong>Description:</strong> ' + product.description + '</p>' +
        '<p><strong>Availability:</strong> ' + product.availability + '</p>' +
        '<button onclick="addToCart(' + product.id + ')">Add to Cart</button> ' +
        '<button class="wishlist-button" onclick="addToWishlist(' +
        product.id + ')">♡ Wishlist</button>';

    modal.style.display = "flex";
}

function closeDetails() {
    let modal = document.getElementById("productDetailsModal");

    if (modal) {
        modal.style.display = "none";
    }
}

/* SEARCH AND CATEGORY FILTERS */

function searchProducts() {
    let searchInput = document.getElementById("homeSearch");

    if (!searchInput) {
        searchInput = document.getElementById("productSearch");
    }

    if (searchInput && searchInput.value.trim() !== "") {
        window.location.href = "products.html?search=" +
            encodeURIComponent(searchInput.value.trim());
    } else {
        window.location.href = "products.html";
    }
}

function filterProducts() {
    let productList = document.getElementById("productList");

    if (!productList) {
        return;
    }

    let searchInput = document.getElementById("productSearch");
    let categoryFilter = document.getElementById("categoryFilter");

    let searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let selectedCategory = categoryFilter
        ? categoryFilter.value
        : "All";

    let productCards = productList.querySelectorAll(".product-card");
    let visibleProducts = 0;

    for (let i = 0; i < productCards.length; i++) {
        let card = productCards[i];
        let name = card.querySelector("h3");
        let description = card.querySelector(".product-description");
        let category = card.getAttribute("data-category") || "";

        let productName = name
            ? name.textContent.toLowerCase()
            : "";

        let productDescription = description
            ? description.textContent.toLowerCase()
            : "";

        let matchesSearch =
            productName.includes(searchText) ||
            productDescription.includes(searchText);

        let matchesCategory =
            selectedCategory === "All" ||
            category.toLowerCase() === selectedCategory.toLowerCase();

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleProducts++;
        } else {
            card.style.display = "none";
        }
    }

    let noProducts = document.getElementById("noProducts");

    if (noProducts) {
        noProducts.style.display =
            visibleProducts === 0 ? "block" : "none";
    }
}

function setupSearch() {
    let homeSearch = document.getElementById("homeSearch");

    if (homeSearch) {
        homeSearch.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                searchProducts();
            }
        });
    }

    let productSearch = document.getElementById("productSearch");

    if (productSearch) {
        productSearch.addEventListener("input", filterProducts);
    }

    let categoryFilter = document.getElementById("categoryFilter");

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterProducts);
    }
}

/* DARK MODE */

function setupDarkMode() {
    let themeButton = document.getElementById("themeButton");

    if (localStorage.getItem("shopEaseTheme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeButton) {
        themeButton.textContent =
            document.body.classList.contains("dark-mode")
                ? "Light Mode"
                : "Dark Mode";

        themeButton.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("shopEaseTheme", "dark");
                themeButton.textContent = "Light Mode";
            } else {
                localStorage.setItem("shopEaseTheme", "light");
                themeButton.textContent = "Dark Mode";
            }
        });
    }
}

/* CONTACT FORM */

function setupContactForm() {
    let contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();

            let name = document.getElementById("contactName");
            let email = document.getElementById("contactEmail");
            let message = document.getElementById("contactMessage");
            let status = document.getElementById("contactStatus");

            if (
                !name || !email || !message ||
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                message.value.trim() === ""
            ) {
                if (status) {
                    status.textContent =
                        "Please fill in all required fields.";
                }

                return;
            }

            if (status) {
                status.textContent =
                    "Thank you! Your demo form was submitted successfully.";
            }

            contactForm.reset();
        });
    }
}

/* CHECKOUT */

function setupCheckout() {
    let checkoutButton = document.getElementById("checkoutButton");

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function() {
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            alert("This is a demo checkout. No payment has been made.");

            cart = [];

            saveCart();
            updateCartCount();
            displayCart();
        });
    }
}

/* LOAD SEARCH, CATEGORY AND PAGE SETTINGS */

function loadPageSettings() {
    let url = new URLSearchParams(window.location.search);
    let searchText = url.get("search");
    let category = url.get("category");

    let productSearch = document.getElementById("productSearch");
    let categoryFilter = document.getElementById("categoryFilter");

    if (productSearch && searchText) {
        productSearch.value = searchText;
    }

    if (categoryFilter && category) {
        for (let i = 0; i < categoryFilter.options.length; i++) {
            if (
                categoryFilter.options[i].value.toLowerCase() ===
                category.toLowerCase()
            ) {
                categoryFilter.value = categoryFilter.options[i].value;
                break;
            }
        }
    }

    filterProducts();
}

/* START THE WEBSITE FEATURES */

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    displayCart();
    displayWishlist();
    setupSearch();
    setupDarkMode();
    setupContactForm();
    setupCheckout();
    loadPageSettings();
});
