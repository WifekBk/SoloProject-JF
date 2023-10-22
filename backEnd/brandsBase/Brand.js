const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const brandsSchema = new mongoose.Schema({
        name: String,
      imageUrl: String,
    });

    const Brands = mongoose.model("Brands", brandsSchema);

    module.exports = Brands;