"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [inHeroSection, setInHeroSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Определяем, прокрутил ли пользователь страницу ниже секции Hero
      // Высота экрана в качестве приблизительной высоты секции Hero
      const heroHeight = window.innerHeight * 0.85;
      const isInHero = window.scrollY < heroHeight;
      
      setScrolled(window.scrollY > 50);
      setInHeroSection(isInHero);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Главная", href: "#home" },
    { name: "О компании", href: "#about" },
    { name: "Услуги", href: "#services" },
    { name: "Портфолио", href: "#portfolio" },
    { name: "Контакты", href: "#contact" },
  ];

  // Определяем классы для текста в зависимости от положения и скролла
  const textColorClass = inHeroSection && !scrolled 
    ? "text-white" 
    : "text-foreground";
    
  // Определяем какой логотип использовать
  const logoSrc = inHeroSection && !scrolled 
    ? "logo-white.png" 
    : "logo-black.png";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className={`flex items-center gap-3 hover:text-accent transition-colors ${textColorClass}`}
        >
          <div className="relative w-10 h-10 overflow-hidden bg-transparent flex items-center justify-center">
            <img
              src={logoSrc}
              alt="АРТ ПРОЕКТ КЗ"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <span className="font-bold text-xl md:text-2xl">АРТ ПРОЕКТ КЗ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${textColorClass} hover:text-accent transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className={inHeroSection && !scrolled ? "text-white hover:text-white/80" : ""}
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-8 h-8 overflow-hidden bg-transparent flex items-center justify-center">
                <img
                  src="logo-black.png"
                  alt="АРТ ПРОЕКТ КЗ"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg">АРТ ПРОЕКТ КЗ</span>
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-accent py-2 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header; 