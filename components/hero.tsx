"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-16"
    >
      {/* Фоновое изображение */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div 
          className="absolute inset-0 bg-center bg-cover opacity-75"
          style={{ backgroundImage: "url('background.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>
      
      {/* Дополнительный градиент поверх изображения */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--accent)_0%,transparent_60%)] opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-md">
            Современная архитектура и дизайн
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto drop-shadow">
            Мы создаём инновационные архитектурные решения, сочетающие 
            функциональность, эстетику и устойчивое развитие.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              asChild
            >
              <a href="#contact">Связаться с нами</a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              asChild
            >
              <a href="#services">Наши услуги</a>
            </Button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <a href="#about" aria-label="Прокрутить вниз" className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero; 