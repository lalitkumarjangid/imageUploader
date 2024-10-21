import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title of the image is mandatory
  },
  imageUrl: {
    type: String,
    required: true, // Cloudinary URL is mandatory
  },
}, { timestamps: true }); // Automatically creates `createdAt` and `updatedAt` fields

const Image = mongoose.model("Image", ImageSchema);

export default Image;
