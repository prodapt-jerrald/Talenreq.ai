import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import type { Job } from '../../types/job';
import JobCard from './JobCard';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface JobListProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
}

export default function JobList({ jobs, onJobSelect }: JobListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company_display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search jobs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="secondary" className="ml-4">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.name} job={job} onSelect={onJobSelect} />
        ))}
      </div>
    </div>
  );
}