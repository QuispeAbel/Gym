import { FiX, FiMenu } from "react-icons/fi";

interface Props {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const MobileMenuButton = ({isMenuOpen, setIsMenuOpen}:Props) => {
    return (
    <div className="md:hidden">
        <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
        >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
    </div>
    );
}