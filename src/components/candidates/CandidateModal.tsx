import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, Building, GraduationCap, Clock, 
  Briefcase, Award, Code, Heart, ChevronRight 
} from 'lucide-react';
import Button from '../ui/Button';
import type { Candidate } from '../../types/candidate';

interface CandidateModalProps {
  candidate: Candidate |any;
  isOpen: boolean;
  onClose: () => void;
}

export default function CandidateModal({ candidate, isOpen, onClose }: CandidateModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 text-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="inline-block w-full max-w-4xl my-8 text-left align-middle bg-white rounded-[32px] shadow-xl relative overflow-hidden"
          >
            {/* Header Background */}
            <div className="h-48 bg-gradient-to-br from-primary-light to-primary overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')] bg-cover bg-center opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Profile Section */}
            <div className="px-8 -mt-24 relative">
              <div className="flex items-start space-x-6 mb-8">
                <div className="h-32 w-32 bg-gray-900 rounded-3xl flex items-center justify-center text-white text-4xl font-semibold shadow-xl border-4 border-white">
                  {candidate.initials}
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{candidate.employee_name}</h2>
                      <p className="text-lg text-white/90">{candidate?.role}</p>
                    </div>
                    <Button
                      variant="secondary"
                      size="lg"
                      icon={<Download className="h-5 w-5" />}
                      onClick={() => window.open(candidate?.resumeUrl, '_blank')}
                    >
                      Download Resume
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
                  <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Employee ID</p>
                    <p className="text-sm font-medium">{candidate?.employee_id}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
                  <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Education</p>
                    <p className="text-sm font-medium">{candidate?.education}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
                  <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="text-sm font-medium">{candidate?.experience}</p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8 pb-8">
                {/* Current Role */}
                <section>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                    Current Role
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{candidate?.role}</h4>
                      </div>
                      <span className="text-sm text-gray-500">{candidate?.experience}</span>
                    </div>
                    {/* <div className="space-y-2">
                      {candidate.experience.current.responsibilities.map((resp, index) => (
                        <div key={index} className="flex items-start text-sm text-gray-600">
                          <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </section>
                <section>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                    Short Description
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{candidate?.professional_summary}</h4>
                      </div>
                    </div>
                    {/* <div className="space-y-2">
                      {candidate.experience.current.responsibilities.map((resp, index) => (
                        <div key={index} className="flex items-start text-sm text-gray-600">
                          <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </section>

                {/* Previous Experience */}
                {/* <section>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Previous Experience
                  </h3>
                  <div className="space-y-4">
                    {candidate.experience.previous.map((exp, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{exp.role}</h4>
                          <p className="text-sm text-gray-500">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-500">{exp.duration}</span>
                      </div>
                    ))}
                  </div>
                </section> */}

                {/* Skills */}
                <section className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Code className="h-5 w-5 mr-2 text-primary" />
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                   
                        <span
       
                          className="px-3 py-1 bg-primary/5 text-primary text-sm rounded-lg"
                        >
                          {candidate?.skills}
                        </span>
          
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-primary" />
                      Skill Area
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {/* {candidate.skills.soft.map((skill, index) => ( */}
                        <span
                          // key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                        >
                          {candidate?.skill_area}
                        </span>
                      {/* ))} */}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}