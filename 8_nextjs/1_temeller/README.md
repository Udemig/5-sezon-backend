# Routing

- Next.js'de güncel sürümlerde önerilen ve tercih edilem routing yöntemi `App Router`'dır. Ama eski sürümde yazılan projelerde `Pages Router`'la karşılaştırınız.

# App Router

- React projelerinde react-router-dom kütüphanesiyle yaptığımız sayfalamayı next.js'de next'in kendine has yöntemiyle yaparız.
- Dosya dizinine göre / klasör tabanlı sayfalama vardır.
- Bütün sayfalar src/app klasörü içerinde tanımlanır
- App içerisinde tanımlanan ve içinde page.jsx dosyası olan bütün klasörler bir sayfaya denk gelir.
- Her page dosyasında bir reeact component'ı export edilmeli.
- Url'deki route'un ismi klasörün ismine göret tanımlanır
