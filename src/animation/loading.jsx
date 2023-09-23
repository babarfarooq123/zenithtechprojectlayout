import { motion } from "framer-motion";

const LoadingAnimate = () => {
  const dotVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: [0, -10, 0, 10, 0], // Use a sine wave-like pattern to create a smooth wave animation
      transition: {
        // duration: 2,
        duration: 2.3,
        repeat: Infinity,
      },
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <motion.div
        style={{
          display: 'flex',
        }}
      >
        <motion.span
          style={{
            display: 'block',
            width: '2rem',
            height: '2rem',
            backgroundColor: 'lightblue',
            borderRadius: '50%',
            marginRight: '1rem',
          }}
          variants={dotVariants}
          initial="initial"
          animate="animate"
        />
        <motion.span
          style={{
            display: 'block',
            width: '2rem',
            height: '2rem',
            backgroundColor: 'lightblue',
            borderRadius: '50%',
            marginRight: '1rem',
          }}
          variants={dotVariants}
          initial="initial"
          animate="animate"
        />
        <motion.span
          style={{
            display: 'block',
            width: '2rem',
            height: '2rem',
            backgroundColor: 'lightblue',
            borderRadius: '50%',
          }}
          variants={dotVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>
    </div>
  );
};

export default LoadingAnimate;