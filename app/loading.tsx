export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        {/* Logo skeleton */}
        
        
        {/* Loading text */}
        <div className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
          در حال بارگذاری...
        </div>
        
        {/* Loading spinner */}
        <div className="flex gap-2">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
} 