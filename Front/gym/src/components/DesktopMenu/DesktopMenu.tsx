import { FiMoon, FiSun } from "react-icons/fi";

interface Props {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const DesktopMenu = ({isDarkMode, toggleDarkMode}:Props) => {
    return (
        <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Sobre Nosotros
              </button>
              <button className="text-gray-600 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Iniciar Sesión
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Registrarse
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
              </button>
            </div>
    );
}