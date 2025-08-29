'use client';

import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useTranslations} from 'next-intl';
import {Mail, Sprout, TreePine, CheckCircle, Loader2} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';

const emailSubscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
  message: z.string().optional(),
  newsletter: z.boolean()
});

type EmailSubscriptionFormData = z.infer<typeof emailSubscriptionSchema>;

interface EmailSubscriptionDialogProps {
  trigger: React.ReactNode;
  productType: 'seeds' | 'plants';
}

export default function EmailSubscriptionDialog({
  trigger,
  productType
}: EmailSubscriptionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations('EmailSubscription');

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
    reset
  } = useForm<EmailSubscriptionFormData>({
    resolver: zodResolver(emailSubscriptionSchema),
    defaultValues: {
      interests: [],
      newsletter: false
    }
  });

  const watchedInterests = watch('interests');

  const handleInterestToggle = (interest: string) => {
    const currentInterests = watchedInterests || [];
    if (currentInterests.includes(interest)) {
      setValue(
        'interests',
        currentInterests.filter((i) => i !== interest)
      );
    } else {
      setValue('interests', [...currentInterests, interest]);
    }
  };

  const onSubmit = async (data: EmailSubscriptionFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Integrate with Payload CMS or your backend
      console.log('Subscription data:', data);

      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        reset();
      }, 2000);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests =
    productType === 'seeds'
      ? [
          'Organic Seeds',
          'Heirloom Varieties',
          'Medicinal Herbs',
          'Vegetables',
          'Flowers'
        ]
      : [
          'Native Plants',
          'Ecological Restoration',
          'Garden Plants',
          'Indoor Plants',
          'Trees & Shrubs'
        ];

  const icon = productType === 'seeds' ? Sprout : TreePine;
  const IconComponent = icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.3}}
            >
              <DialogHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('title')}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300">
                  {t('description')}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t('form.name')} *
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className="mt-1"
                      placeholder={t('form.namePlaceholder')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t('form.email')} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="mt-1"
                      placeholder={t('form.emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('form.interests')} *
                    </Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {interests.map((interest) => (
                        <div
                          key={interest}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={interest}
                            checked={watchedInterests?.includes(interest)}
                            onCheckedChange={() =>
                              handleInterestToggle(interest)
                            }
                          />
                          <Label
                            htmlFor={interest}
                            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                          >
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.interests.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      {t('form.message')}
                    </Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      className="mt-1"
                      placeholder={t('form.messagePlaceholder')}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" {...register('newsletter')} />
                    <Label
                      htmlFor="newsletter"
                      className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                    >
                      {t('form.newsletter')}
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('form.submitting')}
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      {t('form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 0.3}}
              className="text-center py-8"
            >
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('success.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('success.message')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
