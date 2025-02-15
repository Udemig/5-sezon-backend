# Base image olarak Node.js kullan
FROM node:18-alpine

# Çalışma dizinini belirle
WORKDIR /app

# Paketleri yüklemek için package.json ve package-lock.json kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install --omit=dev

# Uygulama kodlarını kopyala
COPY . .

# Servisi çalıştıracağımız portu belirt
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
