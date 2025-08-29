'use client';

import {useTranslations} from 'next-intl';
import ProjectCard from '@/components/projects/ProjectCard';
import {motion} from 'framer-motion';
import ProjectsHero from '@/components/projects/ProjectsHero';
import DesignPhilosophyDialog from '@/components/projects/DesignPhilosophyDialog';
import {Sun, Mountain, Flower} from 'lucide-react';

export default function ProjectsPage() {
  const t = useTranslations('ProjectsPage');

  const projects = [
    {
      title: t('project6Title'),
      description: t('project6Description'),
      imageUrl: '/huerto5-lg.jpg',
      socioenvironmentalBenefits: [
        t('socioenvironmentalBenefits.soilFertility'),
        t('socioenvironmentalBenefits.reduceChemicalFertilizers'),
        t('socioenvironmentalBenefits.promoteLocalBiodiversity'),
        t('socioenvironmentalBenefits.strengthenFoodSovereignty')
      ],
      projectTypes: [
        t('projectTypes.familyGardens'),
        t('projectTypes.smallFarms'),
        t('projectTypes.communitySpaces')
      ],
      detailedDescription: t('detailedDescriptions.regenerativeHuerto')
    },
    {
      title: t('project3Title'),
      description: t('project3Description'),
      imageUrl: '/jardinpolinizador1-lg.jpg',
      socioenvironmentalBenefits: [
        t('socioenvironmentalBenefits.increasePollinators'),
        t('socioenvironmentalBenefits.improveFruitProduction'),
        t('socioenvironmentalBenefits.educateBiodiversity'),
        t('socioenvironmentalBenefits.createNaturalBeauty')
      ],
      projectTypes: [
        t('projectTypes.publicSpaces'),
        t('projectTypes.communitySpaces'),
        t('projectTypes.familyGardens')
      ],
      detailedDescription: t('detailedDescriptions.pollinatorHabitat')
    },
    {
      title: t('project1Title'),
      description: t('project1Description'),
      imageUrl: '/foodforest1-lg.jpg',
      socioenvironmentalBenefits: [
        t('socioenvironmentalBenefits.createSelfSustainingEcosystems'),
        t('socioenvironmentalBenefits.provideYearRoundFood'),
        t('socioenvironmentalBenefits.restoreNaturalHabitats'),
        t('socioenvironmentalBenefits.reduceSoilErosion')
      ],
      projectTypes: [
        t('projectTypes.smallFarms'),
        t('projectTypes.communitySpaces'),
        t('projectTypes.educationalProjects')
      ],
      detailedDescription: t('detailedDescriptions.foodForest')
    },
    {
      title: t('project2Title'),
      description: t('project2Description'),
      imageUrl: '/huertomedicinal1-lg.jpg',
      socioenvironmentalBenefits: [
        t('socioenvironmentalBenefits.preserveTraditionalMedicine'),
        t('socioenvironmentalBenefits.reduceHealthCosts'),
        t('socioenvironmentalBenefits.promoteMedicinalSelfSufficiency'),
        t('socioenvironmentalBenefits.conserveNativeSpecies')
      ],
      projectTypes: [
        t('projectTypes.familyGardens'),
        t('projectTypes.communitySpaces'),
        t('projectTypes.educationalProjects')
      ],
      detailedDescription: t('detailedDescriptions.medicinalGarden')
    },
    {
      title: t('project4Title'),
      description: t('project4Description'),
      imageUrl: '/composta3-lg.jpg',
      socioenvironmentalBenefits: [
        t('socioenvironmentalBenefits.reduceOrganicWaste'),
        t('socioenvironmentalBenefits.createNaturalFertilizer'),
        t('socioenvironmentalBenefits.improveSoilStructure'),
        t('socioenvironmentalBenefits.reduceMethaneEmissions')
      ],
      projectTypes: [
        t('projectTypes.familyGardens'),
        t('projectTypes.smallFarms'),
        t('projectTypes.communitySpaces')
      ],
      detailedDescription: t('detailedDescriptions.compostingSystem')
    },
    {
      title: t('project5Title'),
      description: t('project5Description'),
      imageUrl: '/germina1-lg.jpg',
      socioenvironmentalBenefits: [
        t('socioenvironmentalBenefits.preserveLocalSeedVarieties'),
        t('socioenvironmentalBenefits.reduceProductionCosts'),
        t('socioenvironmentalBenefits.strengthenFoodAutonomy'),
        t('socioenvironmentalBenefits.maintainGeneticDiversity')
      ],
      projectTypes: [
        t('projectTypes.smallFarms'),
        t('projectTypes.educationalProjects'),
        t('projectTypes.communityInitiatives')
      ],
      detailedDescription: t('detailedDescriptions.nurseryReproduction')
    }
  ];

  return (
    <>
      <ProjectsHero />

      {/* Design Philosophy Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-background via-muted to-muted/50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.2}}
              className="text-4xl md:text-5xl font-light text-foreground mb-6"
            >
              {t('designPhilosophyTitle')}
            </motion.h2>
            <motion.div
              initial={{width: 0}}
              whileInView={{width: '100px'}}
              viewport={{once: true}}
              transition={{duration: 0.8, delay: 0.4}}
              className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 mx-auto rounded-full"
            />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Main Text */}
              <motion.div
                initial={{opacity: 0, x: -50}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 0.8, delay: 0.3}}
                className="space-y-6"
              >
                <motion.p
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.6, delay: 0.5}}
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                >
                  {t('designPhilosophyDescription1')}
                </motion.p>

                <motion.p
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.6, delay: 0.7}}
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                >
                  {t('designPhilosophyDescription2')}
                </motion.p>
              </motion.div>

              {/* Right Column - Animated Icons */}
              <motion.div
                initial={{opacity: 0, x: 50}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 0.8, delay: 0.5}}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-8">
                  {/* Permacultura */}
                  <DesignPhilosophyDialog type="permacultura">
                    <motion.div
                      initial={{opacity: 0, scale: 0.5}}
                      whileInView={{opacity: 1, scale: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 0.8}}
                      className="text-center group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{scale: 1.1, rotate: 5}}
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                      >
                        <Flower className="w-10 h-10 text-primary-foreground" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {t('permacultura')}
                      </h3>
                    </motion.div>
                  </DesignPhilosophyDialog>

                  {/* Paisajismo Naturalista */}
                  <DesignPhilosophyDialog type="paisajismo">
                    <motion.div
                      initial={{opacity: 0, scale: 0.5}}
                      whileInView={{opacity: 1, scale: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 1.0}}
                      className="text-center group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{scale: 1.1, rotate: -5}}
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/80 to-primary/60 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                      >
                        <Mountain className="w-10 h-10 text-primary-foreground" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {t('paisajismoNaturalista')}
                      </h3>
                    </motion.div>
                  </DesignPhilosophyDialog>

                  {/* Agroecología */}
                  <DesignPhilosophyDialog type="agroecologia">
                    <motion.div
                      initial={{opacity: 0, scale: 0.5}}
                      whileInView={{opacity: 1, scale: 1}}
                      viewport={{once: true}}
                      transition={{duration: 0.6, delay: 1.2}}
                      className="text-center group cursor-pointer col-span-2"
                    >
                      <motion.div
                        whileHover={{scale: 1.1, rotate: 5}}
                        className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/60 to-primary/40 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                      >
                        <Sun className="w-10 h-10 text-primary-foreground" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {t('agroecologia')}
                      </h3>
                    </motion.div>
                  </DesignPhilosophyDialog>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-emerald-950 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.2}}
              className="text-4xl md:text-5xl font-light text-foreground mb-6"
            >
              {t('projectTypesTitle')}
            </motion.h2>
            <motion.div
              initial={{width: 0}}
              whileInView={{width: '100px'}}
              viewport={{once: true}}
              transition={{duration: 0.8, delay: 0.4}}
              className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 mx-auto rounded-full"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: index * 0.1}}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  socioenvironmentalBenefits={
                    project.socioenvironmentalBenefits
                  }
                  projectTypes={project.projectTypes}
                  detailedDescription={project.detailedDescription}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
