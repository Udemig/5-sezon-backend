import mongoose, { Schema } from "mongoose";

export interface ICar {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  color: string;
  mileage: number;
  fuelType: "Gas" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  drive: "fwd" | "rwd" | "awd" | "4fwd";
  type: string;
  description: string;
  capacity: number;
  gasoline?: number;
}

const carSchema = new Schema<ICar>({
  make: {
    type: String,
    required: [true, "make değeri zorunludur"],
  },
  model: {
    type: String,
    required: [true, "model değeri zorunludur"],
  },
  year: {
    type: Number,
    required: [true, "year değeri zorunludur"],
  },
  price: {
    type: Number,
    required: [true, "price değeri zorunludur"],
  },
  color: {
    type: String,
    required: [true, "color değeri zorunludur"],
  },
  mileage: {
    type: Number,
    required: [true, "mileage değeri zorunludur"],
  },
  fuelType: {
    type: String,
    required: [true, "fuelType değeri zorunludur"],
    enum: ["Gas", "Diesel", "Electric", "Hybrid"],
  },
  transmission: {
    type: String,
    required: [true, "transmission değeri zorunludur"],
    enum: ["Automatic", "Manual"],
  },
  drive: {
    type: String,
    required: [true, "drive değeri zorunludur"],
    enum: ["fwd", "rwd", "awd", "4fwd"],
  },
  type: {
    type: String,
    required: [true, "type değeri zorunludur"],
  },
  description: {
    type: String,
    required: [true, "description değeri zorunludur"],
    maxLength: [300, "description 300 karakterden uzun olamaz"],
  },
  capacity: {
    type: Number,
    required: [true, "capacity değeri zorunludur"],
  },
  gasoline: {
    type: Number,
  },
});

// Her importta yeniden model oluşturmasını önlemek için önce mevcut modellerin arasında Car model var mı kontrol ediyoruz varsa onu export ediyoruz yoksa yenisini oluşturup export ediyoruz
const Car = mongoose.models?.Car || mongoose.model("Car", carSchema);

export default Car;
