const sendData = async (req, res) => {
  try {
    res.status(200).send([global.food_items, global.foodCategory]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = sendData;
