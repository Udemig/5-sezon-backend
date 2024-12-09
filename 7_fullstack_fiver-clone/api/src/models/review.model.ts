import { model, Schema } from "mongoose";

// bir belgenin tipi
export interface IReview {
  name: string;
}

// şema oluştur
const reviewSchema = new Schema<IReview>({
  name: {
    type: String,
  },
});

// model oluştur
const Review = model<IReview>("Review", reviewSchema);

export default Review;
