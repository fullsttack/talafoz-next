export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        {/* Logo skeleton */}
        <div className="w-32 h-32 relative mb-8">
          <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
          در حال بارگذاری...
        </div>
        
        {/* Loading spinner */}
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
} 