import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import JobHeader from './JobHeader';
import JobDescription from './JobDescription';
import JobResponsibilities from './JobResponsibilities';
import JobQualifications from './JobQualifications';
import type { Job } from '../../types/job';

interface JobDetailsCardProps {
  job: Job;
  isLoading?: boolean;
}

export default function JobDetailsCard({ job, isLoading = false }: JobDetailsCardProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center space-y-4 text-gray-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm font-medium">Loading job details...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-200"
    >
      <JobHeader job={job} />
      <div className="space-y-6">
        <JobDescription description={job.description} />
        <JobResponsibilities responsibilities={job.custom_attributes.responsibilities} />
        <JobQualifications 
          minimum={job.custom_attributes.minimum_qualifications}
          preferred={job.custom_attributes.preferred_qualifications}
        />
      </div>
    </motion.div>
  );
}