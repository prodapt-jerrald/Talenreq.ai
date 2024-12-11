import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: string[] | string | any;
}

interface JobSectionListProps {
  sections: Section[];
  expandedSections: Record<string, boolean>;
  onToggleSection: (sectionId: string) => void;
}

export default function JobSectionList({ sections, expandedSections, onToggleSection }: JobSectionListProps) {
  return (
    <div className="space-y-6">
      {sections.map(section => (
        <motion.div
          key={section.id}
          initial={false}
          animate={{ 
            backgroundColor: expandedSections[section.id] ? 'rgb(249, 250, 251)' : 'white',
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15
          }}
          className="border border-gray-200/50 rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-300"
        >
          <button
            onClick={() => onToggleSection(section.id)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
          >
            <span className="font-semibold text-gray-900">{section.title}</span>
            <motion.div
              animate={{ rotate: expandedSections[section.id] ? 180 : 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.5
              }}
            >
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {expandedSections[section.id] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto', 
                  opacity: 1,
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      mass: 0.3
                    },
                    opacity: {
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      mass: 0.3
                    },
                    opacity: {
                      duration: 0.2,
                      ease: [0.4, 0, 1, 1]
                    }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.div 
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  exit={{ y: -10 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                  className="px-5 pb-5"
                >
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-3">
                      {section.content.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 150,
                            damping: 15
                          }}
                          className="text-gray-600 flex items-start group"
                        >
                          <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                            <motion.span
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                              }}
                            />
                          </span>
                          <span className="text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed pl-5">
                      {section.content}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}