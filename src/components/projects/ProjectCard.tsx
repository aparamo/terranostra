'use client';

import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowRight, Users, Leaf, Globe} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  socioenvironmentalBenefits: string[];
  projectTypes: string[];
  detailedDescription?: string;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  socioenvironmentalBenefits,
  projectTypes,
  detailedDescription
}: ProjectCardProps) {
  const t = useTranslations('ProjectsPage');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden transition-all duration-300 h-full flex flex-col group hover:shadow-xl cursor-pointer">
          <CardHeader className="p-0">
            <div className="overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                width={400}
                height={250}
                className="object-cover w-full h-48 transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              variant="ghost"
              className="text-primary font-semibold group-hover:translate-x-1 transition-transform"
            >
              {t('readMore')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {detailedDescription || description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative">
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={500}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Project Types */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Tipos de Proyecto
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Socioenvironmental Benefits */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Beneficios Socioambientales
            </h3>
            <ul className="space-y-2">
              {socioenvironmentalBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Impacto y Alcance
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Este proyecto contribuye al desarrollo sostenible de la comunidad,
              promoviendo la soberanía alimentaria y la conservación del medio
              ambiente a través de prácticas regenerativas y colaborativas.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
