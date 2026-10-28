const API_URL = '/api/items';

const form = document.getElementById('item-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');
const itemsBody = document.getElementById('items-body');
const message = document.getElementById('message');
const itemCount = document.getElementById('item-count');

let editingId = null;
let messageTimeout;

function showMessage(text, isError = false) {
  clearTimeout(messageTimeout);
  message.textContent = text;
  message.classList.toggle('error', isError);
  messageTimeout = setTimeout(() => { message.textContent = ''; }, 3500);
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Something went wrong.');
  return data;
}

async function loadItems() {
  try {
    const items = await request(API_URL);
    renderItems(items);
  } catch (error) {
    itemsBody.innerHTML = '';
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4;
    cell.className = 'empty-state';
    cell.textContent = 'Could not load items. Check that the server is running.';
    row.appendChild(cell);
    itemsBody.appendChild(row);
    showMessage(error.message, true);
  }
}

function renderItems(items) {
  itemsBody.innerHTML = '';
  itemCount.textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;

  if (items.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4;
    cell.className = 'empty-state';
    cell.textContent = 'No items yet. Add one using the form above.';
    row.appendChild(cell);
    itemsBody.appendChild(row);
    return;
  }

  items.forEach((item) => {
    const row = document.createElement('tr');
    addCell(row, item.id);
    addCell(row, item.name);
    addCell(row, `₹${Number(item.price).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`);

    const actionCell = document.createElement('td');
    const actions = document.createElement('div');
    actions.className = 'actions';

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'action-button edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => startEdit(item));

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'action-button delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteItem(item.id));

    actions.append(editButton, deleteButton);
    actionCell.appendChild(actions);
    row.appendChild(actionCell);
    itemsBody.appendChild(row);
  });
}

function addCell(row, value) {
  const cell = document.createElement('td');
  cell.textContent = value;
  row.appendChild(cell);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const price = priceInput.value;

  if (!name || price === '' || Number(price) < 0 || !Number.isFinite(Number(price))) {
    showMessage('Enter a valid name and a price of 0 or more.', true);
    return;
  }

  const isEditing = editingId !== null;
  const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
  const method = isEditing ? 'PUT' : 'POST';

  try {
    await request(url, { method, body: JSON.stringify({ name, price }) });
    resetForm();
    showMessage(isEditing ? 'Item updated successfully.' : 'Item added successfully.');
    await loadItems();
  } catch (error) {
    showMessage(error.message, true);
  }
});

function startEdit(item) {
  editingId = item.id;
  nameInput.value = item.name;
  priceInput.value = item.price;
  submitButton.textContent = 'Update';
  document.getElementById('form-title').textContent = 'Edit item';
  cancelButton.classList.remove('hidden');
  nameInput.focus();
  document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function deleteItem(id) {
  if (!window.confirm('Are you sure you want to delete this item?')) return;
  try {
    await request(`${API_URL}/${id}`, { method: 'DELETE' });
    if (editingId === id) resetForm();
    showMessage('Item deleted successfully.');
    await loadItems();
  } catch (error) {
    showMessage(error.message, true);
  }
}

function resetForm() {
  editingId = null;
  form.reset();
  submitButton.textContent = 'Submit';
  document.getElementById('form-title').textContent = 'Add an item';
  cancelButton.classList.add('hidden');
}

cancelButton.addEventListener('click', resetForm);
loadItems();
