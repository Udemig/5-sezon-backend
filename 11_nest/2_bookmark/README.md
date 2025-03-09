# API Endpoints

-- AuthEndpoints
--- POST /auth/signup   >  yeni kullanıcı oluştur
--- POST /auth/login    >  kullanıcı girişi
--- POST /auth/logout   >  kullanıcı çıkışı
--- POST /auth/refresh  >  token yenileme

-- UserEndpoints  (JWT kontrolü gerekli)
--- GET  /user/profile  >  kullanıcı profili
--- PUT  /user/update   >  kullanıcı bilgilerini güncelle

-- BookmarkEndpoints  (JWT kontrolü gerekli)
--- GET  /bookmarks        >  bookmark listesi
--- GET  /bookmarks/:id    >  bookmark detayı
--- POST /bookmarks        >  bookmark oluştur
--- PUT  /bookmarks/:id    >  bookmark güncelle
--- DELETE /bookmarks/:id  >  bookmark sil

