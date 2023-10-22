const express = require('express');
const cors =require('cors');
const port = 8000;
const app = express();
const dbB = require('./brandsBase')
const dbC = require('./carsBase');



const{getAllBrands,addBrands,updateBrand,deleteBrand} = require('./brandsBase/index');
const {getAllCars,addCars,updateCar,deleteCar} = require('./carsBase/index')


app.use(express.json());
app.use(cors());

app.get('/api/cars', async (req, res) => {
    try{
        const cars = await getAllCars()
        res.status(200).json(cars)
    }
    catch(err){
        console.log(err)
    }
})

app.get('/api/brands', async (req, res) => {
    try{
        const brands = await getAllBrands()
        res.status(200).json(brands)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/api/addBrands', async(req, res) => {
    const {name, imageUrl} = req.body

    try {
      const newBrand = await addBrands(name, imageUrl);
      res.status(201).json(newBrand)
    } 
    catch (err) {
        console.log(err)
    }
});



app.post('/api/addCars', async(req, res) => {
    const {name,engine,imageUrl,horsePower,categories} = req.body
    try {
      const newCar = await addCars(name,engine,imageUrl,horsePower,categories)
      res.status(201).json(newCar)
    } 
    catch (err) {
      console.log(err)
    }
});



app.delete('/api/deleteBrand/:brandId', async (req, res) => {
    const {brandId} = req.params
    try {
      await deleteBrand(brandId)
      res.status(204).end()
    } 
    catch (err) {
      console.log(err)
    }
  });


  app.delete('/api/deleteCar/:carId', async (req, res) => {
    const {carId} = req.params
    try {
      await deleteCar(carId)
      res.status(204).end()
    } 
    catch (err) {
      console.log(err)   
    }
  });


app.put('/api/updateBrand/:brandId', async (req, res) => {
    const {brandId} = req.params
    const {name, imageUrl} = req.body
    try {
      const updatedBrand = await updateBrand(brandId, name, imageUrl)
      res.status(200).json(updatedBrand)
    } 
    catch (err) {
      console.log(err)
    }
});

app.put('/api/updateCar/:carId', async (req, res) => {
  const {carId} = req.params
  const {name, engine, imageUrl, horsePower, categories} = req.body
  try {
    const updatedCar = await updateCar(carId, name, engine, imageUrl, horsePower, categories)
    res.status(200).json(updatedCar)
  } 
  catch (err) {
    console.log(err)
  }
});

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
    })