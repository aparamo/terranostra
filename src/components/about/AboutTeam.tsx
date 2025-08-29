'use client';

import React, {useState, useRef} from 'react';
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  MotionValue
} from 'framer-motion';
import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {Leaf, Sprout, UserRoundSearch} from 'lucide-react';

// Helper Component: AnimatedTooltip
const AnimatedTooltip = ({
  items
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = {stiffness: 100, damping: 5};
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {items.map((item) => (
        <div
          className="-mr-4 relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{opacity: 0, y: 20, scale: 0.6}}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {type: 'spring', stiffness: 260, damping: 10}
                }}
                exit={{opacity: 0, y: 20, scale: 0.6}}
                style={{translateX, rotate, whiteSpace: 'nowrap'}}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-teal-900 z-50 shadow-xl px-4 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
                <div className="font-bold text-gray-100 relative z-30 text-base">
                  {item.name}
                </div>
                <div className="text-gray-300 text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-primary relative transition duration-500"
          />
        </div>
      ))}
    </div>
  );
};

// Helper Component: MagicText
interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: number[];
}

const Word: React.FC<WordProps> = ({children, progress, range}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mt-[12px] mr-1 text-3xl font-semibold">
      <span className="absolute opacity-20 text-primary">{children}</span>
      <motion.span style={{opacity}} className="text-primary">
        {children}
      </motion.span>
    </span>
  );
};

const MagicText: React.FC<{text: string}> = ({text}) => {
  const container = useRef(null);
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25']
  });
  const words = text.split(' ');

  return (
    <p
      ref={container}
      className="flex flex-wrap leading-[0.5] p-4 justify-center"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

// Main Team Component
interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  skills: string[];
  responsibilities: string[];
  bio: string | string[];
}

const AboutTeam = () => {
  const t = useTranslations('AboutPage');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Carolina Lara Visconti',
      designation: t('founder'),
      image: '/CLV3.jpg',
      bio: [t('caroBio1'), t('caroBio2'), t('caroBio3')],
      skills: [
        t('skillEcology'),
        t('skillRestoration'),
        t('skillPermaculture'),
        t('skillBiodiversity')
      ],
      responsibilities: [
        t('respVision'),
        t('respDesign'),
        t('respClientRelations'),
        t('respResearch')
      ]
    },
    {
      id: 2,
      name: 'Adrián Páramo Turpin',
      designation: t('ecologist'),
      image: '/Adri3-md-rect.jpg',
      bio: [t('adriBio1'), t('adriBio2'), t('adriBio3')],
      skills: [
        t('skillSustainability'),
        t('skillAgroecology'),
        t('skillPermaculture')
      ],
      responsibilities: [
        t('respInnovation'),
        t('respTech'),
        t('respLeadership'),
        t('respMetrics')
      ]
    }
  ];

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(selectedMember?.id === member.id ? null : member);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 text-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(180, 83, 9, 0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(146, 64, 14, 0.1) 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-primary"
        animate={{y: [0, -20, 0], rotate: [0, 5, 0]}}
        transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
      >
        <Leaf size={32} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-16 text-primary"
        animate={{y: [0, 15, 0], rotate: [0, -5, 0]}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      >
        <Sprout size={28} />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header Section */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-light text-primary mb-6 tracking-wide">
            {t('teamHeaderTitle')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-8 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('teamHeaderSubtitle')}
          </p>
        </motion.div>

        {/* Team Members Section */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex justify-center items-center mb-12"
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.6, delay: 0.3}}
          >
            <AnimatedTooltip items={teamMembers} />
          </motion.div>

          {/* Interactive Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="relative cursor-pointer"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: index * 0.2}}
                onClick={() => handleMemberClick(member)}
                onMouseEnter={() => setHoveredCard(member.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <AnimatePresence>
                  {hoveredCard === member.id &&
                    selectedMember?.id !== member.id && (
                      <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.2}}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black/60 text-white text-sm font-semibold py-2 px-4 rounded-lg pointer-events-none"
                      >
                        <UserRoundSearch size={20} />
                      </motion.div>
                    )}
                </AnimatePresence>
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-card-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 font-medium">
                      {member.designation}
                    </p>

                    <AnimatePresence>
                      {selectedMember?.id === member.id && (
                        <motion.div
                          initial={{opacity: 0, height: 0}}
                          animate={{opacity: 1, height: 'auto'}}
                          exit={{opacity: 0, height: 0}}
                          transition={{duration: 0.4}}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-border pt-4 mt-4">
                            {Array.isArray(member.bio) ? (
                              member.bio.map((paragraph, idx) => (
                                <p
                                  key={idx}
                                  className="text-card-foreground mb-4 leading-relaxed last:mb-0"
                                >
                                  {paragraph}
                                </p>
                              ))
                            ) : (
                              <p className="text-card-foreground mb-4 leading-relaxed">
                                {member.bio}
                              </p>
                            )}
                            <div className="mb-4">
                              <h4 className="font-semibold text-card-foreground mb-2">
                                {t('skillsTitle')}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {member.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border-border"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-card-foreground mb-2">
                                {t('responsibilitiesTitle')}
                              </h4>
                              <ul className="space-y-1">
                                {member.responsibilities.map((resp, idx) => (
                                  <li
                                    key={idx}
                                    className="text-muted-foreground text-sm flex items-center"
                                  >
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Philosophy Section with Magic Text */}
          <motion.div
            className="text-center py-16"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, delay: 0.6}}
          >
            <h2 className="text-3xl font-light text-primary mb-8">
              {t('philosophyTitle')}
            </h2>
            <div className="max-w-4xl mx-auto">
              <MagicText text={t('philosophyText')} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;
