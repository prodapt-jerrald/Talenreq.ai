import { motion } from 'framer-motion';
import { MapPin, Building, Briefcase, Users, ChevronRight, Plus, Clock, Code2, Database, Brain } from 'lucide-react';
import type { Job } from '../../types/job';

interface JobCardProps {
  job: Job | any;
  onSelect: (job: Job) => void;
}

const getJobIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('software') || titleLower.includes('developer')) {
    return Code2;
  }
  if (titleLower.includes('data') || titleLower.includes('cloud')) {
    return Database;
  }
  if (titleLower.includes('ai') || titleLower.includes('machine learning')) {
    return Brain;
  }
  return Briefcase;
};

export default function JobCard({ job, onSelect }: JobCardProps) {
  const JobIcon = getJobIcon(job.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-gray-50 hover:bg-white rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col border border-gray-100"
    >
      {/* Company Logo and Title */}
      <div className="mb-6">
        <div className="h-12 w-12 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
          <JobIcon className="h-6 w-6 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1 leading-tight line-clamp-2">
          {job.title}
        </h3>
        {/* <p className="text-xs text-gray-500 flex items-center">
          <Building className="h-3 w-3 mr-1" />
          {job.company_display_name}
        </p> */}
      </div>

      {/* Job Details */}
      <div className="flex-1 flex flex-col">
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400" />
            <span className="truncate">{job?.addresses[0]}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Briefcase className="h-3.5 w-3.5 mr-2 text-gray-400" />
            <span className="truncate">{job.custom_attributes.experience_level[0]}</span>
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3.5 w-3.5 mr-2 text-gray-400" />
            <span>Full-time</span>
          </div>
        </div>

        {/* Candidate Matches */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full bg-gray-900 ring-2 ring-gray-50 flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-gray-50">
                    {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
              <div className="h-7 w-7 rounded-full bg-gray-100 ring-2 ring-gray-50 flex items-center justify-center">
                <Plus className="h-3 w-3 text-gray-500" />
              </div>
            </div>
            {/* <div className="flex items-center text-xs text-gray-500">
              <Users className="h-3 w-3 mr-1" />
              <span>12 matches</span>
            </div> */}
          </div>

          <button
            onClick={() => onSelect(job)}
            className="w-full group/btn flex items-center justify-center space-x-2 text-xs font-medium text-gray-700 hover:text-primary transition-colors duration-200 bg-gray-100 hover:bg-gray-200 rounded-full py-2"
          >
            <span>View Details</span>
            <ChevronRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}