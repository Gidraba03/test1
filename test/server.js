const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://ogiba03:dulesavic123@cluster0.uxy33xy.mongodb.net/?retryWrites=true&w=majority";

// Povezivanje sa bazom podataka
const client = new MongoClient(uri);

// Uspostavljanje konekcije sa bazom podataka
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();

// Ruta za dodavanje podataka
app.post("/api/data", async (req, res) => {
  try {
    const collection = client.db("customers").collection("customers");

    const newData = {
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
    };

    await collection.insertOne(newData);

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Ruta za dobavljanje podataka
app.get("/api/data", async (req, res) => {
  try {
    const collection = client.db("customers").collection("customers");

    const data = await collection.find().toArray();

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Ruta za brisanje podataka
app.delete("/api/data/:id", async (req, res) => {
    try {
      const collection = client.db("customers").collection("customers");
  
      const { id } = req.params;
  
      await collection.deleteOne({ id: id }); // Izmenjeno polje za pretragu
  
      res.json({ message: "Data deleted successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
