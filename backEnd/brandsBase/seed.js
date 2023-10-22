const { dbB } = require("./index.js");
const Brands = require("./Brand.js");

const brandsData = require("../../brands.json");

const insertBrands = function () {
  Brands.create(brandsData)
    .then(() => {
      console.log("Database seeded successfully");
    })
    .catch((error) => {
      console.log("error seeding the database: ", error);
    })
    .finally(() => {
      dbB.close();
    });
};

insertBrands();