import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageUpload = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);

    const urls = Array.from(files).map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <h2 className="text-2xl font-semibold mb-4">Upload Your Cute Photos</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      {previewUrls.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {previewUrls.map((url, index) => (
            <motion.img
              key={index}
              src={url}
              alt={`Preview ${index + 1}`}
              className="w-24 h-24 object-cover rounded-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ImageUpload;

