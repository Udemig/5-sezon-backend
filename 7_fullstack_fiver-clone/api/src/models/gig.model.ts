import { model, Schema, Types } from "mongoose";

// bir belgenin tipi
export interface IGig {
  _id: string;
  user: Types.ObjectId;
  title: string;
  description: string;
  reviewCount: number;
  starCount: number;
  category: string;
  coverImage: string;
  images: string[];
  package_title: string;
  package_description: string;
  package_price: number;
  package_features: string[];
  package_duration: number;
  package_revisions: number;
  createdAt: string;
  updatedAt: string;
}

// şema oluştur
const gigSchema = new Schema<IGig>(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Lütfen title alanını belirleyin"],
    },
    description: {
      type: String,
      required: [true, "Lütfen description alanını belirleyin"],
      minlength: [15, "description alanı en az 15 karakter olmalıdır"],
      maxlength: [500, "description alanı en fazla 500 karakter olmalıdır"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    starCount: {
      type: Number,
      default: 0,
    },
    coverImage: {
      type: String,
      required: [true, "Lütfen coverImage alanını belirleyin"],
    },
    images: {
      type: [String],
      required: [true, "Lütfen images alanını belirleyin"],
    },
    category: {
      type: String,
      required: [true, "Lütfen category alanını belirleyin"],
    },
    package_title: {
      type: String,
      required: [true, "Lütfen package_title alanını belirleyin"],
    },
    package_description: {
      type: String,
      required: [true, "Lütfen package_description alanını belirleyin"],
    },
    package_price: {
      type: Number,
      required: [true, "Lütfen package_price alanını belirleyin"],
    },
    package_features: {
      type: [String],
      required: [true, "Lütfen package_features alanını belirleyin"],
    },
    package_duration: {
      type: Number,
      required: [true, "Lütfen package_duration alanını belirleyin"],
    },
    package_revisions: {
      type: Number,
      required: [true, "Lütfen package_revisions alanını belirleyin"],
    },
  },
  {
    timestamps: true,
  }
);

// model oluştur
const Gig = model<IGig>("Gig", gigSchema);

export default Gig;
