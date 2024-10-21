import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Model/SignUp.js";
import Image from "../Model/ImageUpload.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "123", { expiresIn: "1h" });

    res.status(200).json({ Login: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadImage = async (req, res, next) => {
  const { title } = req.body;
  const file = req.file;

  if (!title || !file) {
    return res.status(400).json({ message: "Title and image are required" });
  }

  try {
    const newImage = new Image({
      title,
      imageUrl: file.path,
    });

    await newImage.save();

    return res.status(201).json({
      message: "Image uploaded successfully",
      newImage,
    });
  } catch (cloudinaryError) {
    console.error("Error during Cloudinary upload:", cloudinaryError);
    return res.status(500).json({
      message: "Error uploading image to Cloudinary",
      error: cloudinaryError.message,
    });
  }
};

export const getImage = async (req, res, next) => {
  try {
    const { limit = 10, page = 1, title } = req.query;
    // console.log(`Fetching images with title: ${title}`); 

    let query = {};
    if (title) {
      query.title = title;
    }

    const [images, totalImages] = await Promise.all([
      Image.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip(Number(limit) * (Number(page) - 1)),
      Image.countDocuments(query)
    ]);

    res.status(200).json({
      message: "Images fetched successfully",
      images,
      currentPage: Number(page),
      totalPages: Math.ceil(totalImages / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
