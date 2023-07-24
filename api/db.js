const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("DB Connected Successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });

  const fetched_data = await mongoose.connection.db.collection("food-items");
  // console.log(fetched_data);
  fetched_data.find({}).toArray(async function (err, data) {
    const foodCategory = await mongoose.connection.db.collection("categories");
    foodCategory.find({}).toArray(function (err, catData) {
      if (err) return console.log(err);
      else {
        global.food_items = data;
        global.foodCategory = catData;
      }
    });
    // if (err) return console.log(err);
    // else {
    //   global.food_items = data;
    // }
  });
};

mongoDB();

module.exports = mongoDB;

// Make a .env file and paste following code if you want.
// Or make your own database.
// PORT=5000
// MONGO_URI=mongodb://shantanoo:shntn00r0hn1209@ac-a78qnen-shard-00-00.tqracre.mongodb.net:27017,ac-a78qnen-shard-00-01.tqracre.mongodb.net:27017,ac-a78qnen-shard-00-02.tqracre.mongodb.net:27017/foodappmern?ssl=true&replicaSet=atlas-k3tspt-shard-0&authSource=admin&retryWrites=true&w=majority

// MONGO_URI=mongodb+srv://shantanoo:shntn00r0hn1209@cluster0.tqracre.mongodb.net/foodappmern
// JWT_TOKEN="ThisWillBeMyThirtyTwoBitSecret"
