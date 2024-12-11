import axios from 'axios';
import { transformJobResponse } from './transforms';
import type { Job } from '../types/job';
// import { useSession } from '../contexts/SessionContext';

const API_BASE_URL = 'http://34.171.65.195'; // Update with your actual API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const jobsApi = {
  async getJobs(): Promise<Job[]> {
    try {
      const response:any = await apiClient.get('/jobs');
      console.log('response 1', response);
      const jobs = response.data.map(transformJobResponse);
      jobs.sort((a:any, b:any) => b.posting_date.getTime() - a.posting_date.getTime());
      return jobs;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  async getJobById(jobId: string): Promise<Job> {
    const accessToken = localStorage.getItem("accessToken");
    // const { updateSessionId } = useSession();

    try {
      const response = await apiClient.get(`/jobs/${jobId}/talents`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      // console.log("job id : " , jobId,response)
      // updateSessionId(response?.data?.session_id)
      return transformJobResponse(response.data.jobDesc,response?.data?.session_id);
    } catch (error) {
      console.error(`Error fetching job ${jobId}:`, error);
      throw error;
    }
  },

  async searchJobs(query: string): Promise<Job[]> {
    try {
      const response = await apiClient.get('/jobs', {
        params: { q: query }
      });
      return response.data.map(transformJobResponse);
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  }
};