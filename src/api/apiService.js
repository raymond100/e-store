// apiService.js

const STORAGE_KEY = "user_data";

// Function to get users from localStorage.
export function getUsers() {
  const usersData = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(usersData) || [];
}

// Function to set users in localStorage.
export function setUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Function to create a new user.
export function createUser(newUser) {
  const users = getUsers();
  newUser.id = Date.now(); // Generate a unique ID (for demonstration purposes).
  users.push(newUser);
  setUsers(users);
  return newUser;
}

// Function to update a user's data.
export function updateUser(userId, updatedUserData) {
  const users = getUsers();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUserData };
    setUsers(users);
    return users[userIndex];
  }

  return null; // User not found
}

// Function to delete a user.
export function deleteUser(userId) {
  const users = getUsers();
  const updatedUsers = users.filter((user) => user.id !== userId);
  setUsers(updatedUsers);
}

// Product API

// Generate a random product image URL for demonstration
function generateRandomImageUrl() {
  const imageUrls = [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    // Add more image URLs as needed
  ];
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}

// Function to fetch all products from localStorage
function fetchProducts() {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  return Promise.resolve(storedProducts);
}

// Function to fetch a product by ID from localStorage
function fetchProductById(id) {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const product = storedProducts.find((p) => p.id === id);
  return Promise.resolve(product);
}

function createProduct(productData) {
  const productSlug = productData.productSlug;

  // Check if a product with the same productSlug already exists
  if (isProductInLocalStorage(productSlug)) {
    return Promise.reject(
      new Error(`Product with slug '${productSlug}' already exists.`)
    );
  }

  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const newProduct = {
    ...productData,
    id: Date.now(), // Generate a unique ID for the product
    imageUrl: generateRandomImageUrl(),
  };
  storedProducts.push(newProduct);
  localStorage.setItem("products", JSON.stringify(storedProducts));
  return Promise.resolve(newProduct);
}

// Function to update a product by ID in localStorage
function updateProduct(id, updatedProductData) {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const index = storedProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    storedProducts[index] = {
      ...storedProducts[index],
      ...updatedProductData,
    };
    localStorage.setItem("products", JSON.stringify(storedProducts));
    return Promise.resolve(storedProducts[index]);
  }
  return Promise.reject(new Error("Product not found"));
}

// Function to delete a product by ID from localStorage
function deleteProduct(id) {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const index = storedProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    storedProducts.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(storedProducts));
    return Promise.resolve();
  }
  return Promise.reject(new Error("Product not found"));
}

function isProductInLocalStorage(productSlug) {
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  return storedProducts.some((product) => product.productSlug === productSlug);
}

// Export the API functions
export {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
