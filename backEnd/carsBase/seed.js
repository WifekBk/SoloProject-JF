const { dbC } = require("./index.js");
const Cars = require("./cars.js");

const carsData = require("../../cars.json");

const insertCars = function () {
  Cars.create(carsData)
    .then(() => {
      console.log("Database seeded successfully");
    })
    .catch((error) => {
      console.log("error seeding the database: ", error);
    })
    .finally(() => {
      dbC.close();
    });
};

insertCars();