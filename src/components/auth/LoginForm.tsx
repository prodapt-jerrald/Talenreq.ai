import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Brain, Sparkles, Users, ChevronRight } from 'lucide-react';
import { useSession } from '../../contexts/SessionContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import logo from '../../assets/logo/talentreq_logo_4.png';

interface LoginFormData {
  email: string;
  password: string;
  name?: string;
}

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    description: 'Advanced algorithms match candidates with the perfect opportunities',
  },
  {
    icon: Sparkles,
    title: 'Smart Automation',
    description: 'Streamline your recruitment process with intelligent automation',
  },
  {
    icon: Users,
    title: 'Talent Pool Analytics',
    description: 'Deep insights into your candidate pool and market trends',
  },
];

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, register } = useSession();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage(''); // Clear any previous error messages
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        await register(data.email, data.password, data.name!);
        setIsLogin(true); // Switch to login form after successful registration
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="w-[40%] bg-white flex items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <div className="flex items-center justify-center">
              <img src={logo} alt="TalentReq.AI" className="h-18 w-60"/>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="mt-3 text-gray-600">
                {isLogin
                  ? 'Sign in to access your account'
                  : 'Join TalentReq.AI to find your perfect match'}
              </p>
            </div>
          </motion.div>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <Input
                {...registerForm('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Email"
                icon={<Mail className="h-5 w-5" />}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <Input
                {...registerForm('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                type="password"
                placeholder="Password"
                icon={<Lock className="h-5 w-5" />}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              {!isLogin && (
                <Input
                  {...registerForm('name', { required: 'Full name is required' })}
                  type="text"
                  placeholder="Full Name"
                  icon={<User className="h-5 w-5" />}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between text-sm"
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded-md border-gray-300 text-primary focus:ring-primary h-4 w-4 transition-colors duration-200"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              {isLogin && (
                <a href="#" className="text-primary hover:text-primary-dark font-medium">
                  Forgot password?
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <Button
                type="submit"
                className="w-full text-base font-medium"
                size="lg"
                icon={<ChevronRight className="h-5 w-5" />}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:text-primary-dark font-medium"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Right Panel - Marketing Content */}
      <div className="w-[60%] bg-gradient-to-br from-primary-light via-primary to-primary-dark p-16 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')] bg-cover bg-center opacity-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 text-white max-w-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl font-bold mb-8 leading-tight"
          >
            Transform Your Hiring Process with AI
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl mb-16 text-white/90 leading-relaxed"
          >
            TalentReq.AI combines cutting-edge artificial intelligence with human expertise
            to revolutionize how companies find and hire top talent.
          </motion.p>

          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-start space-x-6"
              >
                <div className="bg-white/10 rounded-2xl p-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: 0,
              }}
              animate={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 2,
              }}
              style={{
                width: `${150 + i * 50}px`,
                height: `${150 + i * 50}px`,
                left: `${10 + i * 20}%`,
                top: `${10 + i * 15}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
