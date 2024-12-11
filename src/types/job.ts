export interface Job {
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
    experience_level: string[];
    responsibilities: string[];
    preferred_qualifications: string[];
    location: string[];
    minimum_qualifications: string[];
  };
  company_display_name: string;
  derived_info: {
    locations: Location[];
    job_categories: number[];
  };
  posting_date: Date;
  expiry_date: Date;
  session:any
}

export interface Location {
  location_type: number;
  postal_address: {
    region_code: string;
    postal_code: string;
    administrative_area: string;
    locality: string;
    address_lines: string[];
  };
  lat_lng: {
    latitude: number;
    longitude: number;
  };
  radius_miles: number;
}