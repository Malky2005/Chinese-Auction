const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://localhost:8000',
    'http://localhost:4200',
    
]

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200
// }
const corsOptions = {
  origin: 'http://localhost:4200', // Allow requests from Angular front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type'], // Allow headers
};

module.exports = corsOptions 