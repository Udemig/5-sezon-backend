type ExtendedError = Error & { status: number };

// aldığı parametrele göre hata mw'ne gönderilmek üzere bir error nesnesi oluşturur
const error = (status: number, message: string): ExtendedError => {
  // bir error nesnesi oluştur
  const err = new Error(message) as ExtendedError;

  // hata nesnesine status bilgisini ekle
  err.status = status;

  // hata nesnesini döndür
  return err;
};

export default error;
