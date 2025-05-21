const express = require('express');
const router=express.Router()

const donors=[
    {
      "name": "John Doe",
      "id": "1",
      "image": "teddy.jpg"
    },
    {
      "name": "Jane Doe",
      "id": "2",
      "image": "boardgame.jpg"
    },
    {
      "name": "Jane Doe",
      "id": "3",
      "image": "boardgame.jpg"
    },
    {
      "name": "",
      "id": "1025",
      "image": "sneakers.jpg"
    },
    {
      "name": "",
      "id": "1026",
      "image": "teal-t-shirt.jpg"
    },
    {
      "name": "",
      "id": "1027",
      "image": "yellow-earbuds.jpg"
    },
    {
      "name": "",
      "id": "1028",
      "image": "yoga-mat.jpg"
    },
    {
      "name": "",
      "id": "1029",
      "image": "yoga-set.jpg"
    },
    {
      "name": "David James",
      "id": "1000",
      "image": "bamboo-watch.jpg"
    },
    {
      "name": "Leon Rodrigues",
      "id": "1000",
      "image": "bamboo-watch.jpg"
    },
    {
      "name": "Juan Alejandro",
      "id": "1000",
      "image": "bamboo-watch.jpg"
    },
    {
      "name": "Claire Morrow",
      "id": "1000",
      "image": "bamboo-watch.jpg"
    },
    {
      "name": "Maisha Jefferson",
      "id": "1001",
      "image": "black-watch.jpg"
    },
    {
      "name": "Octavia Murillo",
      "id": "1001",
      "image": "black-watch.jpg"
    },
    {
      "name": "Stacey Leja",
      "id": "1002",
      "image": "blue-band.jpg"
    },
    {
      "name": "Ashley Wickens",
      "id": "1002",
      "image": "blue-band.jpg"
    },
    {
      "name": "",
      "id": "1003",
      "image": "blue-t-shirt.jpg"
    },
    {
      "name": "Mayumi Misaki",
      "id": "1004",
      "image": "bracelet.jpg"
    },
    {
      "name": "Francesco Salvatore",
      "id": "1004",
      "image": "bracelet.jpg"
    },
    {
      "name": "Isabel Sinclair",
      "id": "1005",
      "image": "brown-purse.jpg"
    },
    {
      "name": "Lionel Clifford",
      "id": "1005",
      "image": "brown-purse.jpg"
    },
    {
      "name": "Cody Chavez",
      "id": "1005",
      "image": "brown-purse.jpg"
    },
    {
      "name": "Arvin Darci",
      "id": "1006",
      "image": "chakra-bracelet.jpg"
    },
    {
      "name": "Izzy Jones",
      "id": "1006",
      "image": "chakra-bracelet.jpg"
    },
    {
      "name": "Jennifer Smith",
      "id": "1007",
      "image": "galaxy-earrings.jpg"
    },
    {
      "name": "Jeanfrancois David",
      "id": "1008",
      "image": "game-controller.jpg"
    },
    {
      "name": "Ivar Greenwood",
      "id": "1008",
      "image": "game-controller.jpg"
    },
    {
      "name": "Kadeem Mujtaba",
      "id": "1009",
      "image": "gaming-set.jpg"
    },
    {
      "name": "Ashley Wickens",
      "id": "1009",
      "image": "gaming-set.jpg"
    },
    {
      "name": "Julie Johnson",
      "id": "1009",
      "image": "gaming-set.jpg"
    },
    {
      "name": "Tony Costa",
      "id": "1009",
      "image": "gaming-set.jpg"
    }
  ]
const findDonorById = (id) => donors.find((donor) => donor.id === id);

// Get all Donors
router.get('/', (req, res) => {
  res.json(donors);
});

// Get one product by ID
router.get('/:id', (req, res) => {
  const donorId = req.params.id;
  const donor = findDonorById(donorId);

  if (!donor) {
    return res.status(404).json({ message: 'donor not found' });
  }

  res.json(donor);
});

// Add a new Donor
router.post('/', (req, res) => {
  const {id,name,image,} = req.body;

  if (!id || !name ) {
    return res.status(400).json({ message: 'ID and name are required' });
  }

  const newDonor = { id,name, image: image || '',};

  donors.push(newDonor);
  res.status(201).json(newDonor);
});

// Update a Donor by ID
router.put('/:id', (req, res) => {
  const donorId = req.params.id;
  const {
    name,
    image,
  } = req.body;

  const donor = findDonorById(donorId);

  if (!donor) {
    return res.status(404).json({ message: 'donor not found' });
  }


  if (name !== undefined) donor.name = name;
  if (image !== undefined) donor.image = image;


  res.json(donor);
});

// Delete a Donor by ID
router.delete('/:id', (req, res) => {
  const donorId = req.params.id;
  const donorIndex = donors.findIndex((donor) => donor.id === donorId);

  if (donorIndex === -1) {
    return res.status(404).json({ message: 'donor is not found' });
  }

  donors.splice(donorIndex, 1);
  res.status(204).send();
});

module.exports=router