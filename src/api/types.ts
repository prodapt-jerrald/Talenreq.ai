export interface ApiJob {
  name: string;
  company: string;
  requisition_id: string;
  title: string;
  description: string;
  addresses: string[];
  application_info: {
    uris: string[];
  };
  custom_attributes: {
    experience_level?: string[];
    responsibilities?: string[] | string;
    preferred_qualifications?: string[] | string;
    location?: string[] | any;
    minimum_qualifications?: string[] | string;
  };
  language_code: string;
  visibility: number;
  posting_publish_time: number;
  posting_expire_time: number;
  posting_create_time: number;
  posting_update_time: number;
  company_display_name: string;
  derived_info: {
    locations: Array<{
      location_type: number;
      postal_address: {
        region_code: string;
        postal_code: string;
        administrative_area: string;
        locality: string | any;
        address_lines: string[];
      };
      lat_lng: {
        latitude: number;
        longitude: number;
      };
      radius_miles: number;
    }>;
    job_categories: number[];
  };
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}