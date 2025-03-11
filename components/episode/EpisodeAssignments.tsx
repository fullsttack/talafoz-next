'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, FileText, Upload, ArrowUp, Check, X, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  episodeId: string;
  courseId: string;
}

interface Submission {
  id: string;
  assignmentId: string;
  content: string;
  fileNames: string[];
  status: 'draft' | 'submitted' | 'reviewed';
  submittedAt: string;
  feedback?: string;
}

interface EpisodeAssignmentsProps {
  episodeId: string;
  courseId: string;
}

export default function EpisodeAssignments({ episodeId, courseId }: EpisodeAssignmentsProps) {
  // Mock assignments for this episode
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  // User submissions
  const [submissions, setSubmissions] = useState<Record<string, Submission>>({});
  // Current submission draft
  const [currentSubmission, setCurrentSubmission] = useState<{
    assignmentId: string;
    content: string;
    fileNames: string[];
  }>({
    assignmentId: '',
    content: '',
    fileNames: [],
  });
  
  // Managing UI state
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null);
  const [submittingAssignment, setSubmittingAssignment] = useState<string | null>(null);
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Omit<Assignment, 'id'>>({
    title: '',
    description: '',
    dueDate: '',
    episodeId,
    courseId,
  });

  // Load assignments and submissions from localStorage on component mount
  useEffect(() => {
    const savedAssignments = localStorage.getItem(`course_${courseId}_episode_${episodeId}_assignments`);
    if (savedAssignments) {
      try {
        setAssignments(JSON.parse(savedAssignments));
      } catch (error) {
        console.error('Error parsing saved assignments:', error);
      }
    } else {
      // If no saved assignments, create a default one for demonstration
      const defaultAssignment: Assignment = {
        id: '1',
        title: 'تمرین عملی اپیزود',
        description: 'لطفا موارد آموخته شده در این اپیزود را به صورت عملی پیاده‌سازی کنید و نتیجه را آپلود نمایید.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        episodeId,
        courseId,
      };
      setAssignments([defaultAssignment]);
      localStorage.setItem(
        `course_${courseId}_episode_${episodeId}_assignments`,
        JSON.stringify([defaultAssignment])
      );
    }

    const savedSubmissions = localStorage.getItem(`course_${courseId}_episode_${episodeId}_submissions`);
    if (savedSubmissions) {
      try {
        setSubmissions(JSON.parse(savedSubmissions));
      } catch (error) {
        console.error('Error parsing saved submissions:', error);
      }
    }
  }, [courseId, episodeId]);

  // Save assignments and submissions to localStorage whenever they change
  useEffect(() => {
    if (assignments.length > 0) {
      localStorage.setItem(
        `course_${courseId}_episode_${episodeId}_assignments`,
        JSON.stringify(assignments)
      );
    }
  }, [assignments, courseId, episodeId]);

  useEffect(() => {
    if (Object.keys(submissions).length > 0) {
      localStorage.setItem(
        `course_${courseId}_episode_${episodeId}_submissions`,
        JSON.stringify(submissions)
      );
    }
  }, [submissions, courseId, episodeId]);

  // Toggle assignment expansion
  const toggleAssignment = (assignmentId: string) => {
    setExpandedAssignment(prev => prev === assignmentId ? null : assignmentId);
  };

  // Start submitting an assignment
  const startSubmitting = (assignmentId: string) => {
    setSubmittingAssignment(assignmentId);
    setCurrentSubmission({
      assignmentId,
      content: submissions[assignmentId]?.content || '',
      fileNames: submissions[assignmentId]?.fileNames || [],
    });
  };

  // Cancel submission
  const cancelSubmission = () => {
    setSubmittingAssignment(null);
    setCurrentSubmission({
      assignmentId: '',
      content: '',
      fileNames: [],
    });
  };

  // Add a file to current submission
  const addFile = () => {
    const fileName = prompt('نام فایل را وارد کنید');
    if (fileName && fileName.trim()) {
      setCurrentSubmission(prev => ({
        ...prev,
        fileNames: [...prev.fileNames, fileName.trim()]
      }));
    }
  };

  // Remove a file from current submission
  const removeFile = (fileName: string) => {
    setCurrentSubmission(prev => ({
      ...prev,
      fileNames: prev.fileNames.filter(name => name !== fileName)
    }));
  };

  // Submit an assignment
  const submitAssignment = () => {
    if (!submittingAssignment || !currentSubmission.content.trim()) return;
    
    const newSubmission: Submission = {
      id: Date.now().toString(),
      assignmentId: submittingAssignment,
      content: currentSubmission.content,
      fileNames: currentSubmission.fileNames,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };

    setSubmissions(prev => ({
      ...prev,
      [submittingAssignment]: newSubmission
    }));

    setSubmittingAssignment(null);
    setCurrentSubmission({
      assignmentId: '',
      content: '',
      fileNames: [],
    });
  };

  // Add a new assignment (admin only in real app)
  const addAssignment = () => {
    if (!newAssignment.title.trim() || !newAssignment.description.trim()) return;
    
    const assignment: Assignment = {
      ...newAssignment,
      id: Date.now().toString(),
    };

    setAssignments(prev => [...prev, assignment]);
    
    // Reset form
    setNewAssignment({
      title: '',
      description: '',
      dueDate: '',
      episodeId,
      courseId,
    });
    setShowAddAssignment(false);
  };

  // Format date in Persian style
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Simple formatting - in a real app would use a Persian date formatter
    return date.toLocaleDateString('fa-IR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">تمرین‌های این اپیزود</h3>
        
        {/* This button would only be visible to instructors in the real app */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAddAssignment(!showAddAssignment)}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          افزودن تمرین
        </Button>
      </div>
      
      {/* Add new assignment form (instructor only) */}
      {showAddAssignment && (
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h4 className="font-medium mb-3">تمرین جدید</h4>
          <div className="space-y-3">
            <div>
              <Input
                placeholder="عنوان تمرین"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
                className="mb-2"
              />
            </div>
            <div>
              <Textarea
                placeholder="توضیحات تمرین"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px] resize-y mb-2"
              />
            </div>
            <div>
              <div className="text-sm mb-1">مهلت تحویل:</div>
              <Input
                type="date"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAddAssignment(false)}
              >
                انصراف
              </Button>
              <Button 
                size="sm"
                onClick={addAssignment}
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
              >
                افزودن تمرین
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {assignments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">تمرینی برای این اپیزود تعریف نشده است.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map(assignment => (
            <div 
              key={assignment.id} 
              className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Assignment header */}
              <div 
                className="p-4 bg-white dark:bg-gray-900 flex justify-between items-center cursor-pointer"
                onClick={() => toggleAssignment(assignment.id)}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-teal-500" />
                  <div>
                    <h4 className="font-medium">{assignment.title}</h4>
                    {assignment.dueDate && (
                      <p className="text-sm text-gray-500">
                        مهلت تحویل: {formatDate(assignment.dueDate)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {submissions[assignment.id] && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      submissions[assignment.id].status === 'submitted' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-400'
                    }`}>
                      {submissions[assignment.id].status === 'submitted' ? 'ارسال شده' : 'پیش‌نویس'}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Assignment details */}
              {expandedAssignment === assignment.id && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
                  {/* Assignment description */}
                  <div className="mb-4">
                    <h5 className="font-medium mb-2">توضیحات:</h5>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {assignment.description}
                    </p>
                  </div>
                  
                  {/* Submission area */}
                  {submittingAssignment === assignment.id ? (
                    <div className="mt-4 space-y-3">
                      <h5 className="font-medium">ارسال پاسخ:</h5>
                      <Textarea
                        placeholder="پاسخ خود را وارد کنید..."
                        value={currentSubmission.content}
                        onChange={(e) => setCurrentSubmission(prev => ({ ...prev, content: e.target.value }))}
                        className="min-h-[120px] resize-y"
                      />
                      
                      {/* File attachments */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h6 className="text-sm font-medium">فایل‌های پیوست:</h6>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={addFile}
                            className="flex items-center gap-1"
                          >
                            <PlusCircle className="h-3 w-3" />
                            افزودن فایل
                          </Button>
                        </div>
                        
                        {currentSubmission.fileNames.length === 0 ? (
                          <p className="text-sm text-gray-500">هیچ فایلی پیوست نشده است.</p>
                        ) : (
                          <div className="space-y-2">
                            {currentSubmission.fileNames.map(fileName => (
                              <div 
                                key={fileName} 
                                className="flex items-center justify-between p-2 rounded bg-gray-100 dark:bg-gray-800"
                              >
                                <div className="flex items-center gap-2">
                                  <Paperclip className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{fileName}</span>
                                </div>
                                <button 
                                  onClick={() => removeFile(fileName)}
                                  className="p-1 text-gray-500 hover:text-red-500 rounded-full"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Submission buttons */}
                      <div className="flex justify-end gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={cancelSubmission}
                        >
                          انصراف
                        </Button>
                        <Button 
                          size="sm"
                          onClick={submitAssignment}
                          disabled={!currentSubmission.content.trim()}
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                        >
                          <ArrowUp className="h-4 w-4 ml-1" />
                          ارسال پاسخ
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      {submissions[assignment.id] ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">پاسخ ارسالی شما:</h5>
                            <span className="text-xs text-gray-500">
                              ارسال شده در {new Date(submissions[assignment.id].submittedAt).toLocaleDateString('fa-IR')}
                            </span>
                          </div>
                          <p className="p-3 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 whitespace-pre-wrap">
                            {submissions[assignment.id].content}
                          </p>
                          
                          {/* Attached files */}
                          {submissions[assignment.id].fileNames.length > 0 && (
                            <div className="mt-2">
                              <h6 className="text-sm font-medium mb-2">فایل‌های پیوست:</h6>
                              <div className="space-y-2">
                                {submissions[assignment.id].fileNames.map(fileName => (
                                  <div 
                                    key={fileName} 
                                    className="flex items-center gap-2 p-2 rounded bg-gray-100 dark:bg-gray-800"
                                  >
                                    <Paperclip className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{fileName}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Feedback from instructor (if any) */}
                          {submissions[assignment.id].feedback && (
                            <div className="mt-4">
                              <h6 className="text-sm font-medium mb-2">بازخورد استاد:</h6>
                              <p className="p-3 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
                                {submissions[assignment.id].feedback}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => startSubmitting(assignment.id)}
                            >
                              ویرایش پاسخ
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <Button 
                            onClick={() => startSubmitting(assignment.id)}
                            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                          >
                            <Upload className="h-4 w-4 ml-1" />
                            ارسال پاسخ
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 