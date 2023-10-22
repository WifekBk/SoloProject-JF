const mongoose = require('mongoose');
const mongoUri = 'mongodb://127.0.0.1/carsMagasin';
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{console.log("db mongo connected")})
.catch(err=>console.log(err));
const dbB = mongoose.connection;
const Brands = require('./Brand');

const getAllBrands = () =>{
    return Brands.find()
}

const addBrands = async (name, imageUrl) => {
    if (!name || !imageUrl) {
        return Promise.reject('Data empty.');
      }
      const existingBrand = await Brands.findOne({name});
      if (existingBrand) {
        return Promise.reject('Brand with the same name already exists.');
      }
      const newBrand = new Brands({name, imageUrl});
      return await newBrand.save();
  };

  const deleteBrand = async (brandId) => {
    try {
      const validBrandId = new mongoose.Types.ObjectId(brandId);
      const deletedBrand = await Brands.findByIdAndRemove(validBrandId);

    } catch (error) {
      console.log(error);
    }
  };

  const updateBrand = async (brandId, name, imageUrl) => {
    const existingBrand = await Brands.findById(brandId);
   
    if(name){
      existingBrand.name = name
    }
    if(imageUrl){
      existingBrand.imageUrl = imageUrl
    }
    return await existingBrand.save();
  };

    module.exports = {
        dbB,
        getAllBrands,
        addBrands,
        deleteBrand,
        updateBrand
    }