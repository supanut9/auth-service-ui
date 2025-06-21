type SocialProvider = 'google' | 'line' | 'facebook';

interface SocialLoginProps {
  onSocialLogin: (provider: SocialProvider) => void;
}

function SocialLogin({ onSocialLogin }: SocialLoginProps) {
  return (
    <div className='space-y-4'>
      <button
        onClick={() => onSocialLogin('google')}
        className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
      >
        <span className='icon-[logos--google-icon] w-5 h-5 mr-2'></span>
        Continue with Google
      </button>
      <button
        onClick={() => onSocialLogin('line')}
        className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#06C755] hover:bg-[#05a544]'
      >
        <span className='icon-[cib--line] w-5 h-5 mr-2'></span>
        Continue with Line
      </button>
      <button
        onClick={() => onSocialLogin('facebook')}
        className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1877F2] hover:bg-[#166fe5]'
      >
        <span className='icon-[logos--facebook] w-5 h-5 mr-2'></span>
        Continue with Facebook
      </button>
    </div>
  );
}

export default SocialLogin;
