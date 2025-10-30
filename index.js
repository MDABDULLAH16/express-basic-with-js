const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;
const uri =
  "mongodb+srv://simpleDBuser:yvY4DuAZCTTyOp7g@basic-project.hymtgk.mongodb.net/?appName=basic-project";

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
