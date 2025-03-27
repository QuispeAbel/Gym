import { Image } from "../../models/Image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Props {
    carouselImages: Image[];
}

export const Carrousel = ({carouselImages}:Props) =>{

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => clearInterval(timer);
      }, []);

    return(
        <motion.div animate={{y:[60,0]}} transition={{duration:2}}  className="relative pt-16">
        <div className="w-full h-[600px] overflow-hidden">
          {carouselImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 1 }}
              className={`absolute w-full h-full ${currentSlide === index ? "z-20" : "z-10"}`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-blue-500" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
}