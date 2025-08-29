'use client';

import {useState, ReactNode} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronDown} from 'lucide-react';
import {cn} from '@/lib/utils';

interface ServiceItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface ServiceCategoryProps {
  id: string;
  title: string;
  icon: ReactNode;
  color: string;
  items: ServiceItem[];
  isInitiallyOpen?: boolean;
}

export const ServiceCategory = ({
  id,
  title,
  icon,
  color,
  items,
  isInitiallyOpen = false
}: ServiceCategoryProps) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  const variants = {
    open: {opacity: 1, height: 'auto'},
    closed: {opacity: 0, height: 0}
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 bg-white dark:bg-cyan-950/70 cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`service-content-${id}`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">{icon}</div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-amber-50/80 text-left">
            {title}
          </h3>
        </div>
        <motion.div
          animate={{rotate: isOpen ? 180 : 0}}
          transition={{duration: 0.3}}
        >
          <ChevronDown className="h-6 w-6 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`service-content-${id}`}
            key="content"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98]}}
            className="bg-gray-50 dark:bg-cyan-950/30"
          >
            <div className="p-6 space-y-12">
              {items.map((item, index) => (
                <div key={index} className="flex">
                  <div
                    className={cn(
                      'flex-shrink-0 w-1.5 rounded-full mr-4',
                      color
                    )}
                  ></div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">{item.icon}</div>
                      <h4 className="font-semibold text-lg text-gray-800 dark:text-amber-50/80 ">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-amber-50/60 mt-1 pl-9">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
