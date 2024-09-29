const fs = require("fs");

// parametre olarak gelen araç verileirni json dosyasına yazar

module.exports = (cars) => {
  fs.writeFile(
    `${__dirname}/../data/cars.json`,
    JSON.stringify(cars),
    (err) => {
      if (err) {
        console.log("Dosyayı güncellerken bir hata oluştu", err);
      }
      return;
    }
  );
};
