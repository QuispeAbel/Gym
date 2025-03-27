import { useState } from 'react'
import './App.css'
import {Navbar, Carrousel, SubButton, SuscribeModal} from './components'
import { Image } from './models/Image';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const carouselImages: Image[] = [
    {
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      alt: "Modern gym interior with various equipment"
    },
    {
      url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      alt: "Group training session"
    },
    {
      url: "https://images.unsplash.com/photo-1576678927484-cc907957088c",
      alt: "Weight training area"
    }
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Carrousel carouselImages={carouselImages} />
      <SubButton setShowSubscribeModal={setShowSubscribeModal} />
      <SuscribeModal showSubscribeModal={showSubscribeModal} setShowSubscribeModal={setShowSubscribeModal} />
      
    </div>
   
  )
}

export default App