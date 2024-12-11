export interface Candidate {
  id: string;
  employeeId: string |any;
  name: string;
  initials: string;
  currentRole: string;
  education: {
    degree: string;
    field: string;
    university: string;
    year: number;
  };
  experience: {
    years: string;
    current: {
      role: string;
      company: string;
      duration: string;
      responsibilities: string[];
    };
    previous: Array<{
      role: string;
      company: string;
      duration: string;
    }>;
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  resumeUrl: string;
}