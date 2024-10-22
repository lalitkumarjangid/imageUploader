import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../ApiLinks.js";
import { useDropzone } from "react-dropzone";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FiShare2 } from "react-icons/fi";
import { FaImage } from "react-icons/fa"; // Importing an icon for the project name

Modal.setAppElement("#root");

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

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
      fetchImages();
    } catch (error) {
      setMessage("Image upload failed. Please try again.");
      toast.error("Image upload failed. Please try again.");
      console.error("Error uploading image:", error);
    }
  };

  const handleLogout = () => {
    setLogoutMessage("You have been logged out successfully.");
    toast.success("You have been logged out successfully.");
    navigate("/");
  };

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const copyToClipboard = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl);
    toast.success("Image URL copied to clipboard!");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-white p-6"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <Toaster />
      <header className="w-full flex justify-between items-center p-4">
        <h1 className="text-4xl font-bold flex items-center">
          <FaImage className="mr-2 text-blue-400" /> Post
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Logout
        </button>
      </header>
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>

      {/* Image Upload Form */}
      <form
        onSubmit={handleImageUpload}
        className="space-y-4 mb-8 w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div
          {...getRootProps()}
          className="w-full h-64 p-3 border border-gray-600 rounded-md bg-gray-700 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          {image ? (
            <p className="text-white">{image.name}</p>
          ) : (
            <p className="text-gray-400">Drop an image here, or click to select one</p>
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
        <p className="text-center bg-green-500 p-2 rounded mb-4">{message}</p>
      )}

      {logoutMessage && (
        <p className="text-center bg-green-500 p-2 rounded mb-4">{logoutMessage}</p>
      )}

      {/* Display Images Horizontally with Wrapping */}
      <h2 className="text-2xl font-semibold mb-4">Uploaded Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl mb-8">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
            onClick={() => openModal(img.imageUrl)}
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="object-cover rounded-full w-24 h-24 mb-2"
            />
            <h2 className="text-lg font-bold mb-2">{img.title}</h2>
            <p className="text-gray-400 mb-2">{new Date(img.createdAt).toLocaleString()}</p>
            <FiShare2
              className="text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(img.imageUrl);
              }}
            />
          </div>
        ))}
      </div>

      {/* Modal for Full Image Display */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-gray-800 p-4 rounded-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <button onClick={closeModal} className="text-white mb-4">Close</button>
        {selectedImage && (
          <img src={selectedImage} alt="Full view" className="max-w-full max-h-[80vh] object-contain rounded" />
        )}
      </Modal>

      {/* Additional Information Section */}
      <section className="w-full max-w-5xl bg-gray-800 p-4 rounded-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">About This Dashboard</h2>
        <p className="mb-2">
          This dashboard allows users to upload and manage images easily. You can drag and drop images or select them manually. 
          Once uploaded, images will appear in the section above, and you can share their URLs directly from the dashboard.
        </p>
        <p>
          Click on any image to view it in a larger modal. Use the copy icon to quickly share the image URL with your friends or colleagues!
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
