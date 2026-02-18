import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.categoryName, { lower: true });
  next();
});

export default mongoose.model("Category", categorySchema);
