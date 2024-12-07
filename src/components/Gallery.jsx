import React from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ images }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative overflow-hidden rounded-md aspect-video"
          variants={itemVariants}
        >
          <motion.img
            src={image.startsWith('http') ? image : `http://localhost:5000${image}`}
            alt={`Uploaded image ${index + 1}`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'tween', duration: 0.3 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Gallery;

