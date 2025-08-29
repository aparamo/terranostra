'use client';

import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Leaf, Sprout, BookOpen, Hammer} from 'lucide-react';
import {useState} from 'react';

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    {id: 'design', label: t('services.design'), icon: Leaf},
    {id: 'implementation', label: t('services.implementation'), icon: Hammer},
    {id: 'courses', label: t('services.courses'), icon: BookOpen},
    {id: 'products', label: t('services.products'), icon: Sprout}
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    }
  };

  return (
    <div className="min-h-screen  from-slate-950 via-emerald-950 to-teal-950 px-4 flex items-center justify-center ">
      <Card className="w-full max-w-4xl shadow-2xl border-0 bg-background/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
            <Leaf className="w-8 h-8 text-primary/80" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
            {t('title')}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-amber-50/50">
            {t('description')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-base font-medium text-primary"
              >
                {t('fullName')}
              </Label>
              <Input
                id="name"
                placeholder={t('fullNamePlaceholder')}
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-400 hover:border-green-300"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-base font-medium text-primary"
              >
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-400 hover:border-green-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-base font-medium text-primary"
              >
                {t('phone')}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t('phonePlaceholder')}
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-400 hover:border-green-300"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="location"
                className="text-base font-medium text-primary"
              >
                {t('location')}
              </Label>
              <Input
                id="location"
                placeholder={t('locationPlaceholder')}
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-400 hover:border-green-300"
              />
            </div>
          </div>

          {/* Services Interest */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-primary">
              {t('servicesInterest')}
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-400 hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-secondary transition-all duration-200"
                  >
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) =>
                        handleServiceChange(service.id, checked as boolean)
                      }
                      className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Icon className="w-5 h-5 text-green-600" />
                    <Label
                      htmlFor={service.id}
                      className="text-base font-medium cursor-pointer flex-1"
                    >
                      {service.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Timeline */}
          <div className="space-y-2">
            <Label
              htmlFor="timeline"
              className="text-base font-medium text-primary"
            >
              {t('timeline')}
            </Label>
            <Select>
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-400 hover:border-green-300">
                <SelectValue placeholder={t('timelinePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">
                  {t('timelineOptions.asap')}
                </SelectItem>
                <SelectItem value="1-3months">
                  {t('timelineOptions.oneToThreeMonths')}
                </SelectItem>
                <SelectItem value="3-6months">
                  {t('timelineOptions.threeToSixMonths')}
                </SelectItem>
                <SelectItem value="6-12months">
                  {t('timelineOptions.sixToTwelveMonths')}
                </SelectItem>
                <SelectItem value="planning">
                  {t('timelineOptions.planning')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Needs Description */}
          <div className="space-y-2">
            <Label
              htmlFor="needs"
              className="text-base font-medium text-primary"
            >
              {t('needsTitle')}
            </Label>
            <Textarea
              id="needs"
              placeholder={t('needsPlaceholder')}
              className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-400 hover:border-green-300 resize-none"
            />
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <Label
              htmlFor="budget"
              className="text-base font-medium text-primary"
            >
              {t('budget')}
            </Label>
            <Select>
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-400 hover:border-green-300">
                <SelectValue placeholder={t('budgetPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-1k">
                  {t('budgetOptions.under1k')}
                </SelectItem>
                <SelectItem value="1k-5k">
                  {t('budgetOptions.oneToFiveK')}
                </SelectItem>
                <SelectItem value="5k-15k">
                  {t('budgetOptions.fiveToFifteenK')}
                </SelectItem>
                <SelectItem value="15k-50k">
                  {t('budgetOptions.fifteenToFiftyK')}
                </SelectItem>
                <SelectItem value="50k-plus">
                  {t('budgetOptions.fiftyKPlus')}
                </SelectItem>
                <SelectItem value="discuss">
                  {t('budgetOptions.discuss')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full bg-gradient-to-r from-emarld-800/80 to-emerald-900/80 hover:from-cyan-950/70 hover:to-emerald-700 text-white font-semibold px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 lg:text-lg py-8 dark:border-cyan-100/40"
            size="lg"
          >
            <Sprout
              className="w-8 h-8 mr-2 lg:w-10 lg:h-10"
              width={32}
              height={32}
            />
            {t('submit')}
          </Button>

          <p className="text-center text-base text-gray-500 lg:text-lg">
            {t('responseMessage')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
