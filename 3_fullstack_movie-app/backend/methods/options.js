const optionsRequest = (req, res) => {
  /*
   * frontend'den bir post/put/patch/delete isteği atıldığı zaman tarayıcı öncelikle server'ın bu sitek tiplerini kabul ettiğini kontrol etmek amacıyla OPTIONS http methoduyla istek atıyor. 
  
   * Eğer OPTIONS istğeine cevap göndermezsek yukarıdaki istek türlerini API'ın kabul etmedeği zannediyor ve asıl isteği hiç bir zaman atmıyor.

   * OPTIONS iteği gelince doğru header'lar cevap gönderirsek options'In arkasından asıl isteği atıyor
    */

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.end();
};

module.exports = optionsRequest;
