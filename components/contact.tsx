"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Linkedin, Instagram } from "lucide-react";
import emailjs from '@emailjs/browser';

// Регулярные выражения для валидации
const nameRegex = /^[А-Яа-яA-Za-zЁёӘәҚқҢңҒғҮүҰұӨөІі\s-]+$/; // Кириллица, латиница и символы казахского алфавита
const kazakhstanPhoneRegex = /^\+7 \(7\d{2}\) \d{3}-\d{2}-\d{2}$/;


const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать не менее 2 символов." })
    .regex(nameRegex, { message: "Имя может содержать только буквы." }),
  email: z
    .string()
    .email({ message: "Пожалуйста, введите корректный email." }),
  phone: z
    .string()
    .regex(kazakhstanPhoneRegex, {
      message: "Пожалуйста, введите корректный казахстанский номер телефона (+7/8 XXX XXX XX XX).",
    }),
  message: z
    .string()
    .min(10, { message: "Сообщение должно содержать не менее 10 символов." })
    .max(500, { message: "Сообщение не должно превышать 500 символов." }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  
  // EmailJS константы
  const [emailjsConfig] = useState({
    serviceId: "service_7c8b3ui",
    templateId: "template_mcf1yhk",
    publicKey: "CpMwds5goI9nVNqv4",
  });

  function formatKzPhone(input: string): string {
    // Оставляем только цифры
    const digits = input.replace(/\D/g, "");
    
    // Если нет цифр, возвращаем пустую строку
    if (digits.length === 0) {
      return "";
    }
    
    // Если только одна цифра и это не 7 или 8
    if (digits.length === 1 && digits !== "7" && digits !== "8") {
      return digits;
    }
    
    // Нормализуем номер (если начинается с 8, заменяем на 7)
    let normalizedDigits = digits;
    if (digits.startsWith("8")) {
      normalizedDigits = "7" + digits.substring(1);
    }
    
    // Если только 7, возвращаем +7
    if (normalizedDigits === "7") {
      return "+7";
    }
    
    // Форматируем по частям
    let formatted = "+7";
    const phoneDigits = normalizedDigits.substring(1); // убираем первую 7
    
    if (phoneDigits.length > 0) {
      // Добавляем пробел и открывающую скобку
      formatted += " (" + phoneDigits.substring(0, 3);
      
      // Добавляем закрывающую скобку только если есть 3 цифры ИЛИ больше 3 цифр
      if (phoneDigits.length >= 3) {
        formatted += ")";
        
        // Добавляем пробел и следующие цифры только если есть больше 3 цифр
        if (phoneDigits.length > 3) {
          formatted += " " + phoneDigits.substring(3, 6);
          
          if (phoneDigits.length > 6) {
            formatted += "-" + phoneDigits.substring(6, 8);
            
            if (phoneDigits.length > 8) {
              formatted += "-" + phoneDigits.substring(8, 10);
            }
          }
        }
      }
    }
    
    return formatted;
  }
  
  // Простое решение для обработчика onChange
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const value = e.target.value;
    
    // Если пользователь полностью очищает поле
    if (value === "") {
      field.onChange("");
      return;
    }
    
    // Если остается только "+7 " (пробел после +7)
    if (value === "+7 ") {
      field.onChange("+7");
      return;
    }
    
    const formatted = formatKzPhone(value);
    field.onChange(formatted);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setSubmitError("Ошибка конфигурации почтового сервиса. Пожалуйста, свяжитесь с нами по телефону.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      // Отправляем данные через EmailJS
      const result = await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        },
        emailjsConfig.publicKey
      );
      

      if (result.status === 200) {
        setSubmitSuccess(true);
        form.reset();
        
        // Сбросить статус успеха через 5 секунд
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error("Не удалось отправить сообщение");
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setSubmitError("Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Контакты</h2>
            <div className="flex justify-center mb-6">
              <Separator className="w-24 bg-accent h-1" />
            </div>
            <p className="text-muted-foreground">
              Свяжитесь с нами, чтобы обсудить ваш проект или получить консультацию.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full bg-background/60 backdrop-blur-sm border-none shadow-lg overflow-hidden">
              <CardContent className="p-6 md:p-10">
                <h3 className="text-2xl font-semibold mb-6">Контактная информация</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p className="text-muted-foreground">+7 (707) 532-46-90</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">a.amirov@artproject.kz</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p className="text-muted-foreground">г.Астана, улица Шәмші Қалдаяқов, дом № 23A</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full bg-background/60 backdrop-blur-sm border-none shadow-lg overflow-hidden">
              <CardContent className="p-6 md:p-10">
                <h3 className="text-2xl font-semibold mb-6">Обратная связь</h3>
                
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                    Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
                  </div>
                )}

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                    {submitError}
                  </div>
                )}
                
                <Form {...form}>
                  <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input placeholder="Ваше имя" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="example@mail.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+7 (7XX) XXX-XX-XX"
                                value={field.value}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  
                                  // Если пользователь полностью очищает поле
                                  if (value === "") {
                                    field.onChange("");
                                    return;
                                  }
                                  
                                  // Если остается только "+7 " (пробел после +7)
                                  if (value === "+7 ") {
                                    field.onChange("+7");
                                    return;
                                  }
                                  
                                  const formatted = formatKzPhone(value);
                                  field.onChange(formatted);
                                }}
                                onKeyDown={(e) => {
                                  const input = e.currentTarget;
                                  const cursorPos = input.selectionStart || 0;
                                  const value = input.value;
                                  
                                  if (e.key === "Backspace") {
                                    // Если курсор находится после пробела или скобки, удаляем предыдущую цифру
                                    if (cursorPos > 0) {
                                      const charBeforeCursor = value[cursorPos - 1];
                                      
                                      // Если символ перед курсором - служебный символ
                                      if ([" ", "(", ")", "-"].includes(charBeforeCursor)) {
                                        e.preventDefault();
                                        
                                        // Извлекаем все цифры и удаляем последнюю
                                        const digits = value.replace(/\D/g, "");
                                        if (digits.length > 1) {
                                          const newDigits = digits.slice(0, -1);
                                          const newFormatted = formatKzPhone(newDigits);
                                          field.onChange(newFormatted);
                                        } else {
                                          field.onChange("");
                                        }
                                      }
                                    }
                                  }
                                }}
                                maxLength={18}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Сообщение</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Расскажите о вашем проекте или задайте вопрос"
                              className="resize-none h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Отправка..." : "Отправить сообщение"}
                    </Button>
                  </form>
                </Form>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  * Нажимая на кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;