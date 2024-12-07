import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const captions = [
  "Your smile brightens my day",
  "I love how passionate you are about your hobbies",
  "Your kindness inspires me",
  "I admire your sense of humor",
  "You have the most beautiful eyes",
];

const Captions = ({ onCaptionsSet }) => {
  useEffect(() => {
    onCaptionsSet(captions);
  }, [onCaptionsSet]);

  return (
    <div className="space-y-4">
      {captions.map((caption, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-pink-100 p-4 rounded-md"
        >
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="text-pink-600 font-medium"
          >
            {caption}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
};

export default Captions;

