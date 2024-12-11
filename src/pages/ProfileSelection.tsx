import {useEffect, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronLeft, Users, MapPin, Briefcase, Sparkles, X, Clock, Home } from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import ChatWindow from '../components/chat/ChatWindow';
import JobSectionList from '../components/jobs/JobSectionList';
import RecommendedTalents from '../components/jobs/RecommendedTalents';
import UserProfile from '../components/layout/UserProfile';
import type { Job } from '../types/job';
import logo from '../assets/logo/talentreq_white@4x.png';
import Button from '../components/ui/Button';
import { jobsApi } from '../api/client';
import { useSession } from '../contexts/SessionContext';


interface ProfileSelectionProps {
  job: Job;
}
export default function ProfileSelection() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    description: true,
    responsibilities: true,
    minimum_qualifications: true,
    preferred_qualifications: true
  });
  const [showChat, setShowChat] = useState(false);
  const { updateSessionId } = useSession();

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      try {
        setIsLoading(true);
        const jobData = await jobsApi.getJobById(jobId);
        updateSessionId(jobData?.session)
        setJob(jobData);
        console.log('jobData', jobData);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (isLoading || !job) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
  }


  const sections = [
    {
      id: 'description',
      title: 'Description',
      content: job.description.split('\n').map((line, index) => <p key={index}>{line}</p>)
    },
    {
      id: 'responsibilities',
      title: 'Key Responsibilities',
      content: (
          <div>
            <ul>
              {job.custom_attributes.responsibilities[0].split('\n').map((item, index) => (
                  <li key={index} className="flex items-start group">
              <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="block h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-primary-dark transition-colors"
                />
              </span>
                    <span className="text-sm ml-3 leading-relaxed group-hover:text-gray-900 transition-colors">
                {item}
              </span>
                  </li>
              ))}
            </ul>
          </div>
      )
    },
    {
      id: 'minimum_qualifications',
      title: 'Minimum Qualifications',
      content: (
          <div>
            <ul>
              {job.custom_attributes.minimum_qualifications[0].split('\n').map((item, index) => (
                  <li key={index} className="flex items-start group">
              <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="block h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-primary-dark transition-colors"
                />
              </span>
                    <span className="text-sm ml-3 leading-relaxed group-hover:text-gray-900 transition-colors">
                {item}
              </span>
                  </li>
              ))}
            </ul>
          </div>
      )
    },
    {
      id: 'preferred_qualifications',
      title: 'Preferred Qualifications',
      content: (
          <div>
            <ul>
              {job.custom_attributes.preferred_qualifications[0].split('\n').map((item, index) => (
                  <li key={index} className="flex items-start group">
              <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    className="block h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-primary-dark transition-colors"
                />
              </span>
                    <span className="text-sm ml-3 leading-relaxed group-hover:text-gray-900 transition-colors">
                {item}
              </span>
                  </li>
              ))}
            </ul>
          </div>
      )
    }
  ];

  const handleToggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const talents = [
    {
      id: 'JV',
      name: 'Joe Vanguard',
      initials: 'JV',
      education: 'PhD in Computer Science',
      experience: '10 years'
    },
    {
      id: 'SK',
      name: 'Sophia Kaplan',
      initials: 'SK',
      education: 'MS in Software Engineering',
      experience: '8 years'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-primary sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <img src={logo} alt="TalentReq" className="h-16"/>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UserProfile />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 py-12">
        <div className="max-w-[1920px] mx-auto px-8">
          <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center">
                  <Users className="h-7 w-7 text-white"/>
                </div>
                <h1 className="font-display text-7xl font-bold text-gray-900">
                  Screening
                </h1>
              </div>
              <Button
                  onClick={() => navigate('/jobs')}
                  variant="secondary"
                  size="lg"
                  icon={<Home className="h-5 w-5"/>}
              >
                Back to Jobs
              </Button>
            </div>
            <p className="text-lg text-gray-500 font-display max-w-7xl">
              Find the perfect match for <span
                className="text-gray-900 font-semibold">{job.title}</span> at {job.company_display_name}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1920px] mx-auto px-8 py-8">
        <motion.div
            layout
            className="grid gap-6"
            style={{
              gridTemplateColumns: showChat ? '1fr 1fr 1fr' : '1fr 1fr'
            }}
        >
          {/* Job Details */}
          <motion.div
              layout
              className="bg-white rounded-3xl p-6 shadow-sm h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-gray-600"/>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-500">{job.company_display_name}</p>
                </div>
              </div>
            </div>

            {/* Location and Experience Level */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div
                  whileHover={{scale: 1.02}}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200/50 hover:border-primary/20 hover:bg-gray-100/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    {/* <p className="text-sm font-medium text-gray-900">{job.addresses[0]}</p> */}
                    <p className="text-sm font-medium text-gray-900">{job.addresses[0]}</p>
                    <p className="text-sm font-medium text-gray-900">
                  
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                  whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200/50 hover:border-primary/20 hover:bg-gray-100/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Experience Level</p>
                    <p className="text-sm font-medium text-gray-900">{job.custom_attributes.experience_level[0]}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <JobSectionList
              sections={sections}
              expandedSections={expandedSections}
              onToggleSection={handleToggleSection}
            />
          </motion.div>

          {/* Recommended Talents */}
          <motion.div
            layout
            className="bg-white rounded-3xl p-6 shadow-sm h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar"
          >
            <RecommendedTalents talents={talents} />
          </motion.div>

          {/* Chat */}
          <AnimatePresence mode="wait">
            {showChat ? (
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative h-[calc(100vh-20rem)]"
              >
                <button
                  onClick={() => setShowChat(false)}
                  className="absolute -top-3 -right-3 h-8 w-8 bg-white rounded-full shadow-lg z-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
                <ChatWindow />
              </motion.div>
            ) : (
              <motion.button
                layout
                onClick={() => setShowChat(true)}
                className="fixed bottom-8 right-8 bg-primary text-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Ask TalentReq.AI</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}