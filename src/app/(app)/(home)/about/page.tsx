'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';
import AboutHero from '@/components/about/AboutHero';
import AboutTeam from '@/components/about/AboutTeam';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <div className="relative bg-gray-50/90 dark:bg-teal-900">
      {/* Hero Section */}
      {/* <div className="relative isolate overflow-hidden py-24 sm:py-32">
        <Image
          src="/herobg.jpg"
          alt="Nandá Team"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#060e10] to-[#323131] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              {t('description')}
            </p>
          </div>
        </div>
      </div> */}
      <AboutHero />

      {/* Our Mission Section */}
      <div className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              {t('ourMissionTitle')}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('ourMissionSubtitle')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('ourMissionDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="overflow-hidden bg-white dark:bg-teal-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-primary">
                  {t('ourStoryTitle')}
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  {t('ourStorySubtitle')}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  {t('ourStoryDescription')}
                </p>
              </div>
            </div>
            <Image
              src="/equipo2-lg-sq-flip.jpg"
              alt="Our Story"
              className="w-[48rem] max-w-3xl rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-mr-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <AboutTeam />
      {/* <div className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              {t('ourTeamTitle')}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('ourTeamSubtitle')}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-2">
            {teamMembers.map((person, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image
                  className="mx-auto h-48 w-48 rounded-full"
                  src={person.imageUrl}
                  alt={person.name}
                  width={192}
                  height={192}
                />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                  {person.name}
                </h3>
                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {person.role}
                </p>
                 <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {person.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
