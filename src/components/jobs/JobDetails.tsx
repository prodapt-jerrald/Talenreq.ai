import { motion } from 'framer-motion';
import { MapPin, Building, BriefcaseIcon, GraduationCap, Clock } from 'lucide-react';
import type { Job,Location } from '../../types/job';
import { useSession } from '../../contexts/SessionContext';

interface JobDetailsProps {
  job: Job;
}
interface LocationDetailsProps {
  location: Location;
}

export default function JobDetails({ job }: JobDetailsProps,{location}:LocationDetailsProps) {
  const { jobResponse } = useSession();
  console.log(jobResponse,'sailu');
  console.log(location,"jerrald")
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
        <div className="mt-2 flex items-center text-gray-600">
          <Building className="h-5 w-5 mr-2" />
          <span>{job.company_display_name}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{job?.addresses[0]}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2" />
          <span>{job.custom_attributes.experience_level[0]}</span>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {job.custom_attributes.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Qualifications</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">Minimum Requirements</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {job.custom_attributes.minimum_qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">Preferred Qualifications</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {job.custom_attributes.preferred_qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}