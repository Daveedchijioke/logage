
let allProducts = [];
let filteredProducts = [];

// Fetch the product data from the JSON file
fetch("../data/products.json") // Ensure the path is correct
  .then((response) => response.json())
  .then((data) => {
    allProducts = data; // Store products for later use
    filteredProducts = allProducts; // Initially show all products
    displayProducts(filteredProducts); // Display all products initially
  })
  .catch((error) => console.error("Error loading products:", error));

// Function to display the filtered or all products
function displayProducts(products) {
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = ""; // Clear existing products before adding new ones

  // Loop through the filtered products and create product elements
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-details">
        <p>${product.name}</p>
        <div class="rating-div">
          <img src="../images/ratings/rating-0.png" alt="">
          <p>(123 reviews)</p>
        </div>
        <div class="price-div">
          <p class="priceCent">$${product.price}</p>
          <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
    `;
    productContainer.appendChild(productElement);
  });
}

// Function to filter products based on selected category
function filterCategory(category) {
  // Make category comparison case-insensitive by converting both to lowercase
  category = category.toLowerCase();

  if (category === "men") {
    // Show first 60 products for Men
    filteredProducts = allProducts.slice(0, 60);
  } else if (category === "women") {
    // Show remaining 60 products for Women (adjust the slice index as necessary)
    filteredProducts = allProducts.slice(60, 120); // Assuming there are at least 120 products
  } else {
    // Filter based on the selected category (case-insensitive)
    filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === category
    );
  }
  filterProducts(); // Apply the other filters on the filtered products
}

// Function to filter products based on selected filters (Brand, Size, Color, Price)
function filterProducts() {
  const selectedBrand = document.querySelector(
    'input[name="brand"]:checked'
  )?.value;
  const selectedSize = document.querySelector(
    'input[name="size"]:checked'
  )?.value;
  const selectedColor = document.querySelector(
    'input[name="color"]:checked'
  )?.value;

  // Get min and max price values from the number inputs
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice =
    parseInt(document.getElementById("max-price").value) || Infinity;

  // Apply all filters to the already filtered products
  let tempFiltered = filteredProducts.filter((product) => {
    let isValid = true;

    // Check if product matches selected brand
    if (selectedBrand && product.brand !== selectedBrand) {
      isValid = false;
    }

    // Check if product matches selected size
    if (
      selectedSize &&
      product.size.toLowerCase() !== selectedSize.toLowerCase()
    ) {
      isValid = false;
    }

    // Check if product matches selected color
    if (
      selectedColor &&
      product.color.toLowerCase() !== selectedColor.toLowerCase()
    ) {
      isValid = false;
    }

    // Price filtering logic (use minPrice and maxPrice)
    if (product.price < minPrice || product.price > maxPrice) {
      isValid = false;
    }

    return isValid;
  });

  // Display the filtered products
  displayProducts(tempFiltered);
}

// Function to toggle the selected class on the clicked button
function setActiveButton(buttonId) {
  const buttons = document.querySelectorAll(".brand-container button");
  buttons.forEach((btn) => {
    if (btn.id === buttonId) {
      btn.classList.add("selected");
    } else {
      btn.classList.remove("selected");
    }
  });
}

// Event listeners for category buttons (e.g., Men, Women, Luggage, etc.)
document.getElementById("luggage").addEventListener("click", () => {
  setActiveButton("luggage");
  filterCategory("luggage");
});

document.getElementById("travelBags").addEventListener("click", () => {
  setActiveButton("travelBags");
  filterCategory("travel bag");
});

document.getElementById("bags").addEventListener("click", () => {
  setActiveButton("bags");
  filterCategory("bags");
});

document.getElementById("rollingLuggage").addEventListener("click", () => {
  setActiveButton("rollingLuggage");
  filterCategory("rolling luggage");
});

document.getElementById("men").addEventListener("click", () => {
  setActiveButton("men");
  filterCategory("men");
});

document.getElementById("women").addEventListener("click", () => {
  setActiveButton("women");
  filterCategory("women");
});

// Event listeners for radio buttons (Brand, Size, Color, Price)
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", filterProducts); // Apply filters when a radio button is clicked
});

// Event listeners for price inputs (min and max price)
document.getElementById("min-price").addEventListener("input", filterProducts);
document.getElementById("max-price").addEventListener("input", filterProducts);

// Event listener for the Reset Filters button
document.getElementById("applyFilters").addEventListener("click", function () {
  // Reset all filter selections
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.checked = false;
  });

  // Reset price inputs
  document.getElementById("min-price").value = "";
  document.getElementById("max-price").value = "";

  // Reset filteredProducts to show all products again
  filteredProducts = allProducts;
  displayProducts(filteredProducts);

  // Remove the selected class from all buttons
  document.querySelectorAll(".brand-container button").forEach((button) => {
    button.classList.remove("selected");
  });
});

//search functionality begins here


// Search functionality
document.getElementById('searchInput').addEventListener('input', searchFunction);

function searchFunction(event) {
  let query = event.target.value.toLowerCase(); // Get input value correctly

  // Filter products based on search input
  filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query) ||
    product.color.toLowerCase().includes(query)
  );

  // Display the filtered products
  displayProducts(filteredProducts);
}
