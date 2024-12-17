import { model, Schema, Types } from "mongoose";

// todo hizmet veileri için hem şema hem de interaface oluştur

// bir belgenin tipi
export interface IGig {
  user: Types.ObjectId;
}

// şema oluştur
const gigSchema = new Schema<IGig>({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

// model oluştur
const Gig = model<IGig>("Gig", gigSchema);

export default Gig;
