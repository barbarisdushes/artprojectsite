"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  PenTool, 
  Eye, 
  FileText, 
  Building2, 
  Layers 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Building2 className="h-10 w-10 text-accent" />,
      title: "Архитектурное проектирование",
      description: "Разработка полного комплекта проектной документации для строительства зданий и сооружений различного назначения.",
    },
    {
      icon: <Home className="h-10 w-10 text-accent" />,
      title: "Дизайн интерьера",
      description: "Создание концепций интерьерных решений, включая планировку пространства, подбор материалов и мебели.",
    },
    {
      icon: <PenTool className="h-10 w-10 text-accent" />,
      title: "3D визуализация",
      description: "Реалистичная визуализация архитектурных и интерьерных проектов с использованием современных технологий.",
    },
    {
      icon: <Eye className="h-10 w-10 text-accent" />,
      title: "Авторский надзор",
      description: "Контроль соответствия строительных работ проектной документации на всех этапах реализации проекта.",
    },
    {
      icon: <FileText className="h-10 w-10 text-accent" />,
      title: "Согласование проектов",
      description: "Сопровождение проектной документации и получение необходимых разрешений в государственных органах.",
    },
    {
      icon: <Layers className="h-10 w-10 text-accent" />,
      title: "Ландшафтный дизайн",
      description: "Разработка концепций благоустройства территории, включая озеленение, малые архитектурные формы и освещение.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Наши услуги</h2>
            <div className="flex justify-center mb-6">
              <Separator className="w-24 bg-accent h-1" />
            </div>
            <p className="text-muted-foreground">
              Мы предлагаем полный спектр архитектурных и дизайнерских услуг, 
              от разработки концепции до авторского надзора за реализацией проекта.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border border-border/50 hover:border-accent/50 transition-all duration-300 bg-card/80">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 