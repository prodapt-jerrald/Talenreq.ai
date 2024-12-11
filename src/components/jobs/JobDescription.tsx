import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface JobDescriptionProps {
  description: string;
}

export default function JobDescription({ description }: JobDescriptionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Briefcase className="h-5 w-5 mr-3 text-gray-400" />
        About the Role
      </h3>
      <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </motion.section>
  );
}