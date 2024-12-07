import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import Captions from './components/Captions';
import DateRequest from './components/DateRequest';
import BackgroundElements from './components/BackgroundElements';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

const App = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [step, setStep] = useState(0);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [captions, setCaptions] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleImageUpload = (images) => {
    setUploadedImages(images);
    setImagesUploaded(true);
  };

  const steps = [
    <ImageUpload onUpload={handleImageUpload} />,
    <Captions onCaptionsSet={setCaptions} />,
    <DateRequest />
  ];

  useEffect(() => {
    // Preload background images
    const images = ['/heart.png', '/teddy-bear.png', '/chocolate.png'];
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center overflow-hidden relative">
      <BackgroundElements 
        uploadedImages={uploadedImages} 
        imagesUploaded={imagesUploaded} 
        captions={captions}
        showCaptions={step > 1}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full bg-white rounded-lg shadow-lg p-6 z-10 ${isMobile ? 'mx-4' : ''}`}
      >
        {/* <h1 className={`text-3xl font-bold text-center mb-6 text-pink-600 ${step < 1 ? 'hidden' : ''}`}>
          Will You Go On A Date With Me?
        </h1> */}
        {steps[step]}
        {step < steps.length - 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (step === 0) {
                // Handle image upload
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput.files.length > 0) {
                  const formData = new FormData();
                  Array.from(fileInput.files).forEach((file) => {
                    formData.append('images', file);
                  });
                  
                  axios.post('https://date-backen.vercel.app/api/upload', formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  }).then(response => {
                    if (response.data.success) {
                      handleImageUpload(response.data.images);
                      setStep(step + 1);
                    }
                  }).catch(error => {
                    console.error('Error uploading files:', error);
                  });
                } else {
                  setStep(step + 1);
                }
              } else {
                setStep(step + 1);
              }
            }}
            className="mt-4 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
          >
            Next
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default App;

