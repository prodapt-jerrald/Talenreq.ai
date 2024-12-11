import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface JobResponsibilitiesProps {
  responsibilities: string[];
}

export default function JobResponsibilities({ responsibilities }: JobResponsibilitiesProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Target className="h-5 w-5 mr-3 text-gray-400" />
        Key Responsibilities
      </h3>
      <div className="space-y-4">
        {responsibilities.map((resp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start"
          >
            <span className="h-2 w-2 rounded-full bg-gray-400 mt-2 mr-4 flex-shrink-0" />
            <span className="text-base text-gray-600">{resp}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}