//last module watched 68-6 >> 5 minute
// nodemon index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
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
    const payment = client.db("bistro-boss").collection("payment");
    const users = client.db("bistro-boss").collection("users");

    //jwt token verify
    const verifyToken = (req, res, next) => {
      const token = req.headers.authorization.split(" ")[1]; //to split Bearer from token which was sent from frontend
      if (!token) return res.status(401).send({ message: "Access Forbidden" });
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) return res.status(401).send({ message: "Access Forbidden" });
        req.decode = decode;
        next();
      });
    };

    //isAdmin verify
    const verifyAdmin = async (req, res, next) => {
      const email = req.decode.email;
      const query = { email: email };
      const user = await users.findOne(query);
      const isAdmin = user?.roll === "admin";
      if (!isAdmin)
        return res.status(403).send({ message: "Unauthorize Access" });
      next();
    };

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

    app.get("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id }; //no ObjectId on mongodb DB
      const result = await menu.findOne(query);
      res.send(result);
      console.log(id);
    });

    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      const menuData = req.body;
      const result = await menu.insertOne(menuData);
      res.send(result);
    });

    app.patch("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const filter = { _id: req.params.id }; //no ObjectId on mongodb DB
      const updatedDoc = {
        $set: {
          name: item.name,
          category: item.category,
          recipe: item.recipe,
          image: item.image,
          price: item.price,
        },
      };
      const result = await menu.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.delete("/menu/:id", verifyToken, verifyAdmin, async (req, res) => {
      const result = await menu.deleteOne({ _id: req.params.id });
      res.send(result);
    });

    //====================User Data section===============\\
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

    app.get("/user", verifyToken, verifyAdmin, async (req, res) => {
      const result = await users.find().toArray();
      res.send(result);
    });

    //make admin
    app.patch("/user/:id", verifyToken, verifyAdmin, async (req, res) => {
      const filter = { _id: new ObjectId(req.params.id) };
      const updateDoc = {
        $set: {
          roll: "admin",
        },
      };
      const result = await users.updateOne(filter, updateDoc);
      res.send(result);
    });

    //isAdmin check
    app.get("/user/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (!req.decode.email === email) {
        return res.status(403).send({ message: "Unauthorize Access" });
      }
      const query = { email: email };
      const user = await users.findOne(query);
      if (user?.roll === "admin") {
        res.send({ admin: true });
      }
    });

    //delete user
    app.delete("/user/:id", verifyToken, verifyAdmin, async (req, res) => {
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

    //================ Payment Api===================>>
    app.post("/payment", async (req, res) => {
      const payment = res.body;
      const paymentResult = await payment.insertOne(payment);

      //delete cart from cart listen
      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };
      const deleteResult = await carts.deleteMany(query);
      res.send({ paymentResult, deleteResult });
    });

    //================ get reviews===================>>
    app.get("/reviews", async (req, res) => {
      const result = await reviews.find().toArray();
      res.send(result);
    });

    //==============Stripe=================>>
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      if (price) {
        const amount = parseInt(price * 100);
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      }
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

/**
USER_ID=juwelr6
PASSWORD=Vc91InJqJOqmWWvv
ACCESS_TOKEN_SECRET=b86a75c940e8b367fd7c610cb3348ac56a0a3c25f6d80fea3bed898468f5d1c8b09d08038b9fe40587a39688c13a59200f979676760927a91b5b2401aa015842  
 */
