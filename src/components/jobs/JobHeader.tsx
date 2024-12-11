import { Building, MapPin, Clock, Users, Calendar, Share2 } from 'lucide-react';
import Button from '../ui/Button';
import type { Job } from '../../types/job';
import { useEffect } from 'react';

interface JobHeaderProps {
  job: Job;
}


export default function JobHeader({ job }: JobHeaderProps) {
  useEffect(()=>{
    console.log("auto,",job)
  },[])
  return (
    <div className="flex items-start justify-between mb-8">
      <div className="flex-1">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-14 w-14 bg-gray-100 rounded-2xl flex items-center justify-center">
            <Building className="h-7 w-7 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h2>
            <p className="text-base text-gray-600">{job.company_display_name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-3 text-gray-400" />
            {/* <span className="text-sm">{job.custom_attributes.location[0]}</span> */}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-3 text-gray-400" />
            <span className="text-sm">Full-time</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-3 text-gray-400" />
            {/* <span className="text-sm">{job.custom_attributes.experience_level[0]}</span> */}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-3 text-gray-400" />
            <span className="text-sm">Posted 2 days ago</span>
          </div>
        </div>
      </div>
      <Button
        variant="secondary"
        size="sm"
        icon={<Share2 className="h-4 w-4" />}
        className="ml-6"
      >
        Share
      </Button>
    </div>
  );
}