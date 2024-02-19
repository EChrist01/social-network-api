const connection = require("../config/connection");
const { User, Thought } = require("../models");

// Function to delete a collection if it exists
async function deleteCollection(collectionName) {
  const collectionCheck = await connection.db
    .listCollections({ name: collectionName })
    .toArray();
  if (collectionCheck.length) {
    await connection.dropCollection(collectionName);
    console.log(`Collection '${collectionName}' deleted.`);
  }
}

// Function to seed users and thoughts
async function seedData() {
  // Delete collections if they exist
  await deleteCollection("users");
  await deleteCollection("thoughts");

  // Data to insert
  const users = [
    {
      username: "TestUser",
      email: "testuser@hotmail.com",
    },
  ];

  const thoughts = [
    {
      reactionBody: "Test reaction",
      username: "TestUser",
    },
  ];

  // Insert data
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
}

// Event listener for database errors
connection.on("error", (err) => err);

// Event listener for when the connection to the database is established
connection.once("open", async () => {
  console.log("connected");
  await seedData(); 
  process.exit(0); 
});