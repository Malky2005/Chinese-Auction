const express = require('express');
const bodyParser = require('body-parser');
const corsOptions = require('./config/corsOptions');
const app = express();
const PORT = 3000;
const cors=require("cors")

// Middleware
app.use(express.json());
app.use(cors(corsOptions))
const donorRout=require("./routs/donors")
const userRout=require("./routs/users")
// In-memory product list
let products = [
  {
    id: '1',
    code: 'PROD001',
    name: 'Teddy Bear',
    description: 'A soft teddy bear',
    price: 25.99,
    quantity: 10,
    inventoryStatus: 'INSTOCK',
    category: 'Toys',
    image: 'teddy.jpg',
    rating: 4,
    giver: 'John Doe',
  },
  {
    id: '3',
    code: 'PROD003',
    name: 'Board Game3',
    description: 'A fun family board game',
    price: 39.99,
    quantity: 5,
    inventoryStatus: 'INSTOCK',
    category: 'Games',
    image: 'boardgame.jpg',
    rating: 5,
    giver: 'Jane Doe',
  },
  {
    id: '2',
    code: 'PROD002',
    name: 'Board Game',
    description: 'A fun family board game',
    price: 39.99,
    quantity: 5,
    inventoryStatus: 'INSTOCK',
    category: 'Games',
    image: 'boardgame.jpg',
    rating: 5,
    giver: 'Jane Doe',
  },
  {
    id: '1025',
    code: 'nbm5mv45n',
    name: 'Sneakers',
    description: 'Product Description',
    image: 'sneakers.jpg',
    price: 78,
    category: 'Clothing',
    quantity: 52,
    inventoryStatus: 'INSTOCK',
    rating: 4,
    giver: ""
},
{
    id: '1026',
    code: 'zx23zc42c',
    name: 'Teal T-Shirt',
    description: 'Product Description',
    image: 'teal-t-shirt.jpg',
    price: 49,
    category: 'Clothing',
    quantity: 3,
    inventoryStatus: 'LOWSTOCK',
    rating: 3,
    giver: ""
},
{
    id: '1027',
    code: 'acvx872gc',
    name: 'Yellow Earbuds',
    description: 'Product Description',
    image: 'yellow-earbuds.jpg',
    price: 89,
    category: 'Electronics',
    quantity: 35,
    inventoryStatus: 'INSTOCK',
    rating: 3,
    giver: ""
},
{
    id: '1028',
    code: 'tx125ck42',
    name: 'Yoga Mat',
    description: 'Product Description',
    image: 'yoga-mat.jpg',
    price: 20,
    category: 'Fitness',
    quantity: 15,
    inventoryStatus: 'INSTOCK',
    rating: 5,
    giver: ""
},
{
    id: '1029',
    code: 'gwuby345v',
    name: 'Yoga Set',
    description: 'Product Description',
    image: 'yoga-set.jpg',
    price: 20,
    category: 'Fitness',
    quantity: 25,
    inventoryStatus: 'INSTOCK',
    rating: 8,
    giver: ""
}
,
{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5,
    orders: [
        {
            id: '1000-0',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 65,
            quantity: 1,
            customer: 'David James',
            status: 'PENDING'
        },
        {
            id: '1000-1',
            productCode: 'f230fh0g3',
            date: '2020-05-14',
            amount: 130,
            quantity: 2,
            customer: 'Leon Rodrigues',
            status: 'DELIVERED'
        },
        {
            id: '1000-2',
            productCode: 'f230fh0g3',
            date: '2019-01-04',
            amount: 65,
            quantity: 1,
            customer: 'Juan Alejandro',
            status: 'RETURNED'
        },
        {
            id: '1000-3',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 195,
            quantity: 3,
            customer: 'Claire Morrow',
            status: 'CANCELLED'
        }
    ]
},
{
    id: '1001',
    code: 'nvklal433',
    name: 'Black Watch',
    description: 'Product Description',
    image: 'black-watch.jpg',
    price: 72,
    category: 'Accessories',
    quantity: 61,
    inventoryStatus: 'INSTOCK',
    rating: 4,
    orders: [
        {
            id: '1001-0',
            productCode: 'nvklal433',
            date: '2020-05-14',
            amount: 72,
            quantity: 1,
            customer: 'Maisha Jefferson',
            status: 'DELIVERED'
        },
        {
            id: '1001-1',
            productCode: 'nvklal433',
            date: '2020-02-28',
            amount: 144,
            quantity: 2,
            customer: 'Octavia Murillo',
            status: 'PENDING'
        }
    ]
},
{
    id: '1002',
    code: 'zz21cz3c1',
    name: 'Blue Band',
    description: 'Product Description',
    image: 'blue-band.jpg',
    price: 79,
    category: 'Fitness',
    quantity: 2,
    inventoryStatus: 'LOWSTOCK',
    rating: 3,
    orders: [
        {
            id: '1002-0',
            productCode: 'zz21cz3c1',
            date: '2020-07-05',
            amount: 79,
            quantity: 1,
            customer: 'Stacey Leja',
            status: 'DELIVERED'
        },
        {
            id: '1002-1',
            productCode: 'zz21cz3c1',
            date: '2020-02-06',
            amount: 79,
            quantity: 1,
            customer: 'Ashley Wickens',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1003',
    code: '244wgerg2',
    name: 'Blue T-Shirt',
    description: 'Product Description',
    image: 'blue-t-shirt.jpg',
    price: 29,
    category: 'Clothing',
    quantity: 25,
    inventoryStatus: 'INSTOCK',
    rating: 5,
    orders: []
},
{
    id: '1004',
    code: 'h456wer53',
    name: 'Bracelet',
    description: 'Product Description',
    image: 'bracelet.jpg',
    price: 15,
    category: 'Accessories',
    quantity: 73,
    inventoryStatus: 'INSTOCK',
    rating: 4,
    orders: [
        {
            id: '1004-0',
            productCode: 'h456wer53',
            date: '2020-09-05',
            amount: 60,
            quantity: 4,
            customer: 'Mayumi Misaki',
            status: 'PENDING'
        },
        {
            id: '1004-1',
            productCode: 'h456wer53',
            date: '2019-04-16',
            amount: 2,
            quantity: 30,
            customer: 'Francesco Salvatore',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1005',
    code: 'av2231fwg',
    name: 'Brown Purse',
    description: 'Product Description',
    image: 'brown-purse.jpg',
    price: 120,
    category: 'Accessories',
    quantity: 0,
    inventoryStatus: 'OUTOFSTOCK',
    rating: 4,
    orders: [
        {
            id: '1005-0',
            productCode: 'av2231fwg',
            date: '2020-01-25',
            amount: 120,
            quantity: 1,
            customer: 'Isabel Sinclair',
            status: 'RETURNED'
        },
        {
            id: '1005-1',
            productCode: 'av2231fwg',
            date: '2019-03-12',
            amount: 240,
            quantity: 2,
            customer: 'Lionel Clifford',
            status: 'DELIVERED'
        },
        {
            id: '1005-2',
            productCode: 'av2231fwg',
            date: '2019-05-05',
            amount: 120,
            quantity: 1,
            customer: 'Cody Chavez',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1006',
    code: 'bib36pfvm',
    name: 'Chakra Bracelet',
    description: 'Product Description',
    image: 'chakra-bracelet.jpg',
    price: 32,
    category: 'Accessories',
    quantity: 5,
    inventoryStatus: 'LOWSTOCK',
    rating: 3,
    orders: [
        {
            id: '1006-0',
            productCode: 'bib36pfvm',
            date: '2020-02-24',
            amount: 32,
            quantity: 1,
            customer: 'Arvin Darci',
            status: 'DELIVERED'
        },
        {
            id: '1006-1',
            productCode: 'bib36pfvm',
            date: '2020-01-14',
            amount: 64,
            quantity: 2,
            customer: 'Izzy Jones',
            status: 'PENDING'
        }
    ]
},
{
    id: '1007',
    code: 'mbvjkgip5',
    name: 'Galaxy Earrings',
    description: 'Product Description',
    image: 'galaxy-earrings.jpg',
    price: 34,
    category: 'Accessories',
    quantity: 23,
    inventoryStatus: 'INSTOCK',
    rating: 5,
    orders: [
        {
            id: '1007-0',
            productCode: 'mbvjkgip5',
            date: '2020-06-19',
            amount: 34,
            quantity: 1,
            customer: 'Jennifer Smith',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1008',
    code: 'vbb124btr',
    name: 'Game Controller',
    description: 'Product Description',
    image: 'game-controller.jpg',
    price: 99,
    category: 'Electronics',
    quantity: 2,
    inventoryStatus: 'LOWSTOCK',
    rating: 4,
    orders: [
        {
            id: '1008-0',
            productCode: 'vbb124btr',
            date: '2020-01-05',
            amount: 99,
            quantity: 1,
            customer: 'Jeanfrancois David',
            status: 'DELIVERED'
        },
        {
            id: '1008-1',
            productCode: 'vbb124btr',
            date: '2020-01-19',
            amount: 198,
            quantity: 2,
            customer: 'Ivar Greenwood',
            status: 'RETURNED'
        }
    ]
},
{
    id: '1009',
    code: 'cm230f032',
    name: 'Gaming Set',
    description: 'Product Description',
    image: 'gaming-set.jpg',
    price: 299,
    category: 'Electronics',
    quantity: 63,
    inventoryStatus: 'INSTOCK',
    rating: 3,
    orders: [
        {
            id: '1009-0',
            productCode: 'cm230f032',
            date: '2020-06-24',
            amount: 299,
            quantity: 1,
            customer: 'Kadeem Mujtaba',
            status: 'PENDING'
        },
        {
            id: '1009-1',
            productCode: 'cm230f032',
            date: '2020-05-11',
            amount: 299,
            quantity: 1,
            customer: 'Ashley Wickens',
            status: 'DELIVERED'
        },
        {
            id: '1009-2',
            productCode: 'cm230f032',
            date: '2019-02-07',
            amount: 299,
            quantity: 1,
            customer: 'Julie Johnson',
            status: 'DELIVERED'
        },
        {
            id: '1009-3',
            productCode: 'cm230f032',
            date: '2020-04-26',
            amount: 299,
            quantity: 1,
            customer: 'Tony Costa',
            status: 'CANCELLED'
        }
    ]
},
{
    id: '1010',
    code: 'plb34234v',
    name: 'Gold Phone Case',
    description: 'Product Description',
    image: 'gold-phone-case.jpg',
    price: 24,
    category: 'Accessories',
    quantity: 0,
    inventoryStatus: 'OUTOFSTOCK',
    rating: 4,
    orders: [
        {
            id: '1010-0',
            productCode: 'plb34234v',
            date: '2020-02-04',
            amount: 24,
            quantity: 1,
            customer: 'James Butt',
            status: 'DELIVERED'
        },
        {
            id: '1010-1',
            productCode: 'plb34234v',
            date: '2020-05-05',
            amount: 48,
            quantity: 2,
            customer: 'Josephine Darakjy',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1011',
    code: '4920nnc2d',
    name: 'Green Earbuds',
    description: 'Product Description',
    image: 'green-earbuds.jpg',
    price: 89,
    category: 'Electronics',
    quantity: 23,
    inventoryStatus: 'INSTOCK',
    rating: 4,
    orders: [
        {
            id: '1011-0',
            productCode: '4920nnc2d',
            date: '2020-06-01',
            amount: 89,
            quantity: 1,
            customer: 'Art Venere',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1012',
    code: '250vm23cc',
    name: 'Green T-Shirt',
    description: 'Product Description',
    image: 'green-t-shirt.jpg',
    price: 49,
    category: 'Clothing',
    quantity: 74,
    inventoryStatus: 'INSTOCK',
    rating: 5,
    orders: [
        {
            id: '1012-0',
            productCode: '250vm23cc',
            date: '2020-02-05',
            amount: 49,
            quantity: 1,
            customer: 'Lenna Paprocki',
            status: 'DELIVERED'
        },
        {
            id: '1012-1',
            productCode: '250vm23cc',
            date: '2020-02-15',
            amount: 49,
            quantity: 1,
            customer: 'Donette Foller',
            status: 'PENDING'
        }
    ]
},
{
    id: '1013',
    code: 'fldsmn31b',
    name: 'Grey T-Shirt',
    description: 'Product Description',
    image: 'grey-t-shirt.jpg',
    price: 48,
    category: 'Clothing',
    quantity: 0,
    inventoryStatus: 'OUTOFSTOCK',
    rating: 3,
    orders: [
        {
            id: '1013-0',
            productCode: 'fldsmn31b',
            date: '2020-04-01',
            amount: 48,
            quantity: 1,
            customer: 'Simona Morasca',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1014',
    code: 'waas1x2as',
    name: 'Headphones',
    description: 'Product Description',
    image: 'headphones.jpg',
    price: 175,
    category: 'Electronics',
    quantity: 8,
    inventoryStatus: 'LOWSTOCK',
    rating: 5,
    orders: [
        {
            id: '1014-0',
            productCode: 'waas1x2as',
            date: '2020-05-15',
            amount: 175,
            quantity: 1,
            customer: 'Lenna Paprocki',
            status: 'DELIVERED'
        },
        {
            id: '1014-1',
            productCode: 'waas1x2as',
            date: '2020-01-02',
            amount: 175,
            quantity: 1,
            customer: 'Donette Foller',
            status: 'CANCELLED'
        }
    ]
},
{
    id: '1015',
    code: 'vb34btbg5',
    name: 'Light Green T-Shirt',
    description: 'Product Description',
    image: 'light-green-t-shirt.jpg',
    price: 49,
    category: 'Clothing',
    quantity: 34,
    inventoryStatus: 'INSTOCK',
    rating: 4,
    orders: [
        {
            id: '1015-0',
            productCode: 'vb34btbg5',
            date: '2020-07-02',
            amount: 98,
            quantity: 2,
            customer: 'Mitsue Tollner',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1016',
    code: 'k8l6j58jl',
    name: 'Lime Band',
    description: 'Product Description',
    image: 'lime-band.jpg',
    price: 79,
    category: 'Fitness',
    quantity: 12,
    inventoryStatus: 'INSTOCK',
    rating: 3,
    orders: []
},
{
    id: '1017',
    code: 'v435nn85n',
    name: 'Mini Speakers',
    description: 'Product Description',
    image: 'mini-speakers.jpg',
    price: 85,
    category: 'Clothing',
    quantity: 42,
    inventoryStatus: 'INSTOCK',
    rating: 4,
    orders: [
        {
            id: '1017-0',
            productCode: 'v435nn85n',
            date: '2020-07-12',
            amount: 85,
            quantity: 1,
            customer: 'Minna Amigon',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1018',
    code: '09zx9c0zc',
    name: 'Painted Phone Case',
    description: 'Product Description',
    image: 'painted-phone-case.jpg',
    price: 56,
    category: 'Accessories',
    quantity: 41,
    inventoryStatus: 'INSTOCK',
    rating: 5,
    orders: [
        {
            id: '1018-0',
            productCode: '09zx9c0zc',
            date: '2020-07-01',
            amount: 56,
            quantity: 1,
            customer: 'Abel Maclead',
            status: 'DELIVERED'
        },
        {
            id: '1018-1',
            productCode: '09zx9c0zc',
            date: '2020-05-02',
            amount: 56,
            quantity: 1,
            customer: 'Minna Amigon',
            status: 'RETURNED'
        }
    ]
},
{
    id: '1019',
    code: 'mnb5mb2m5',
    name: 'Pink Band',
    description: 'Product Description',
    image: 'pink-band.jpg',
    price: 79,
    category: 'Fitness',
    quantity: 63,
    inventoryStatus: 'INSTOCK',
    rating: 4,
    orders: []
},
{
    id: '1020',
    code: 'r23fwf2w3',
    name: 'Pink Purse',
    description: 'Product Description',
    image: 'pink-purse.jpg',
    price: 110,
    category: 'Accessories',
    quantity: 0,
    inventoryStatus: 'OUTOFSTOCK',
    rating: 4,
    orders: [
        {
            id: '1020-0',
            productCode: 'r23fwf2w3',
            date: '2020-05-29',
            amount: 110,
            quantity: 1,
            customer: 'Kiley Caldarera',
            status: 'DELIVERED'
        },
        {
            id: '1020-1',
            productCode: 'r23fwf2w3',
            date: '2020-02-11',
            amount: 220,
            quantity: 2,
            customer: 'Graciela Ruta',
            status: 'DELIVERED'
        }
    ]
},
{
    id: '1021',
    code: 'pxpzczo23',
    name: 'Purple Band',
    description: 'Product Description',
    image: 'purple-band.jpg',
    price: 79,
    category: 'Fitness',
    quantity: 6,
    inventoryStatus: 'LOWSTOCK',
    rating: 3,
    orders: [
        {
            id: '1021-0',
            productCode: 'pxpzczo23',
            date: '2020-02-02',
            amount: 79,
            quantity: 1,
            customer: 'Cammy Albares',
            status: 'DELIVERED'
        }
      ]}
];

app.use("/api/donors/",require("./routs/donors"))
app.use("/api/users",require("./routs/users"))
// Helper to find a product by ID
const findProductById = (id) => products.find((product) => product.id === id);

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get one product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = findProductById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// Add a new product
app.post('/api/products', (req, res) => {
    console.log(req.body)
  const {
    id,
    name,
    price,
    quantity,
    image,
    giver,
  } = req.body;

  if (!id || !name || price === undefined || !quantity) {
    return res.status(400).json({ message: 'ID, name, price, and quantity are required' });
  }

  const newProduct = {
    id,
    
    name,
    
    price,
    quantity: quantity || 0,
    
   
    image: image || '',
   
    giver: giver || '',
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product by ID
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const {
    code,
    name,
    description,
    price,
    quantity,
    inventoryStatus,
    category,
    image,
    rating,
    giver,
  } = req.body;

  const product = findProductById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Update product fields if provided
  if (code !== undefined) product.code = code;
  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (quantity !== undefined) product.quantity = quantity;
  if (inventoryStatus !== undefined) product.inventoryStatus = inventoryStatus;
  if (category !== undefined) product.category = category;
  if (image !== undefined) product.image = image;
  if (rating !== undefined) product.rating = rating;
  if (giver !== undefined) product.giver = giver;

  res.json(product);
});

// Delete a product by ID
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex((product) => product.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(productIndex, 1);
  res.status(204).send();
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});