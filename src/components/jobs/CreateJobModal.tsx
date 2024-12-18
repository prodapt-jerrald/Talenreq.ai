import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { X, Building, MapPin, Briefcase, FileText, Plus, Sparkles, Globe, Clock } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import AITextField from './AITextField';
import axios from 'axios';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const formSections = [
  {
    id: 'basic',
    title: 'Basic Information',
    icon: Building,
  },
  {
    id: 'details',
    title: 'Job Details',
    icon: Briefcase,
  },
  {
    id: 'requirements',
    title: 'Requirements',
    icon: FileText,
  },
  {
    id: 'locations',
    title: 'Locations',
    icon: Globe,
  },
];

export default function CreateJobModal({ isOpen, onClose, onSubmit }: CreateJobModalProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await axios.post('https://gcp-tarmac-844324878551.us-central1.run.app/jobs', {
        Application_URL: data.application_url,
        Job_Title: data.title,
        Job_Description: data.description,
        Primary_location: [data.location],
        preferred_locations: [data.location],
        Experience_level: [data.experience_level],
        Responsibilities: data.responsibilities.split('\n'),
        Minimum_qualifications: data.minimum_qualifications.split('\n'),
        Requisition_ID: data.requisition_id,
        Company_Name: data.company_display_name,
      });
      onSubmit(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  // Mock AI generation function - replace with actual API call
  const generateWithAI = async (prompt: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    return `Generated content for ${prompt}...`;
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            {/* Overlay */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Modal positioning trick */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              className="inline-block w-full max-w-3xl my-8 text-left align-middle bg-white rounded-[32px] shadow-2xl overflow-hidden relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Create New Job</h2>
                </div>
                <button
                  onClick={onClose}
                  className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="px-8 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  {formSections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(index)}
                      className={`flex flex-col items-center space-y-2 group ${
                        index === currentSection ? 'text-primary' : 'text-gray-400'
                      }`}
                    >
                      <div className={`relative h-10 w-10 rounded-2xl flex items-center justify-center transition-colors ${
                        index === currentSection ? 'bg-primary text-white' : 'bg-gray-100'
                      }`}>
                        <section.icon className="h-5 w-5" />
                        {index < currentSection && (
                          <div className="absolute -right-12 top-1/2 h-0.5 w-10 bg-primary" />
                        )}
                      </div>
                      <span className="text-xs font-medium">{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className="max-h-[calc(100vh-24rem)] overflow-y-auto">
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSection}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {currentSection === 0 && (
                        <>
                          <Input
                            {...register('requisition_id', { required: 'Requisition ID is required' })}
                            label="Requisition ID"
                            placeholder="e.g. GGL-05122024-011"
                            error={!!errors.requisition_id}
                            helperText={errors.requisition_id?.message as string}
                            icon={<FileText className="h-5 w-5" />}
                          />
                          <Input
                            {...register('title', { required: 'Job title is required' })}
                            label="Job Title"
                            placeholder="e.g. Senior Software Engineer"
                            error={!!errors.title}
                            helperText={errors.title?.message as string}
                            icon={<Briefcase className="h-5 w-5" />}
                          />
                          <Input
                            {...register('company_display_name', { required: 'Company name is required' })}
                            label="Company Name"
                            placeholder="e.g. Google"
                            error={!!errors.company_display_name}
                            helperText={errors.company_display_name?.message as string}
                            icon={<Building className="h-5 w-5" />}
                          />
                        </>
                      )}

                      {currentSection === 1 && (
                        <>
                          <Controller
                            name="description"
                            control={control}
                            rules={{ required: 'Job description is required' }}
                            render={({ field }) => (
                              <AITextField
                                {...field}
                                label="Job Description"
                                placeholder="Enter a detailed job description..."
                                error={!!errors.description}
                                helperText={errors.description?.message as string}
                                onAIGenerate={() => generateWithAI('job description')}
                              />
                            )}
                          />
                          <Input
                            {...register('experience_level')}
                            label="Experience Level"
                            placeholder="e.g. Senior, Director+"
                            icon={<Clock className="h-5 w-5" />}
                          />
                        </>
                      )}

                      {currentSection === 2 && (
                        <>
                          <Controller
                            name="responsibilities"
                            control={control}
                            rules={{ required: 'Responsibilities are required' }}
                            render={({ field }) => (
                              <AITextField
                                {...field}
                                label="Responsibilities"
                                placeholder="Enter job responsibilities..."
                                error={!!errors.responsibilities}
                                helperText={errors.responsibilities?.message as string}
                                onAIGenerate={() => generateWithAI('responsibilities')}
                              />
                            )}
                          />
                          <Controller
                            name="minimum_qualifications"
                            control={control}
                            rules={{ required: 'Minimum qualifications are required' }}
                            render={({ field }) => (
                              <AITextField
                                {...field}
                                label="Minimum Qualifications"
                                placeholder="Enter minimum qualifications..."
                                error={!!errors.minimum_qualifications}
                                helperText={errors.minimum_qualifications?.message as string}
                                onAIGenerate={() => generateWithAI('minimum qualifications')}
                              />
                            )}
                          />
                          <Controller
                            name="preferred_qualifications"
                            control={control}
                            render={({ field }) => (
                              <AITextField
                                {...field}
                                label="Preferred Qualifications"
                                placeholder="Enter preferred qualifications..."
                                error={!!errors.preferred_qualifications}
                                helperText={errors.preferred_qualifications?.message as string}
                                onAIGenerate={() => generateWithAI('preferred qualifications')}
                              />
                            )}
                          />
                        </>
                      )}

                      {currentSection === 3 && (
                        <>
                          <Input
                            {...register('location', { required: 'Location is required' })}
                            label="Primary Location"
                            placeholder="e.g. Mountain View, CA"
                            error={!!errors.location}
                            helperText={errors.location?.message as string}
                            icon={<MapPin className="h-5 w-5" />}
                          />
                          <Input
                            {...register('application_url')}
                            label="Application URL"
                            placeholder="e.g. https://careers.google.com/jobs/..."
                            icon={<Globe className="h-5 w-5" />}
                          />
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => currentSection > 0 && setCurrentSection(prev => prev - 1)}
                      disabled={currentSection === 0}
                    >
                      Back
                    </Button>

                    {currentSection < formSections.length - 1 ? (
                      <Button
                        type="button"
                        onClick={() => setCurrentSection(prev => prev + 1)}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        icon={<Sparkles className="h-5 w-5" />}
                      >
                        Create Job
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
