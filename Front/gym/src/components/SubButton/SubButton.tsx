import { motion } from "framer-motion";

interface Props {
    setShowSubscribeModal: (showSubscribeModal: boolean) => void;
}

export const SubButton = ({setShowSubscribeModal}:Props) => {
    return (
        <motion.div 
        animate={{y:[60,0]}}
        transition={{duration:2}}
        className="max-w-7xl mx-auto my-5 px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSubscribeModal(true)}
          className="px-8 py-4 bg-blue-500 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
          Suscribirme
        </motion.button>
      </motion.div>
    );
    }