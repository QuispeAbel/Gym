import { motion, AnimatePresence } from "framer-motion";

interface Props {
    isMenuOpen : boolean;
}

export const MobileMenu = ({isMenuOpen}:Props) => {
    return (
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                <button className="block w-full text-left px-3 py-2 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Sobre Nosotros
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Iniciar Sesión
                </button>
                <button className="block w-full text-left px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                  Registrarse
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    );
}