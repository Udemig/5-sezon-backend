module.exports = (req, res, next) => {
  //* urlden gelen parametre > { duration: { lt: '14' }, price: { gte: '497' } }
  //* mongodbnin istediği format > { duration: { $lt: '14' }, price: { $gte: '497' } }

  //1) istek ile gelen parametreler eriş
  let queryObj = { ...req.query };

  //2) filtreleme tabi tutulmayacak olan parametreleri (sort,fields,page,limit) query nesnesinden kaldır
  const fields = ["sort", "limit", "page", "fields"];
  fields.forEach((el) => delete queryObj[el]);

  //3) replace methodunu kullanabilmek için nesneyi stringe çevir
  let queryStr = JSON.stringify(queryObj);

  //4) bütün operatörlerin başına $ koy
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|ne)\b/g,
    (found) => `$${found}`
  );

  //5) bu mw sonra çalışan methoda nesneyi aktar
  req.formattedQuery = JSON.parse(queryStr);

  //6) mw sonraki sonraki mehod çalışabilir
  next();
};
