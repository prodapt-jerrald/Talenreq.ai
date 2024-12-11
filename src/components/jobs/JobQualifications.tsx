import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

interface JobQualificationsProps {
  minimum: string[];
  preferred: string[];
}

export default function JobQualifications({ minimum, preferred }: JobQualificationsProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <GraduationCap className="h-5 w-5 mr-3 text-gray-400" />
          Minimum Qualifications
        </h3>
        <div className="space-y-4">
          {minimum.map((qual, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <span className="h-2 w-2 rounded-full bg-gray-400 mt-2 mr-4 flex-shrink-0" />
              <span className="text-base text-gray-600">{qual}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Award className="h-5 w-5 mr-3 text-gray-400" />
          Preferred Qualifications
        </h3>
        <div className="space-y-4">
          {preferred.map((qual, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <span className="h-2 w-2 rounded-full bg-gray-400 mt-2 mr-4 flex-shrink-0" />
              <span className="text-base text-gray-600">{qual}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}