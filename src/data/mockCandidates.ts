import type { Candidate } from '../types/candidate';

export const mockCandidates: Candidate[] = [
  {
    id: 'JV',
    employeeId: 'PRD-2024-001',
    name: 'Joe Vanguard',
    initials: 'JV',
    currentRole: 'Senior Software Architect',
    education: {
      degree: 'PhD',
      field: 'Computer Science',
      university: 'Stanford University',
      year: 2018
    },
    experience: {
      years: '10 years',
      current: {
        role: 'Senior Software Architect',
        duration: '3 years',
        responsibilities: [
          'Lead architecture design for cloud-native applications',
          'Drive technical strategy and innovation initiatives',
          'Mentor junior developers and promote best practices',
          'Design and implement scalable microservices architectures'
        ]
      },
      previous: [
        {
          role: 'Lead Software Engineer',
          company: 'Microsoft',
          duration: '4 years'
        },
        {
          role: 'Software Engineer',
          company: 'Google',
          duration: '3 years'
        }
      ]
    },
    skills: {
      technical: ['Python', 'React', 'Cloud Architecture', 'AWS', 'Kubernetes', 'System Design'],
      soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Management']
    },
    resumeUrl: '/resumes/joe-vanguard-resume.pdf'
  },
  {
    id: 'SK',
    employeeId: 'PRD-2024-002',
    name: 'Sophia Kaplan',
    initials: 'SK',
    currentRole: 'Senior Software Engineer',
    education: {
      degree: 'MS',
      field: 'Software Engineering',
      university: 'MIT',
      year: 2016
    },
    experience: {
      years: '8 years',
      current: {
        role: 'Senior Software Engineer',
        duration: '2 years',
        responsibilities: [
          'Lead development of cloud-based solutions',
          'Implement CI/CD pipelines and DevOps practices',
          'Optimize application performance and scalability',
          'Collaborate with cross-functional teams on product development'
        ]
      },
      previous: [
        {
          role: 'Software Engineer',
          company: 'Amazon',
          duration: '3 years'
        },
        {
          role: 'Junior Developer',
          company: 'IBM',
          duration: '3 years'
        }
      ]
    },
    skills: {
      technical: ['Java', 'Spring Boot', 'Docker', 'Microservices', 'Azure', 'DevOps'],
      soft: ['Analytical Thinking', 'Teamwork', 'Project Management', 'Mentoring']
    },
    resumeUrl: '/resumes/sophia-kaplan-resume.pdf'
  }
];