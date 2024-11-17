//* Asenkron fonksiyonlarda hatayı yaklayan bir fonk yazalım
//* Çalıştımak istediğimiz fonksiyonu parametre olarak alıcak
//* try-catch kod bloğunda bu fonksiyonu çalıştırcak
//* hata oluşursa hata mw'ine yönlendiricek

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
