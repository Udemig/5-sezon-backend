import {
  FaCode,
  FaPaintBrush,
  FaBullhorn,
  FaPenFancy,
  FaVideo,
  FaRobot,
  FaMusic,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";
import { ICategory, IInfo } from "../types";

export const categories: ICategory[] = [
  { name: "Programlama ve Teknoloji", icon: <FaCode /> },
  { name: "Grafik ve Tasarım", icon: <FaPaintBrush /> },
  { name: "Dijital Pazarlama", icon: <FaBullhorn /> },
  { name: "Yazma ve Çeviri", icon: <FaPenFancy /> },
  { name: "Video ve Animasyon", icon: <FaVideo /> },
  { name: "Yapay Zeka Hizmetleri", icon: <FaRobot /> },
  { name: "Müzik ve Ses", icon: <FaMusic /> },
  { name: "İş", icon: <FaBriefcase /> },
  { name: "Danışmanlık", icon: <FaUserTie /> },
];

export const items: IInfo[] = [
  {
    title: "Uzman işe alım danışmanları",
    text: "Doğru yeteneği bulmanız ve projenizin her ihtiyacını karşılamanız için bir hesap yöneticisine güvenin.",
  },
  {
    title: "Memnuniyet garantisi",
    text: "Eksik teslimatlar için garantili iade ile güvenle sipariş verin.",
  },
  {
    title: "Gelişmiş yönetim araçları",
    text: "Serbest çalışanları ekibinize ve projelerinize sorunsuz bir şekilde entegre edin.",
  },
  {
    title: "Esnek ödeme modelleri",
    text: "Proje başına ödeme yapın veya daha uzun süreli işbirlikleri için saatlik ücret seçeneklerini tercih edin.",
  },
];

export const inputs = [
  { label: "Başlık", name: "title", isReq: true },

  { label: "Kapak Fotoğrafı", name: "cover", isReq: true, type: "file" },

  {
    label: "Fotoğraflar",
    name: "images",
    type: "file",
    isReq: true,
    isMulti: true,
  },
  {
    label: "Revizyon Hakkı",
    name: "revisionNumber",
    type: "number",
    isReq: true,
    min: 1,
  },

  {
    label: "Özellikler (',' ile ayırınız)",
    name: "features",
    type: "textarea",
  },
  { label: "Açıklama", name: "desc", isReq: true, type: "textarea" },
  { label: "Yan Açıklama", name: "shortDesc", isReq: true },
  { label: "Yan Başlık", name: "shortTitle", isReq: true },

  {
    label: "Teslimat Süresi (gün)",
    name: "deliveryTime",
    type: "number",
    isReq: true,
    min: 1,
    max: 90,
  },
  {
    label: "Fiyat ($)",
    name: "price",
    type: "number",
    isReq: true,
    min: 1,
  },
];
