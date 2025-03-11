'use client';

import { useState, useRef } from 'react';
import { FileUp, Mic, StopCircle, Send, Clock, Download, CheckCircle, XCircle, AlertCircle, Lock } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'pending' | 'submitted' | 'graded' | 'rejected';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
}

interface Submission {
  id: string;
  assignmentId: string;
  type: 'file' | 'audio';
  filename?: string;
  duration?: string;
  submittedAt: string;
}

interface EpisodeAssignmentsProps {
  episodeId: string;
  courseId: string;
  isLocked?: boolean;
}

export default function EpisodeAssignments({ episodeId, courseId, isLocked = false }: EpisodeAssignmentsProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'پیاده‌سازی کلاس‌های مورد نیاز',
      description: 'با توجه به مفاهیم آموزش داده شده در این قسمت، کلاس‌های مورد نیاز برای پروژه را پیاده‌سازی کنید.',
      deadline: '1402/12/15',
      status: 'pending'
    },
    {
      id: '2',
      title: 'رفع اشکالات کد نمونه',
      description: 'اشکالات موجود در کد نمونه را پیدا کرده و آن‌ها را برطرف کنید.',
      deadline: '1402/12/10',
      status: 'submitted',
      submittedAt: '1402/12/08'
    },
    {
      id: '3',
      title: 'پیاده‌سازی الگوریتم مرتب‌سازی',
      description: 'الگوریتم مرتب‌سازی توضیح داده شده در این قسمت را پیاده‌سازی کنید.',
      deadline: '1402/11/25',
      status: 'graded',
      grade: 18,
      feedback: 'عالی بود! فقط در بخش پیچیدگی زمانی می‌توانست بهتر باشد.',
      submittedAt: '1402/11/20'
    },
    {
      id: '4',
      title: 'بهینه‌سازی کد قبلی',
      description: 'کد قبلی خود را با استفاده از تکنیک‌های بهینه‌سازی بهبود دهید.',
      deadline: '1402/11/15',
      status: 'rejected',
      feedback: 'لطفاً مجدداً تلاش کنید. کد ارسالی با الزامات تمرین مطابقت ندارد.',
      submittedAt: '1402/11/10'
    }
  ]);
  
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      assignmentId: '2',
      type: 'file',
      filename: 'assignment_solution.zip',
      submittedAt: '1402/12/08'
    },
    {
      id: '2',
      assignmentId: '3',
      type: 'file',
      filename: 'sorting_algorithm.js',
      submittedAt: '1402/11/20'
    },
    {
      id: '3',
      assignmentId: '4',
      type: 'audio',
      duration: '01:45',
      submittedAt: '1402/11/10'
    }
  ]);
  
  const [activeAssignment, setActiveAssignment] = useState<string | null>(null);
  const [submissionType, setSubmissionType] = useState<'file' | 'audio'>('file');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // شروع ضبط صدا
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // شبیه‌سازی تایمر ضبط
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };
  
  // پایان ضبط صدا
  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    
    // در یک پروژه واقعی، اینجا فایل صوتی ضبط شده ذخیره می‌شود
  };
  
  // انتخاب فایل
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // ارسال تمرین
  const submitAssignment = () => {
    if (!activeAssignment) return;
    
    // ایجاد یک ارسال جدید
    const newSubmission: Submission = {
      id: Date.now().toString(),
      assignmentId: activeAssignment,
      type: submissionType,
      submittedAt: new Date().toLocaleDateString('fa-IR')
    };
    
    if (submissionType === 'file' && selectedFile) {
      newSubmission.filename = selectedFile.name;
    } else if (submissionType === 'audio') {
      const minutes = Math.floor(recordingTime / 60);
      const seconds = recordingTime % 60;
      newSubmission.duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // به‌روزرسانی وضعیت تمرین
    setAssignments(assignments.map(assignment => 
      assignment.id === activeAssignment 
        ? { 
            ...assignment, 
            status: 'submitted', 
            submittedAt: new Date().toLocaleDateString('fa-IR') 
          } 
        : assignment
    ));
    
    // افزودن ارسال جدید
    setSubmissions([...submissions, newSubmission]);
    
    // پاکسازی فرم
    setActiveAssignment(null);
    setSelectedFile(null);
    setRecordingTime(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // تبدیل ثانیه به فرمت mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // نمایش وضعیت تمرین
  const renderStatus = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <span className="flex items-center text-yellow-400 text-xs"><Clock className="h-3 w-3 mr-1" /> در انتظار ارسال</span>;
      case 'submitted':
        return <span className="flex items-center text-blue-400 text-xs"><AlertCircle className="h-3 w-3 mr-1" /> در انتظار بررسی</span>;
      case 'graded':
        return <span className="flex items-center text-green-400 text-xs"><CheckCircle className="h-3 w-3 mr-1" /> تأیید شده</span>;
      case 'rejected':
        return <span className="flex items-center text-red-400 text-xs"><XCircle className="h-3 w-3 mr-1" /> نیاز به اصلاح</span>;
      default:
        return null;
    }
  };
  
  // یافتن ارسال برای یک تمرین خاص
  const findSubmission = (assignmentId: string) => {
    return submissions.find(sub => sub.assignmentId === assignmentId);
  };

  // اگر محتوا قفل باشد، صفحه قفل نمایش داده می‌شود
  if (isLocked) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center p-8">
        <div className="bg-gray-800/60 p-6 rounded-lg border border-gray-700 flex flex-col items-center max-w-md">
          <div className="bg-yellow-500/20 p-3 rounded-full mb-4">
            <Lock className="h-12 w-12 text-yellow-500" />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">دسترسی محدود شده</h3>
          <p className="text-gray-300 text-sm mb-4">
            برای دسترسی به تمرین‌های این قسمت، لطفاً دوره را خریداری کنید یا اشتراک ویژه تهیه نمایید.
          </p>
          <div className="flex gap-3 mt-2">
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
              خرید دوره
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm transition-colors">
              تهیه اشتراک ویژه
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-medium text-white mb-4">تمرین‌های این قسمت</h3>
      
      {/* لیست تمرین‌ها */}
      <div className="space-y-4 mb-6">
        {assignments.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            تمرینی برای این قسمت تعریف نشده است.
          </div>
        ) : (
          assignments.map(assignment => (
            <div 
              key={assignment.id} 
              className={`bg-gray-800/70 rounded-lg p-4 border ${
                activeAssignment === assignment.id 
                  ? 'border-green-500/50' 
                  : 'border-gray-700'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">{assignment.title}</h4>
                {renderStatus(assignment.status)}
              </div>
              
              <p className="text-sm text-gray-300 mb-3">{assignment.description}</p>
              
              <div className="flex flex-wrap justify-between items-center text-xs text-gray-400 mb-3">
                <span className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  مهلت ارسال: {assignment.deadline}
                </span>
                
                {assignment.submittedAt && (
                  <span>
                    تاریخ ارسال: {assignment.submittedAt}
                  </span>
                )}
              </div>
              
              {/* نمایش نمره و بازخورد */}
              {assignment.status === 'graded' && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-md p-2 mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-green-400">نمره دریافتی:</span>
                    <span className="text-white font-bold">{assignment.grade} از 20</span>
                  </div>
                  {assignment.feedback && (
                    <p className="text-xs text-gray-300">{assignment.feedback}</p>
                  )}
                </div>
              )}
              
              {/* نمایش بازخورد برای تمرین‌های رد شده */}
              {assignment.status === 'rejected' && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-md p-2 mb-3">
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium text-red-400">بازخورد استاد:</span>
                  </div>
                  {assignment.feedback && (
                    <p className="text-xs text-gray-300">{assignment.feedback}</p>
                  )}
                </div>
              )}
              
              {/* نمایش فایل ارسالی */}
              {(assignment.status === 'submitted' || assignment.status === 'graded' || assignment.status === 'rejected') && (
                <div className="mb-3">
                  <h5 className="text-xs font-medium text-gray-400 mb-1">فایل ارسالی:</h5>
                  {(() => {
                    const submission = findSubmission(assignment.id);
                    if (submission) {
                      if (submission.type === 'file') {
                        return (
                          <div className="flex items-center bg-gray-700/50 rounded-md p-2">
                            <FileUp className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="text-xs text-gray-300 flex-1">{submission.filename}</span>
                            <button className="text-gray-400 hover:text-white">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      } else if (submission.type === 'audio') {
                        return (
                          <div className="flex items-center bg-gray-700/50 rounded-md p-2">
                            <Mic className="h-4 w-4 text-blue-400 mr-2" />
                            <span className="text-xs text-gray-300 flex-1">فایل صوتی ({submission.duration})</span>
                            <button className="text-gray-400 hover:text-white">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      }
                    }
                    return null;
                  })()}
                </div>
              )}
              
              {/* دکمه‌های عملیات */}
              <div className="flex justify-end">
                {(assignment.status === 'pending' || assignment.status === 'rejected') && (
                  activeAssignment === assignment.id ? (
                    <button
                      onClick={() => setActiveAssignment(null)}
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md transition-colors"
                    >
                      انصراف
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveAssignment(assignment.id)}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md transition-colors"
                    >
                      ارسال پاسخ
                    </button>
                  )
                )}
              </div>
              
              {/* فرم ارسال تمرین */}
              {activeAssignment === assignment.id && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setSubmissionType('file')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm ${
                        submissionType === 'file'
                          ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                      }`}
                    >
                      <FileUp className="h-4 w-4" />
                      <span>آپلود فایل</span>
                    </button>
                    <button
                      onClick={() => setSubmissionType('audio')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm ${
                        submissionType === 'audio'
                          ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                      }`}
                    >
                      <Mic className="h-4 w-4" />
                      <span>ضبط صدا</span>
                    </button>
                  </div>
                  
                  {submissionType === 'file' ? (
                    <div className="mb-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.zip,.rar,.jpg,.png,.js,.html,.css,.ts,.jsx,.tsx"
                      />
                      
                      {selectedFile ? (
                        <div className="flex items-center bg-gray-700/50 rounded-md p-3 mb-3">
                          <FileUp className="h-5 w-5 text-blue-400 mr-2" />
                          <div className="flex-1">
                            <div className="text-sm text-white truncate">{selectedFile.name}</div>
                            <div className="text-xs text-gray-400">{(selectedFile.size / 1024).toFixed(1)} KB</div>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedFile(null);
                              if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-gray-600 rounded-md p-6 text-center cursor-pointer hover:border-green-500/50 transition-colors"
                        >
                          <FileUp className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-400 mb-1">فایل خود را اینجا رها کنید یا کلیک کنید</p>
                          <p className="text-xs text-gray-500">حداکثر اندازه: 10MB</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-3">
                      {isRecording ? (
                        <div className="bg-red-900/20 border border-red-500/30 rounded-md p-4 text-center">
                          <div className="animate-pulse mb-2">
                            <Mic className="h-8 w-8 text-red-500 mx-auto" />
                          </div>
                          <p className="text-sm text-white mb-2">در حال ضبط صدا...</p>
                          <p className="text-xl font-mono font-bold text-red-400 mb-3">{formatTime(recordingTime)}</p>
                          <button
                            onClick={stopRecording}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-1.5 mx-auto"
                          >
                            <StopCircle className="h-4 w-4" />
                            <span>پایان ضبط</span>
                          </button>
                        </div>
                      ) : recordingTime > 0 ? (
                        <div className="bg-gray-700/50 rounded-md p-4 text-center mb-3">
                          <Mic className="h-6 w-6 text-green-400 mx-auto mb-2" />
                          <p className="text-sm text-white mb-1">ضبط صدا با موفقیت انجام شد</p>
                          <p className="text-xs text-gray-400">مدت زمان: {formatTime(recordingTime)}</p>
                        </div>
                      ) : (
                        <div 
                          onClick={startRecording}
                          className="border-2 border-dashed border-gray-600 rounded-md p-6 text-center cursor-pointer hover:border-green-500/50 transition-colors"
                        >
                          <Mic className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-400 mb-1">برای شروع ضبط صدا کلیک کنید</p>
                          <p className="text-xs text-gray-500">حداکثر زمان: 5 دقیقه</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      onClick={submitAssignment}
                      disabled={(submissionType === 'file' && !selectedFile) || (submissionType === 'audio' && recordingTime === 0)}
                      className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-4 w-4" />
                      <span>ارسال تمرین</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 