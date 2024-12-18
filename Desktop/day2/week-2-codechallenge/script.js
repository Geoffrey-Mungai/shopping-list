// Initialize the shopping list array and load items from localStorage if available
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Get DOM elements
const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItemButton');
const shoppingListContainer = document.getElementById('shoppingList');
const clearListButton = document.getElementById('clearListButton');

function renderShoppingList() {
  shoppingListContainer.innerHTML = '';

  shoppingList.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('list-item');
    if (item.purchased) li.classList.add('purchased')

    li.innerHTML = `
      <span>${item.name}</span>
      <div class="actions">
        <button class="mark-purchased">Mark Purchased</button>
        <button class="edit-item">Edit</button>
        <button class="delete-item">Delete</button>
      </div>
    `;

    li.querySelector('.mark-purchased').addEventListener('click', () => markAsPurchased(index));
    
    li.querySelector('.edit-item').addEventListener('click', () => editItem(index));

    li.querySelector('.delete-item').addEventListener('click', () => deleteItem(index));

    shoppingListContainer.appendChild(li);
  });

  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function addItem() {
  const itemName = itemInput.value.trim();
  if (itemName) {
    shoppingList.push({ name: itemName, purchased: false });
    itemInput.value = ''; 
    renderShoppingList();
  }
}

function markAsPurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased;
  renderShoppingList();
}

function editItem(index) {
  const newName = prompt('Edit item:', shoppingList[index].name);
  if (newName) {
    shoppingList[index].name = newName.trim();
    renderShoppingList();
  }
}

function deleteItem(index) {
  alert("Are you sure you want to delete the item!!");
  shoppingList.splice(index, 1);
  renderShoppingList();
}

function clearList() {
  alert("Are you sure you want to clear item!!");
  shoppingList = [];
  renderShoppingList();
}

addItemButton.addEventListener('click', addItem);

clearListButton.addEventListener('click', clearList);

renderShoppingList();