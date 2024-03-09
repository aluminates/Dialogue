const mongoose = require('mongoose');
// require('dotenv').config();

mongoose.connect(
  `mongodb+srv://Riya:Riya2002@cluster0.7jq2ytu.mongodb.net/chatAppMern?retryWrites=true&w=majority`,
  (err) => {
   if(err) console.log(err) 
   else console.log("MongoDB connection established!");
  }
);



// mongosh "mongodb+srv://cluster0.7jq2ytu.mongodb.net/myFirstDatabase" --apiVersion 1 --username Riya

// mongosh `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.7jq2ytu.mongodb.net/chatAppMern?retryWrites=true&w=majority" --apiVersion 1 --username Riya`

// mongosh `mongodb+srv://Riya:Riya2002@cluster0.7jq2ytu.mongodb.net/chatAppMern?retryWrites=true&w=majority" --apiVersion 1 --username Riya`

