# Node.js 18 sürümünü temel alalım
FROM node:18-alpine

# Çalışma dizinini ayarlayalım
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayalım
COPY package*.json ./

# Bağımlılıkları yükleyelim
RUN npm install

# Projenin geri kalanını kopyalayalım
COPY . .

# Uygulamanın çalışacağı portu belirtelim
EXPOSE 4004

# Uygulamayı başlatalım
CMD ["npm", "start"] 