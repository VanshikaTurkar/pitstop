// require('dotenv').config(); // At the top of your file
// const mongoose = require('mongoose');

// const mongoURI = process.env.MONGODB_URI; // Get Mongo URI from .env file
// if (!mongoURI) {
//   console.error('MongoDB URI is missing!');
//   process.exit(1); // Exit if MongoDB URI is not defined
// }
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

const { MongoClient } = require("mongodb");
require('dotenv').config(); // populates all 'secrets' in everything we defined in .env file (how we access ports and other info)

// Module Imports
const express = require('express'); //define route thru express 
const mongoose = require('mongoose');
const cors = require('cors');

// Route Imports
const pitStopRouter = require('./Models/Routes/pitStopRoutes.js');
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;
// Replace the following with your Atlas connection string                                                                                                                                        
//const url = "mongodb+srv://vanshikaturkar:vturkar@base-cluster.lqlri.mongodb.net/Pitstops?retryWrites=true&w=majority";
// // Connect to your Atlas cluster
// const client = new MongoClient(url);
// async function run() {
//     try {
//         await client.connect();
//         console.log("Successfully connected to Atlas", );
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
// Connect to the MongoDB database
async function connectToDatabase() {
    mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
  }
  
  connectToDatabase();
  

// Start the Node Express server
const app = express(); //define app using express, defines handlers
app.use(cors());
app.use(express.json());

// Log all incoming requests
// app.use((req, res, next) => {
//   console.log('Incoming request:', req.method, req.path);
//   next();
// });
app.use('/create', pitStopRouter);

// API Routes
//app.use('/pitstop', pitStopRouter); 

// Test route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Your pitstop route
// app.post('/api/pitstops/createPitStop', (req, res) => {
//   console.log('Received pitstop data:', req.body);
//   res.json({ 
//     status: "success",
//     message: "PitStop received",
//     data: req.body 
//   });
// });

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Available routes:');
  console.log('- GET /');
  console.log('- POST /api/pitstops/createPitStop');
});
