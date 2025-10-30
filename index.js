const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;
const uri =
  "mongodb+srv://simpleDBuser:yvY4DuAZCTTyOp7g@basic-project.hymtgk.mongodb.net/?appName=basic-project";
// const uri = "mongodb://localhost:27017";

//middleware
app.use(cors());
app.use(express.json());
// yvY4DuAZCTTyOp7g
//create clint
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.get("/", (req, res) => {
  res.send("Simple crud is running");
});

async function run() {
  try {
    await client.connect();
      const userDB = client.db('userDB');
      const userCollection = userDB.collection('userCollection');
      //add all routes for db;
      
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);

    });
    
    app.delete('/users/:id',async (req,res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query)
      res.send(result)
      
    })
    app.get('/users/:id',async (req,res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query)
      res.send(result)
      
    })
    

      app.post('/users',async (req, res) => {
          const newUser = req.body;
          const result = await userCollection.insertOne(newUser);
          res.send({ insertedId : result.insertedId});
          
      })

    //add all routes for db;
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    //nothing to do
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`port is running ${port}`);
});
