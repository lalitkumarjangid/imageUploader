import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../ApiLinks.js";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getImage`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', 
        },
      });
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      const response = await axios.post(`${BASE_URL}/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Access-Control-Allow-Origin': '*', 
        },
      });
      setMessage("Image uploaded successfully!");
      toast.success("Image uploaded successfully!");
      fetchImages(); // Refresh the list of images
    } catch (error) {
      setMessage("Image upload failed. Please try again.");
      toast.error("Image upload failed. Please try again.");
      console.error("Error uploading image:", error);
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    setLogoutMessage("You have been logged out successfully.");
    toast.success("You have been logged out successfully.");
    navigate("/login"); // Navigate to login page
  };

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-blue-500 to-purple-600 p-6"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <Toaster />
      <header className="w-full flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Logout
        </button>
      </header>
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Dashboard
      </h1>

      {/* Image Upload Form */}
      <form
        onSubmit={handleImageUpload}
        className="space-y-4 mb-8 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div
          {...getRootProps()}
          className="w-84 h-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {image ? (
            <p>{image.name}</p>
          ) : (
            <>
              <p className="text-center break-words">
                {" "}
                Drop an image here, or click to select one
              </p>
              <p className="text-center break-words"> or click to select one</p>
            </>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Upload Image
        </button>
      </form>

      {message && (
        <p className="text-center text-white bg-green-500 p-2 rounded mb-4">
          {message}
        </p>
      )}

      {logoutMessage && (
        <p className="text-center text-white bg-green-500 p-2 rounded mb-4">
          {logoutMessage}
        </p>
      )}

      {/* Display Images */}
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            <h2 className="text-lg font-bold mb-2">{img.title}</h2>
            <img
              src={img.imageUrl}
              alt={img.title}
              className="object-cover rounded-md mb-2"
              style={{ width: "300px", height: "300px" }}
            />
            <p className="text-gray-500">
              {new Date(img.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;