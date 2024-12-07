import React from 'react';
import { motion } from 'framer-motion';

const BackgroundElements = ({ uploadedImages, imagesUploaded, captions, showCaptions }) => {
  const elements = [
    { src: '/heart.png', count: 5 },
    { src: '/teddy-bear.png', count: 3 },
    { src: '/chocolate.png', count: 4 },
  ];

  const createElements = (src, count, isUploaded = false) => {
    return Array.from({ length: count }).map((_, index) => (
      <motion.img
        key={`${src}-${index}`}
        src={isUploaded ? `http://localhost:5000${src}` : src}
        alt=""
        className="absolute rounded-lg shadow-lg"
        style={{
          width: isUploaded ? '200px' : `${Math.random() * 40 + 30}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: isUploaded ? 0.6 : 0.8,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          scale: isUploaded ? [1, 1.1, 1] : [1, 1.2, 1],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    ));
  };

  const createCaptionElements = () => {
    return captions.map((caption, index) => (
      <motion.div
        key={`caption-${index}`}
        className="absolute bg-pink-100 p-2 rounded-lg shadow-lg text-pink-600 font-medium"
        style={{
          left: `${Math.random() * 80}%`,
          top: `${Math.random() * 80}%`,
          maxWidth: '200px',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        {caption}
      </motion.div>
    ));
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {!imagesUploaded && elements.map(({ src, count }) => createElements(src, count))}
      {imagesUploaded && uploadedImages.map((src, index) => createElements(src, 1, true))}
      {showCaptions && createCaptionElements()}
    </div>
  );
};

export default BackgroundElements;

