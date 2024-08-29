const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://maksagor:vkewBenVx75Glpj4@cluster0.kvw3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Specify the database and collection you want to use
    const database = client.db('inventory_management');
    const productCollection = database.collection('productCollection');

    //Insert a products document
  //   const products = [
  //     { image: 'https://i.ibb.co/p061QFy/1.jpg', name: 'Potato Chips', unitPrice: 10, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/HDSxFm1/2.jpg', name: 'Corn Chips', unitPrice: 20, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/QrvhyVQ/3.jpg', name: 'Pita Chips', unitPrice: 30, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/p061QFy/1.jpg', name: 'Vegetable Chips', unitPrice: 40, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/HDSxFm1/2.jpg', name: 'Kettle Chips', unitPrice: 50, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/QrvhyVQ/3.jpg', name: 'Banana Chips', unitPrice: 60, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/p061QFy/1.jpg', name: 'Plantain Chips', unitPrice: 70, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/HDSxFm1/2.jpg', name: 'Cassava Chips', unitPrice: 80, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/QrvhyVQ/3.jpg', name: 'Sweet Potato Chips', unitPrice: 90, weight: ['100g', '250g', '500g', '1kg'] },
  //     { image: 'https://i.ibb.co/p061QFy/1.jpg', name: 'Tortilla Chips', unitPrice: 100, weight: ['100g', '250g', '500g', '1kg'] }
  // ];
  //   const result = await productCollection.insertMany(products);
  //   console.log(`A document was inserted with the _id: ${result.insertedCount}`);  
    
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/products', async (req, res) => {
  try {
      await client.connect();
      const database = client.db('inventory_management');
      const collection = database.collection('productCollection');
      const data = await collection.find({}).toArray();
      res.json(data);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
  } finally {
      await client.close();
  }
});


app.get('/', (req, res) => {
  res.send('Inventory Management server is running...');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});