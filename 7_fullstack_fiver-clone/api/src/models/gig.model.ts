import { model, Schema } from "mongoose";

// bir belgenin tipi
export interface IGig {
  name: string;
}

// şema oluştur
const gigSchema = new Schema<IGig>({
  name: {
    type: String,
  },
});

// model oluştur
const Gig = model<IGig>("Gig", gigSchema);

export default Gig;
