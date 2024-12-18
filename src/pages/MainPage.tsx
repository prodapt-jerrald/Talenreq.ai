import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Building, Briefcase } from 'lucide-react';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import CreateJobModal from '../components/jobs/CreateJobModal';
import UserProfile from '../components/layout/UserProfile';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import type { Job } from '../types/job';
import logo from '../assets/logo/talentreq_white@4x.png';
import { useJobs } from '../hooks/useJobs';
import { useSession } from '../contexts/SessionContext';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ITEMS_PER_PAGE = 6;

export default function MainPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, isLoading, error, searchJobs, refreshJobs } = useJobs();
  const { handleJobSelect } = useSession();

  const handleCreateJob = (data: any) => {
    console.log('Job created:', data);
    setIsCreateModalOpen(false);
    refreshJobs(); // Refresh the job list after creating a new job
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    searchJobs(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading jobs: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-primary hover:text-primary-dark"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm)
  );

  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const displayRange = `${startIndex + 1}-${Math.min(startIndex + ITEMS_PER_PAGE, totalJobs)}`;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-primary sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="TalentReq" className="h-16" />
            </div>
            <UserProfile />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Title and Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center">
              <Briefcase className="h-7 w-7 text-white" />
            </div>
            <h2 className="font-display text-7xl font-bold text-gray-900">
              Opportunities
            </h2>
          </div>
          <p className="text-lg text-gray-500 font-display">
            Discover your next career move among <span className="text-gray-900 font-semibold">{totalJobs}</span> open positions
          </p>
        </motion.div>

        {/* Search and Add Job */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-gray-200/50">
            <div className="flex-1 max-w-7xl">
              <Input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                icon={<Search className="h-5 w-5" />}
                className="w-full text-base border-0 shadow-none focus:ring-0"
              />
            </div>
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-100">
              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="h-4 w-4" />}
                onClick={() => setIsCreateModalOpen(true)}
                className="shadow-lg shadow-primary/20"
              >
                Add Job
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-72 flex-shrink-0">
          <div
  className="bg-white rounded-[32px] p-6 shadow-sm sticky border border-gray-200/50"
  style={{ top: '8rem' }}
>
              <JobFilters onFilterChange={setFilters} />
            </div>
          </div>

          {/* Job Grid */}
          <div className="flex-1">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            >
              {paginatedJobs.map((job) => (
                <JobCard
                  key={job.requisition_id}
                  job={job}
                  onSelect={handleJobSelect}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className="text-center mt-6 text-sm text-gray-500">
              Showing {displayRange} of {totalJobs} opportunities
            </div>
          </div>
        </div>
      </div>

      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateJob}
      />
    </div>
  );
}
