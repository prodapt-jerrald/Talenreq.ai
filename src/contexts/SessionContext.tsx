import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Job } from '../types/job';

interface User {
  email: string;
  name: string;
  avatarUrl?: string;
}

interface SessionContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  handleJobSelect: (job: Job) => Promise<void>;
  jobResponse: any | null; 
  sessionId : any;
  updateSessionId: (job: Job) => Promise<void>;

}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [jobResponse, setJobResponse] = useState(null);
  const [sessionId, setSessionId] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://104.154.104.170/login', {
        email,
        password,
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log("access token" , response.data.access_token)
      localStorage.setItem("accessToken" , response.data.access_token)

      if (response.data.access_token) {
        const user = {
          email,
          name: email.split('@')[0],
        };

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/jobs'); // Navigate to jobs page on successful login
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data['error message'] || 'Invalid credentials');
      } else {
        throw new Error('Login failed');
      }
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://104.154.104.170/register', {
        email,
        password,
      }, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200){
        console.log("response",response)
        if(response.data.message="User created successfully"){
          navigate("/");
        }
        // Registration successful, switch to login form
     
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.detail === 'Email already registered') {
          throw new Error('Account already registered');
        }
        throw new Error('Registration failed');
      } else {
        throw new Error('Registration failed');
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  
  const handleJobSelect = async (job: Job) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error('Access token not found');
      return;
    }
  
    try {
      const response = await fetch(`http://104.154.104.170/jobs/${job.requisition_id}/talents`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setJobResponse(data);
        navigate(`/jobs/${job.requisition_id}/talents`);
      } else {
        console.error('Failed to fetch talents:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching talents:', error);
    }
  };
 const updateSessionId= async (session:any) =>{
  setSessionId(session)
 }
  return (
    <SessionContext.Provider value={{ user, login, handleJobSelect,jobResponse, register, logout, isAuthenticated: !!user ,sessionId,updateSessionId}}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
