import React from 'react';
import { motion } from 'framer-motion';

const getScoreColor = (score) => {
  const red = Math.floor(255 - (score / 1000) * 255);
  const green = Math.floor((score / 1000) * 255);
  return `rgb(${red}, ${green}, 0)`;
};

const Score = ({ score }) => {
  const scoreVariants = {
    hidden: {
      scaleY: 0, // Initially, the component is scaled down to nothing vertically
      opacity: 0, // Make the component completely transparent initially
    },
    visible: {
      scaleY: 1, // Animate back to the full size
      opacity: 1, // Ensure that the component is fully visible
      transition: {
        duration: 0.8, // The duration over which the transition occurs
        ease: "easeOut", // Starts quickly and slows down towards the end
      },
    },
  };

  // Only show the score if it is not null
  if (score !== null) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={scoreVariants}
        style={{ 
          backgroundColor: getScoreColor(score),
          originY: 0, // Change the transformation origin to the top of the element
          overflow: 'hidden', // Ensure the content doesn't spill outside during animation
        }}
      >
        <p className="Score-text">{`Your score: ${score}`}</p>
      </motion.div>
    );
  }
  return null;
};

export default Score;


