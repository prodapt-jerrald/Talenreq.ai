import type { Job } from '../types/job';

export const mockJobs: Job[] = [
  {
    name: "projects/prodapt-poc/tenants/5af31215-e634-4cbf-8c36-e0e0f01e25fa/jobs/96692614744416966",
    company: "projects/prodapt-poc/tenants/5af31215-e634-4cbf-8c36-e0e0f01e25fa/companies/e26890d1-938d-41f8-a6b5-063233c88eaf",
    requisition_id: "GGL-05122024-011",
    title: "Director, Software Development FinOps",
    description: "As we help every developer or enterprise make Google Cloud Platform (GCP) a part of their digital transformation...",
    addresses: ["1600 Amphitheatre Parkway, Mountain View, CA 94043"],
    application_info: {
      uris: ["https://www.google.com/about/careers/applications/jobs/"]
    },
    custom_attributes: {
      experience_level: ["Director+"],
      responsibilities: ["Provide technical outlook and strategy for the Cloud Data Platform"],
      preferred_qualifications: ["Experience building software and distributed systems at scale"],
      location: ["Mountain View, CA"],
      minimum_qualifications: ["Bachelor's degree in Computer Science or equivalent practical experience"]
    },
    company_display_name: "Google",
    derived_info: {
      locations: [],
      job_categories: [8, 18, 3]
    }
  },
  {
    name: "projects/prodapt-poc/tenants/job2",
    company: "projects/prodapt-poc/tenants/company2",
    requisition_id: "MSFT-05122024-022",
    title: "Senior Software Architect, Cloud Infrastructure",
    description: "Join Microsoft's Azure team to architect next-generation cloud solutions...",
    addresses: ["One Microsoft Way, Redmond, WA 98052"],
    application_info: {
      uris: ["https://careers.microsoft.com"]
    },
    custom_attributes: {
      experience_level: ["Senior"],
      responsibilities: ["Design and implement cloud-native architectures"],
      preferred_qualifications: ["Experience with distributed systems and microservices"],
      location: ["Redmond, WA"],
      minimum_qualifications: ["Master's degree in Computer Science or equivalent experience"]
    },
    company_display_name: "Microsoft",
    derived_info: {
      locations: [],
      job_categories: [8, 18]
    }
  },
  {
    name: "projects/prodapt-poc/tenants/job3",
    company: "projects/prodapt-poc/tenants/company3",
    requisition_id: "META-05122024-033",
    title: "AI Research Scientist",
    description: "Work on cutting-edge AI research at Meta's Reality Labs...",
    addresses: ["1 Hacker Way, Menlo Park, CA 94025"],
    application_info: {
      uris: ["https://careers.meta.com"]
    },
    custom_attributes: {
      experience_level: ["PhD"],
      responsibilities: ["Advance state-of-the-art in artificial intelligence"],
      preferred_qualifications: ["Published research in top AI conferences"],
      location: ["Menlo Park, CA"],
      minimum_qualifications: ["PhD in Computer Science, Machine Learning, or related field"]
    },
    company_display_name: "Meta",
    derived_info: {
      locations: [],
      job_categories: [8, 3]
    }
  }
];