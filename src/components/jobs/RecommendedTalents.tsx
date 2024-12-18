import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Trophy, Clock } from 'lucide-react';
import CandidateModal from '../candidates/CandidateModal';
// import { mockCandidates } from '../../data/mockCandidates';
import type { Candidate } from '../../types/candidate';
import { useSession } from '../../contexts/SessionContext';

// Define the Talent type
interface Talent {
  employee_id: number;
  employee_name: string;
  employee_department: string;
  skills: string;
  experience: number;
  education: string;
  role: string;
  skill_area: string;
  certifications: string;
  location: string;
  professional_summary: string;
  email_id: string;
  current_availability: string;
  match_score: number;
}

interface RecommendedTalentsProps {
  talents: Array<{
    id: string;
    name: string;
    initials: string;
    education: string;
    experience: string;
  }>;
}

export default function RecommendedTalents({ talents }: RecommendedTalentsProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleViewCandidate = (talentId: string) => {
    const candidate = jobResponse.talents.Message.find((c:any) => c.employee_id == talentId);
    if (candidate) {
      setSelectedCandidate(candidate);
      console.log("auto",candidate)
    }
  };
  const { jobResponse } = useSession();

  useEffect(()=>{
    console.log("sailesh", jobResponse.talents)
  })

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Recommended Talents</h4>
              <p className="text-sm text-gray-500">{jobResponse.talents.Message.length} Best Matches</p>
            </div>
          </div>
        </div>

        {/* Talents List */}
        <div className="space-y-3">
          {jobResponse.talents.Message.map((talent: Talent, index: number) => (
            <motion.div
              key={talent.employee_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleViewCandidate(talent.employee_id.toString())}
              className="group relative bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-12 w-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-medium group-hover:scale-105 transition-transform">
                      {talent.employee_name.charAt(0)}
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center"
                    >
                      <GraduationCap className="h-3 w-3 text-white" />
                    </motion.div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {talent.employee_name}
                    </h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-primary font-medium px-2 py-0.5 bg-primary/10 rounded-full">
                        {talent.education}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {talent.experience} years
                       
                      </span>
                    </div>
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {talent.skills.split(', ').map((skill: string, skillIndex: number) => (
                  <span
                    key={skillIndex}
                    className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-100"
                  >
                    {skill}
                  </span>
                ))}
            <span
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 10,
    color: "#10B981",
    backgroundColor: "#DCFCE7",
    padding: "0.125rem 0.5rem",
    borderRadius: "9999px"
  }}
  className="text-xs font-medium"
>
  Match Score:

  <span style={{fontSize:10}}> {talent.match_score}</span>
</span>
 
                    
              </div>
     
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CandidateModal
        candidate={selectedCandidate!}
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </>
  );
}
