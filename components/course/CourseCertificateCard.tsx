import { Award, Check, Certificate, Medal, Trophy } from 'lucide-react';

interface CourseCertificateCardProps {
  courseCompleted: boolean;
  courseCompletionPercentage?: number;
  onRequestCertificate?: () => void;
}

export default function CourseCertificateCard({
  courseCompleted = false,
  courseCompletionPercentage = 0,
  onRequestCertificate = () => console.log('Certificate requested')
}: CourseCertificateCardProps) {
  
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-md">
      {/* نوار تزئینی بالای کارت */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500"></div>
      
      {/* محتوای اصلی */}
      <div className="p-6 pt-8">
        {/* آیکون گواهی */}
        <div className="mb-5 flex justify-center">
          <div className="relative">
            {/* دایره درخشان پشت آیکون */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-200 to-amber-100 dark:from-amber-400/20 dark:to-amber-300/20 blur-md"></div>
            
            {/* آیکون گواهی */}
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 p-4 shadow-lg">
              <Trophy className="h-full w-full text-white" />
            </div>
            
            {/* تیک تایید */}
            <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1 text-white shadow-md">
              <Check className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* عنوان و توضیحات */}
        <div className="mb-5 text-center">
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">گواهی معتبر پایان دوره</h2>
          <p className="text-gray-600 dark:text-gray-300">با تکمیل این دوره، گواهی رسمی با قابلیت استعلام دریافت کنید.</p>
        </div>
        
        {/* مزایای گواهی */}
        <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">قابل ارائه به کارفرمایان و سازمان‌ها</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">دارای کد اختصاصی و QR کد برای استعلام</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-green-100 p-1 dark:bg-green-900/30">
                <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">نشان‌دهنده تسلط شما بر محتوای دوره</span>
            </li>
          </ul>
        </div>
        
        {/* نوار طلایی تزئینی */}
        <div className="relative my-5 h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-60">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 dark:bg-gray-900">
            <Award className="h-5 w-5 text-amber-400" />
          </div>
        </div>
        
        {/* دکمه عملیات */}
        {courseCompleted ? (
          <button
            onClick={onRequestCertificate}
            className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 p-0.5 shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-transform duration-300 group-hover:translate-y-full"></div>
            <div className="relative flex items-center justify-center gap-2 rounded-md bg-white py-3 px-4 font-medium text-gray-900 transition-all duration-300 group-hover:bg-transparent group-hover:text-white dark:bg-gray-900 dark:text-white">
              <Award className="h-5 w-5" />
              <span>دریافت گواهی پایان دوره</span>
            </div>
          </button>
        ) : (
          <button
            onClick={() => {}}
            className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 to-gray-100 p-0.5 shadow-md dark:from-gray-700 dark:to-gray-800"
          >
            <div className="relative flex items-center justify-center gap-2 rounded-md bg-white py-3 px-4 font-medium text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              <Award className="h-5 w-5" />
              <span>با تکمیل دوره، گواهی دریافت کنید</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
} 