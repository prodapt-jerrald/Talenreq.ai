import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Briefcase, Clock, Globe, Code } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

interface FilterGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  options: Array<{
    label: string;
    value: string;
    count?: number;
  }>;
}

const filterGroups: FilterGroup[] = [
  {
    id: 'experience',
    label: 'Experience Level',
    icon: Briefcase,
    options: [
      { label: 'Entry Level', value: 'entry', count: 145 },
      { label: 'Mid Level', value: 'mid', count: 89 },
      { label: 'Senior', value: 'senior', count: 56 },
      { label: 'Director+', value: 'director', count: 12 },
    ],
  },
  {
    id: 'type',
    label: 'Job Type',
    icon: Clock,
    options: [
      { label: 'Full-time', value: 'fulltime', count: 234 },
      { label: 'Contract', value: 'contract', count: 67 },
      { label: 'Remote', value: 'remote', count: 89 },
    ],
  },
  {
    id: 'location',
    label: 'Location',
    icon: Globe,
    options: [
      { label: 'United States', value: 'us', count: 156 },
      { label: 'Europe', value: 'eu', count: 78 },
      { label: 'Asia Pacific', value: 'apac', count: 45 },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Code,
    options: [
      { label: 'JavaScript', value: 'js', count: 123 },
      { label: 'Python', value: 'python', count: 98 },
      { label: 'Java', value: 'java', count: 87 },
      { label: 'Cloud', value: 'cloud', count: 76 },
    ],
  },
];

interface JobFiltersProps {
  onFilterChange: (filters: Record<string, string[]>) => void;
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => 
    Object.fromEntries(filterGroups.map(group => [group.id, true]))
  );

  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  }, []);

  const handleFilterChange = useCallback((groupId: string, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[groupId] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      const newFilters = {
        ...prev,
        [groupId]: newValues,
      };

      if (newValues.length === 0) {
        delete newFilters[groupId];
      }

      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({});
  }, []);

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const hasFilters = Object.keys(selectedFilters).length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900 flex items-center">
          <Filter className="h-3.5 w-3.5 mr-2" />
          Filters
        </h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-primary hover:text-primary-dark text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {filterGroups.map((group) => (
          <div key={group.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <button
              onClick={() => toggleGroup(group.id)}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 mb-2 hover:text-primary"
            >
              <div className="flex items-center">
                <group.icon className="h-3.5 w-3.5 mr-2 text-gray-400" />
                {group.label}
              </div>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-gray-400 transition-transform duration-200",
                  expandedGroups[group.id] ? "transform rotate-180" : ""
                )}
              />
            </button>
            
            <AnimatePresence>
              {expandedGroups[group.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 overflow-hidden"
                >
                  {group.options.map((option) => {
                    const isSelected = (selectedFilters[group.id] || []).includes(option.value);
                    return (
                      <label
                        key={option.value}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 text-xs rounded-full cursor-pointer",
                          "transition-all duration-200 hover:bg-gray-50",
                          isSelected
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "text-gray-600"
                        )}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleFilterChange(group.id, option.value)}
                            className="form-checkbox h-3 w-3 rounded text-primary border-gray-300 focus:ring-primary/20"
                          />
                          <span className="ml-2">{option.label}</span>
                        </div>
                        <span className={cn(
                          "text-xs",
                          isSelected ? "text-primary/60" : "text-gray-400"
                        )}>
                          {option.count}
                        </span>
                      </label>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}