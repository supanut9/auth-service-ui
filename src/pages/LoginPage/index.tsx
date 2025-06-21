import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import EmailLogin from './EmailLogin';
import config from '../../config';

function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const responseType = searchParams.get('response_type');
    const clientId = searchParams.get('client_id');
    const redirectUri = searchParams.get('redirect_uri');
    const state = searchParams.get('state');
    // You can add logic here to handle these params if needed
  }, [searchParams]);

  const handleSocialLogin = (provider: 'google' | 'line' | 'facebook') => {
    const url = new URL(
      `${config.authServiceBaseUrl}/api/auth/${provider}/login`
    );
    // Append current search params to the social login URL
    url.search = searchParams.toString();
    window.location.href = url.toString();
  };

  const handleEmailLogin = async (data: {
    email: string;
    password: string;
  }) => {
    setError(null); // Reset error on new submission
    try {
      const response = await fetch(
        `${config.authServiceBaseUrl}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }

      console.log('Login successful!');

      const url = new URL(`${config.authServiceBaseUrl}/oauth/authorize`);
      url.search = searchParams.toString();
      window.location.href = url.toString();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Construct the dynamic link for the registration page
  const registerLink = `/register?${searchParams.toString()}`;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold text-center text-gray-900'>Login</h2>

        <SocialLogin onSocialLogin={handleSocialLogin} />

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <EmailLogin
          onSubmit={handleEmailLogin}
          error={error}
        />

        <p className='text-sm text-center text-gray-600'>
          Don't have an account?{' '}
          <Link
            to={registerLink} // Use the dynamically generated link
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
