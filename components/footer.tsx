"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-semibold hover:text-accent transition-colors">
              АРТ ПРОЕКТ КЗ
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Современная архитектура и дизайн
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-6 mb-4">
              <Link href="#about" className="text-sm hover:text-accent transition-colors">
                О компании
              </Link>
              <Link href="#services" className="text-sm hover:text-accent transition-colors">
                Услуги
              </Link>
              <Link href="#portfolio" className="text-sm hover:text-accent transition-colors">
                Портфолио
              </Link>
              <Link href="#contact" className="text-sm hover:text-accent transition-colors">
                Контакты
              </Link>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © {currentYear} ТОО "АРТ ПРОЕКТ КЗ". Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 