// sıralama , filtreleme , alan limitleme , sayfalama gibi özellikleri projede birden fazla noktada kullanmak isteyebiliriz bu durumda kod tekrarınına düşmememek için bütün bu methodları bir class içeerisinde tanımlayalım

class APIFeatures {
  constructor(query, params, formattedParams) {
    this.query = query; // oluşturulan veritabanı sorgusu
    this.params = params; // api isteğinden gelen saf paramtreler
    this.formattedParams = formattedParams; // mw'dan gelen formatlanmış parametreler
  }

  filter() {
    this.query = this.query.find(this.formattedParams);

    return this;
  }

  sort() {
    // eğer sort parametresi varsa sırala
    if (this.params.sort) {
      this.query.sort(this.params.sort.split(",").join(" "));
    } else {
      this.query.sort("-createdAt");
    }

    return this;
  }

  limit() {
    // eğer limit parametresi varsa alan limitle
    if (this.params.fields) {
      this.query.select(this.params.fields.replaceAll(",", " "));
    }

    return this;
  }

  pagination() {
    // sayfalamaya yap
    const page = Number(this.params.page) || 1; // mevcut sayfa sayısı
    const limitCount = Number(this.params.limit) || 10; // sayfa başına eleman sayısı
    const skipCount = (page - 1) * limitCount; // mevcut sayfadaki için kaç eleman atlanmalı

    this.query.skip(skipCount).limit(limitCount);

    return this;
  }
}

module.exports = APIFeatures;
