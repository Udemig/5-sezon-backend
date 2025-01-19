import mongoose, { Schema } from "mongoose";

// ticket verisini typescript tipini tanımlama
export interface ITicket {
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
}

export interface ITicketData extends ITicket {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Ticket verisi için bir şema oluştur
const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String, //
      required: [true, "title alanı zorunludur"],
    },
    description: {
      type: String, //
      required: [true, "title alanı zorunludur"],
    },
    category: {
      type: String,
      enum: ["Yazılım Sorunu", "Donanım Sorunu", "Bağlantı Sorunu"],
      required: [true, "category alanı zorunludur"],
    },
    priority: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: [true, "priority alanı zorunludur"],
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      required: [true, "progress alanı zorunludur"],
    },
    status: {
      type: String,
      enum: ["Beklemede", "Devam Ediyor", "Çözüldü"],
      required: [true, "status alanı zorunludur"],
    },
  },
  { timestamps: true }
);

// Ticket verilerini yönetmek için bir model oluştur
// Eğerki daha önce oluşturulan bir ticket modeli varsa onu kullan yoksa yenisini oluştur
const Ticket =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;
