import { motion, AnimatePresence } from "framer-motion";
import { SubForm } from "../../components";

interface Props {
    showSubscribeModal: boolean;
    setShowSubscribeModal: (showSubscribeModal: boolean) => void;
}

export const SuscribeModal = ({showSubscribeModal, setShowSubscribeModal}:Props) => {
    return(
        <AnimatePresence>
        {showSubscribeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Suscríbete ahora</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Únete a nuestra comunidad fitness y transforma tu vida.
              </p>
              <SubForm/>
              <button
                onClick={() => setShowSubscribeModal(false)}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
}