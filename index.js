const express = require("express");
const app = express();
// const jwt = require("jsonwebtoken");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
// const verify = require("jsonwebtoken/verify");
require("dotenv").config();
const port = process.env.PORT || 5000;

// madelware
app.use(cors());
app.use(express.json());

// ObjectId,
// Collection,
// AqRLK3lUECwqegsM;
// creative - agency;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2xwyd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log("db connect");
const run = async () => {
  try {
    await client.connect();

    //   awesome Collection
    const asesomeServiceCollection = client
      .db("creative_agency")
      .collection("asesome_service");

    // our work callaction
    const ourWorkCollaction = client
      .db("creative_agency")
      .collection("our_works");

    // testmonial collaction
    const testmonialCollaction = client
      .db("creative_agency")
      .collection("tastmonial");

    // get all asesomeServiceCollection
    app.get("/service", async (req, res) => {
      const result = await asesomeServiceCollection.find().toArray();
      res.send(result);
    });

    // get all our works collaction
    app.get("/works", async (req, res) => {
      const result = await ourWorkCollaction.find().toArray();
      res.send(result);
    });

    // get all our review
    app.get("/tastmonial", async (req, res) => {
      const result = await testmonialCollaction.find().toArray();
      res.send(result);
    });
  } finally {
    // await client.close()
  }
};

run(), console.dir();

app.get("/", (req, res) => {
  res.send("How are you?");
});

app.listen(port, () => {
  console.log(`creative agency server side runing ${port}`);
});
