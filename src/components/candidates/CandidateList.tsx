import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Star, ChevronRight, Loader2 } from 'lucide-react';
import Button from '../ui/Button';

interface Candidate {
  id: string;
  name: string;
  title: string;
  matchScore: number;
  avatarUrl?: string;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    matchScore: 95
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Technical Lead',
    matchScore: 88
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Software Architect',
    matchScore: 92
  }
];

interface CandidateListProps {
  isLoading?: boolean;
}

export default function CandidateList({ isLoading = false }: CandidateListProps) {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedCandidates(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-center h-48">
          <div className="flex flex-col items-center space-y-4 text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm font-medium">Finding best matches...</p>
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
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Star className="h-5 w-5 text-primary mr-2" />
        AI-Matched Candidates
      </h3>

      <div className="space-y-4">
        {mockCandidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group p-4 rounded-2xl border transition-all duration-200 ${
              selectedCandidates.includes(candidate.id)
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/20 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-colors ${
                  selectedCandidates.includes(candidate.id)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }`}>
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                  <p className="text-sm text-gray-600">{candidate.title}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`text-sm font-medium ${
                  selectedCandidates.includes(candidate.id)
                    ? 'text-primary'
                    : 'text-gray-600'
                }`}>
                  {candidate.matchScore}% match
                </div>
                <Button
                  variant={selectedCandidates.includes(candidate.id) ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => toggleSelection(candidate.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}