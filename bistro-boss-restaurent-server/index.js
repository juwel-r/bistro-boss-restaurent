const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.PASSWORD}@cluster0.hjkzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const users = client.db("bistro-boss").collection("users");

    //==========JWT==========\\
    app.post("/jwt", (req, res) => {
      const data = req.body;
      const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //=====================API========================\\

    //=============Menu section============\\
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

    //============User Data section=========\\
    app.post("/user", async (req, res) => {
      const user = req.body;
      const email = req.query?.email;
      const query = { email: email };
      const isExisting = await users.findOne(query);
      if (isExisting) {
        return res.send({ message: "old user logged in", insertedId: null });
      }
      const result = await users.insertOne(user);
      res.send(result);
    });

    app.get("/user", async (req, res) => {
      const result = await users.find().toArray();
      res.send(result);
    });

    //make admin
    app.patch("/user/:id", async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const updateDoc = {
        $set: {
          roll: "admin",
        },
      };
      const result = await users.updateOne(filter, updateDoc);
      res.send(result);
    });

    //delete user
    app.delete("/user/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await users.deleteOne(query);
      res.send(result);
    });

    //============Add to cart section==========\\
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

//last module watched 68-6 >> 5 minute
// nodemon index.js
