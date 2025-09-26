"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
  // Примеры проектов
  const projects = [
    {
      id: 1,
      title: "Жилой комплекс «Гармония»",
      description: "Современный жилой комплекс с акцентом на экологичность и комфорт. Проект включает 3 многоквартирных дома, спортивные площадки и зону отдыха.",
      category: "Жилые комплексы",
      year: "2023",
      location: "г. Астана",
      imageUrl: "/placeholder-1.jpg" // Заглушка для изображения
    },
    {
      id: 2,
      title: "Бизнес-центр «Горизонт»",
      description: "Офисное здание класса A с уникальной архитектурой и инновационными решениями для бизнеса. Проект отмечен премией за экологичный дизайн.",
      category: "Коммерческая недвижимость",
      year: "2022",
      location: "г. Алматы",
      imageUrl: "/placeholder-2.jpg" // Заглушка для изображения
    },
    {
      id: 3,
      title: "Загородный дом «Оазис»",
      description: "Индивидуальный проект загородного дома, сочетающий современную архитектуру и максимальную интеграцию с природным ландшафтом.",
      category: "Частные дома",
      year: "2023",
      location: "Алматинская область",
      imageUrl: "/placeholder-3.jpg" // Заглушка для изображения
    },
    {
      id: 4,
      title: "Реконструкция исторического здания",
      description: "Проект реновации исторического здания с сохранением архитектурного наследия и адаптацией под современные нужды.",
      category: "Реконструкция",
      year: "2021",
      location: "г. Астана",
      imageUrl: "/placeholder-4.jpg" // Заглушка для изображения
    }
  ];

  return (
    <section
      id="portfolio"
      className="py-20 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Портфолио</h2>
            <div className="flex justify-center mb-6">
              <Separator className="w-24 bg-accent h-1" />
            </div>
            <p className="text-muted-foreground">
              Примеры наших лучших проектов и работ в сфере архитектуры и дизайна интерьера.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden h-full bg-background/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
                <div className="aspect-video w-full bg-accent/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-xs text-accent/70">ФОТО</span>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-accent">{project.category}</span>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">
                    {project.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-accent">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Подробнее
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="outline" className="mx-auto">
            Показать больше проектов
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 