const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://juwelr6:Vc91InJqJOqmWWvv@cluster0.hjkzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const menu = client.db("bistro-boss").collection("menu");
    const reviews = client.db("bistro-boss").collection("reviews");
    const carts = client.db("bistro-boss").collection("carts");

    //=====================API========================\\
    // get menu
    app.get("/menu", async (req, res) => {
      const result = await menu.find().toArray();
      res.send(result);
    });

    // get reviews
    app.get("/reviews", async (req, res) => {
      const result = await reviews.find().toArray();
      res.send(result);
    });

    //==============Add to cart section================\\
    app.post("/carts", async (req, res) => {
      const result = await carts.insertOne(req.body);
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { customerEmail: email };
      const result = await carts.find(query).toArray();
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carts.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// nodemon index.js
