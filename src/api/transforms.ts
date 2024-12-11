import type { Job } from '../types/job';
import type { ApiJob } from './types';

export function transformJobResponse(apiJob: ApiJob, session?:any): Job {
  console.log(apiJob,"apiJob")
  const location = apiJob.derived_info?.locations?.[0]?.postal_address || apiJob?.custom_attributes?.location;
  const formattedLocation = location
      ? `${location.locality}, ${location.administrative_area}`
      : apiJob?.custom_attributes?.location?.[0] || 'Remote';

  return {
    name: apiJob.name,
    company: apiJob.company,
    requisition_id: apiJob.requisition_id,
    title: apiJob.title,
    description: apiJob.description,
    addresses: apiJob.addresses,
    application_info: apiJob.application_info,
    custom_attributes: {
      experience_level: apiJob?.custom_attributes?.experience_level || [],
      responsibilities: Array.isArray(apiJob.custom_attributes.responsibilities)
          ? apiJob.custom_attributes.responsibilities
          : apiJob.custom_attributes.responsibilities?.split('\n').filter(Boolean) || [],
      preferred_qualifications: Array.isArray(apiJob.custom_attributes.preferred_qualifications)
          ? apiJob.custom_attributes.preferred_qualifications
          : apiJob.custom_attributes.preferred_qualifications?.split('\n').filter(Boolean) || [],
      location: apiJob?.custom_attributes?.location,
      minimum_qualifications: Array.isArray(apiJob.custom_attributes.minimum_qualifications)
          ? apiJob.custom_attributes.minimum_qualifications
          : apiJob.custom_attributes.minimum_qualifications?.split('\n').filter(Boolean) || [],
    },
    company_display_name: apiJob.company_display_name,
    derived_info: {
      locations: apiJob.derived_info?.locations || [],
      job_categories: apiJob.derived_info?.job_categories || [],
    },
    posting_date: new Date(apiJob.posting_publish_time * 1000),
    expiry_date: new Date(apiJob.posting_expire_time * 1000),
    session:session
  };
}