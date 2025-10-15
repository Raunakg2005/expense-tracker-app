import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const spinner = (
    <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <div className="flex justify-center items-center p-4">{spinner}</div>;
};

export default LoadingSpinner;
