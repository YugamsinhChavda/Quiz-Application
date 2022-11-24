const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db connected");
});

connection.on("error", (err) => {
  console.log("Mongo Db connection failed");
});

module.exports = connection;
