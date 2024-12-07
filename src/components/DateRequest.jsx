import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaSadTear } from 'react-icons/fa';

const DateRequest = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesClicked, setYesClicked] = useState(false);
  const [buttonSize, setButtonSize] = useState(1);

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const handleNoClick = () => {
    setNoCount(prevCount => prevCount + 1);
    setButtonSize(prevSize => Math.min(prevSize + 0.1, 1.5)); // Limit max size
  };

  const handleYesClick = () => {
    setYesClicked(true);
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        {!yesClicked ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Will You Go Out With Me? ❤️
            </h2>
            <div className="flex justify-center space-x-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                style={{ transform: `scale(${buttonSize})` }}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-full shadow-md text-lg font-medium transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                Yes <FaHeart className="inline ml-2" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNoClick}
                className="bg-gradient-to-r from-red-400 to-red-600 text-white py-3 px-6 rounded-full shadow-md text-lg font-medium transition-all duration-300 ease-in-out hover:shadow-lg"
              >
                No <FaSadTear className="inline ml-2" />
              </motion.button>
            </div>

            <AnimatePresence>
              {noCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                >
                  <p className="text-red-700 font-semibold">
                    {phrases[Math.min(noCount, phrases.length - 1)]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Yay! I'm so excited! 😊
            </h2>
            <p className="text-lg text-gray-700">
              Can't wait for our date! ❤️
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DateRequest;