const express = require('express');
const router=express.Router()

const users = [
    {
      name: "John Doe",
      phone: 1234567890,
      email: "johndoe@example.com",
      password: "password123",
      Giftlist: ["Book", "Watch", "Perfume"]
    },
    {
      name: "Jane Smith",
      phone: 9876543210,
      email: "janesmith@example.com",
      password: "securepass456",
      Giftlist: ["Laptop", "Headphones", "Gift Card"]
    },
    {
      name: "David Johnson",
      phone: 4561237890,
      email: "davidjohnson@example.com",
      password: "mypassword789",
      Giftlist: ["Camera", "Tripod", "Memory Card"]
    },
    {
      name: "Emily Brown",
      phone: 3216549870,
      email: "emilybrown@example.com",
      password: "emilypass321",
      Giftlist: ["Yoga Mat", "Dumbbells", "Fitness Tracker"]
    }
  ];


const findUserById = (id) =>users.find((user) => user.id === id);

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get one product by ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.json(user);
});

// Update a user by ID
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const {
    name,
    image,
  } = req.body;

  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }


  if (name !== undefined) user.name = name;
    res.json(user);
});
// Add a new user
router.post('/', (req, res) => {
  const { id, name, phone, email, password } = req.body;
  if (!id || !name || !phone || !email || !password) {
    return res.status(400).json({ message: 'ID, name, phone, email, and password are required' });
  }
  const newuser = {
    id,
    name,
    phone,
    email,
    password,
    Giftlist: []
  };

  try {
    users.push(newuser)
    res.status(201).json(newuser); 
  } catch (error) {
    console.error('Error adding user:', error);   
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Delete a user by ID
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id === userrId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'user is not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports=router