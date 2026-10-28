const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory array for this lab task. Data resets when the server restarts.
let items = [
  { id: 1, name: 'Book', price: 250 },
  { id: 2, name: 'Pen', price: 25 }
];
let nextId = 3;

// READ: get all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// CREATE: add a new item
app.post('/api/items', (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const price = Number(req.body.price);

  if (!name || req.body.price === '' || req.body.price === undefined || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ message: 'Enter a valid name and a price of 0 or more.' });
  }

  const newItem = { id: nextId++, name, price };
  items.push(newItem);
  res.status(201).json(newItem);
});

// UPDATE: edit an existing item
app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const price = Number(req.body.price);

  if (!name || req.body.price === '' || req.body.price === undefined || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ message: 'Enter a valid name and a price of 0 or more.' });
  }

  item.name = name;
  item.price = price;
  res.json(item);
});

// DELETE: remove an item
app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const itemIndex = items.findIndex((entry) => entry.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  const deletedItem = items.splice(itemIndex, 1)[0];
  res.json({ message: 'Item deleted successfully.', item: deletedItem });
});

app.listen(PORT, () => {
  console.log(`CRUD app is running at http://localhost:${PORT}`);
});
