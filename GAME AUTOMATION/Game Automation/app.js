// Import necessary modules
const readline = require('readline');
const fs = require('fs');

// Create a simple inventory database (can be replaced with a real database)
let inventory = [];

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to display the main menu
function displayMainMenu() {
  console.log("\n===== Inventory Management System =====");
  console.log("1. View Inventory");
  console.log("2. Add Product");
  console.log("3. Sell Product");
  console.log("4. Generate Reports");
  console.log("5. Exit");
}

// Function to handle user input based on the main menu
function handleMainMenuInput(choice) {
  switch (choice) {
    case '1':
      viewInventory();
      break;
    case '2':
      addProduct();
      break;
    case '3':
      sellProduct();
      break;
    case '4':
      generateReports();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log("Invalid choice. Please enter a valid option.");
      break;
  }
}

// Function to view the current inventory
function viewInventory() {
  console.log("\n===== Current Inventory =====");
  if (inventory.length === 0) {
    console.log("Inventory is empty.");
  } else {
    console.table(inventory);
  }
  rl.question("Press Enter to continue...", () => displayMainMenu());
}

// Function to add a new product to the inventory
function addProduct() {
  rl.question("Enter product name: ", (name) => {
    rl.question("Enter product quantity: ", (quantity) => {
      rl.question("Enter product price: ", (price) => {
        const product = {
          name,
          quantity: parseInt(quantity),
          price: parseFloat(price)
        };
        inventory.push(product);
        console.log(`\n${name} added to the inventory.`);
        displayMainMenu();
      });
    });
  });
}

// Function to sell a product
function sellProduct() {
  viewInventory();
  rl.question("Enter the index of the product to sell: ", (index) => {
    rl.question("Enter the quantity to sell: ", (quantity) => {
      const selectedProduct = inventory[index];
      if (selectedProduct && selectedProduct.quantity >= quantity) {
        selectedProduct.quantity -= quantity;
        console.log(`\nSold ${quantity} units of ${selectedProduct.name}.`);
      } else {
        console.log("Invalid product index or insufficient stock.");
      }
      displayMainMenu();
    });
  });
}

// Function to generate basic reports
function generateReports() {
  // Generate reports logic goes here
  console.log("\n===== Reports =====");
  console.log("Sales Report: ...");
  console.log("Stock Availability Report: ...");
  rl.question("Press Enter to continue...", () => displayMainMenu());
}

// Initial display of the main menu
displayMainMenu();

// Handle user input
rl.on('line', (input) => {
  handleMainMenuInput(input.trim());
});
