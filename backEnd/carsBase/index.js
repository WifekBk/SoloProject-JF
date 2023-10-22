const mongoose = require('mongoose');
const mongoUri = 'mongodb://127.0.0.1/carsMagasin';
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true }).then(()=>{console.log("db mongo connected")}).catch(err=>console.log(err));
const dbC = mongoose.connection;
const Cars = require('./cars');

const getAllCars = () =>{
    return Cars.find()
}

const addCars = async (name,engine,imageUrl,horsePower,categories) => {
    if (!name || !engine || !imageUrl || !horsePower || !categories) {
        return Promise.reject('Data empty.');
      }
      const existingCars = await Cars.findOne({name});
    
      if (existingCars) {
        return Promise.reject('Car with the same name already exists.');
      }
    const newCar = new Cars({name,engine,imageUrl,horsePower,categories});
    return await newCar.save();
  };



  const deleteCar = async (cardId) => {
    try {
      const validCarId = new mongoose.Types.ObjectId(cardId);
      const deletedCar = await Cars.findByIdAndRemove(validCarId);
    } catch (error) {
      console.log(error);
    }
  };


  const updateCar = async (carId, name,engine,imageUrl,horsePower,categories) => {
    const existingCar = await Cars.findById(carId);
    if(name){
      existingCar.name = name
    }
    if(engine){
      existingCar.engine = engine
    }
    if(imageUrl){
      existingCar.imageUrl = imageUrl
    }
    if(horsePower){
      existingCar.horsePower = horsePower
    }
    if(categories){
      existingCar.categories = categories
    }
    return await existingCar.save();
  };
  

    module.exports = {
        dbC,
        getAllCars,
        addCars,
        deleteCar,
        updateCar
    }