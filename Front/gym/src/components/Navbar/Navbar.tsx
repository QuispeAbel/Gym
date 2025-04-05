import { DesktopMenu, MobileMenuButton, MobileMenu} from "../../components";
import {motion} from "framer-motion";

interface Props {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const Navbar = ({isDarkMode, toggleDarkMode, isMenuOpen, setIsMenuOpen}:Props) => {
    return (
    <motion.nav animate={{x: [-100, 0]}} transition={{duration: 2}} className={`fixed w-full z-50 bg-white dark:bg-gray-800 shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <img
                        className="h-8 w-auto"
                        src="https://static.vecteezy.com/system/resources/previews/003/108/337/original/fitness-gym-logo-with-strong-athlete-and-barbell-vector.jpg"
                        alt="hola puto"
                    />
                    <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">GYM</span>
                </div>
                <DesktopMenu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                
            </div>
        </div>
        <MobileMenu isMenuOpen={isMenuOpen} />
    </motion.nav>
);
}
