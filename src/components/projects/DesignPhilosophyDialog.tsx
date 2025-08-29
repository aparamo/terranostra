'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {motion} from 'framer-motion';
import {Flower, Mountain, Sun} from 'lucide-react';
import {useTranslations} from 'next-intl';

interface DesignPhilosophyDialogProps {
  type: 'permacultura' | 'paisajismo' | 'agroecologia';
  children: React.ReactNode;
}

export default function DesignPhilosophyDialog({
  type,
  children
}: DesignPhilosophyDialogProps) {
  const t = useTranslations('DesignPhilosophy');

  const getDialogContent = () => {
    switch (type) {
      case 'permacultura':
        return {
          title: t('permacultura.title'),
          icon: <Flower className="w-12 h-12 text-primary" />,
          description: t('permacultura.description'),
          content: [
            {
              title: t('permacultura.principlesTitle'),
              items: [
                t('permacultura.careOfEarth'),
                t('permacultura.careOfPeople'),
                t('permacultura.fairShare')
              ]
            },
            {
              title: t('permacultura.applicationsTitle'),
              items: [
                t('permacultura.gardenDesign'),
                t('permacultura.waterSystems'),
                t('permacultura.naturalBuilding'),
                t('permacultura.animalIntegration')
              ]
            },
            {
              title: t('permacultura.benefitsTitle'),
              items: [
                t('permacultura.foodSelfSufficiency'),
                t('permacultura.environmentalImpact'),
                t('permacultura.climateResilience'),
                t('permacultura.communityStrengthening')
              ]
            }
          ]
        };

      case 'paisajismo':
        return {
          title: t('paisajismo.title'),
          icon: <Mountain className="w-12 h-12 text-primary" />,
          description: t('paisajismo.description'),
          content: [
            {
              title: t('paisajismo.designApproachTitle'),
              items: [
                t('paisajismo.naturalPatterns'),
                t('paisajismo.nativePlants'),
                t('paisajismo.wildlifeHabitats'),
                t('paisajismo.harmoniousIntegration')
              ]
            },
            {
              title: t('paisajismo.keyElementsTitle'),
              items: [
                t('paisajismo.pollinatorGardens'),
                t('paisajismo.biodiversityCorridors'),
                t('paisajismo.naturalDrainage'),
                t('paisajismo.organicMaterials')
              ]
            },
            {
              title: t('paisajismo.environmentalImpactTitle'),
              items: [
                t('paisajismo.nativeSpecies'),
                t('paisajismo.airQuality'),
                t('paisajismo.soilErosion'),
                t('paisajismo.microclimates')
              ]
            }
          ]
        };

      case 'agroecologia':
        return {
          title: t('agroecologia.title'),
          icon: <Sun className="w-12 h-12 text-primary" />,
          description: t('agroecologia.description'),
          content: [
            {
              title: t('agroecologia.scientificPrinciplesTitle'),
              items: [
                t('agroecologia.biodiversity'),
                t('agroecologia.nutrientRecycling'),
                t('agroecologia.ecologicalInteractions'),
                t('agroecologia.systemAdaptation')
              ]
            },
            {
              title: t('agroecologia.sustainablePracticesTitle'),
              items: [
                t('agroecologia.cropRotation'),
                t('agroecologia.pestManagement'),
                t('agroecologia.soilConservation'),
                t('agroecologia.waterEfficiency')
              ]
            },
            {
              title: t('agroecologia.socioeconomicBenefitsTitle'),
              items: [
                t('agroecologia.productionStability'),
                t('agroecologia.inputCosts'),
                t('agroecologia.nutritionalQuality'),
                t('agroecologia.localMarkets')
              ]
            }
          ]
        };

      default:
        return null;
    }
  };

  const content = getDialogContent();
  if (!content) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            {content.icon}
            <div>
              <DialogTitle className="text-3xl font-bold text-primary">
                {content.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                {content.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {content.content.map((section, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: index * 0.1}}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-foreground border-b border-primary/20 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.4}}
            className="bg-primary/5 p-6 rounded-lg border border-primary/20"
          >
            <h4 className="text-lg font-semibold text-primary mb-3">
              {t('howWeApply', {approach: content.title})}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('howWeApplyDescription')}
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
