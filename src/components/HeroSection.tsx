
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: "Experience Next-Gen Technology",
    subtitle: "Discover the latest innovations and gadgets",
    cta: "Shop Now",
    imagePath: "/placeholder.svg",
    link: "/products",
    bgColor: "bg-gradient-to-r from-techmart-purple-dark to-techmart-purple-light",
  },
  {
    id: 2,
    title: "Unbeatable Tech Deals",
    subtitle: "Save big on premium electronics",
    cta: "View Offers",
    imagePath: "/placeholder.svg",
    link: "/deals",
    bgColor: "bg-gradient-to-r from-blue-600 to-cyan-500",
  },
  {
    id: 3,
    title: "Smart Home Solutions",
    subtitle: "Transform your living space with intelligent devices",
    cta: "Explore",
    imagePath: "/placeholder.svg",
    link: "/products?category=smart-home",
    bgColor: "bg-gradient-to-r from-amber-500 to-pink-500",
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Slide Container */}
      <div 
        className={`w-full h-full ${currentSlideData.bgColor} transition-all duration-700 ease-in-out flex items-center`}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-white space-y-6 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{currentSlideData.title}</h1>
            <p className="text-xl opacity-90">{currentSlideData.subtitle}</p>
            <Button 
              className="bg-white text-techmart-purple hover:bg-gray-100 hover:text-techmart-purple-dark px-8 py-6 text-lg" 
              asChild
            >
              <a href={currentSlideData.link}>{currentSlideData.cta}</a>
            </Button>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src={currentSlideData.imagePath} 
              alt={currentSlideData.title}
              className="max-h-[300px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
