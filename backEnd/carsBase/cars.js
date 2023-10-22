const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const carsSchema = new mongoose.Schema(
    {
        name: String,
      engine: String,
      imageUrl: String,
      horsePower: Number,
      categories: String,
      }
    
    )

    const Cars = mongoose.model("Cars", carsSchema);

    module.exports = Cars;