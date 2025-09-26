"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">О компании</h2>
          <div className="flex justify-center mb-10">
            <Separator className="w-24 bg-accent h-1" />
          </div>
          
          <Card className="bg-background/60 backdrop-blur-sm border-none shadow-lg">
            <CardContent className="p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-accent">Наша философия</h3>
                  <p className="text-muted-foreground">
                    Философия компании "АРТ ПРОЕКТ КЗ" основана на принципах гармонии между 
                    функциональностью и эстетикой. Мы верим, что хорошая архитектура должна 
                    не только соответствовать практическим требованиям, но и вдохновлять, 
                    создавать атмосферу и отражать характер владельцев.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-accent">Наш подход</h3>
                  <p className="text-muted-foreground">
                    Мы придерживаемся индивидуального подхода к каждому проекту, уделяя 
                    внимание деталям и потребностям клиента. Наша команда профессионалов 
                    объединяет опыт, творческое мышление и современные технологии, чтобы 
                    создавать уникальные архитектурные решения.
                  </p>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4 text-accent">Опыт и профессионализм</h3>
                <p className="text-muted-foreground">
                  С многолетним опытом работы в сфере архитектуры и дизайна, 
                  команда "АРТ ПРОЕКТ КЗ" успешно реализовала множество проектов различной сложности — 
                  от частных домов до общественных зданий. Мы гордимся тем, что создаем 
                  пространства, которые не только функциональны, но и эстетически привлекательны.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Проектов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Специалистов</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Наград</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 