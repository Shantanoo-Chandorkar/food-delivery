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
