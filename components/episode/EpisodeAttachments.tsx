'use client';

import { useState, useEffect } from 'react';
import { Download, FileType, File, FileText, FileCode, Image, Video, Music, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Attachment {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'image' | 'video' | 'audio' | 'code' | 'archive' | 'text' | 'other';
  fileSize: string;
  description?: string;
  downloadUrl: string;
}

interface EpisodeAttachmentsProps {
  episodeId: string;
  courseId: string;
}

export default function EpisodeAttachments({ episodeId, courseId }: EpisodeAttachmentsProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [downloadedFiles, setDownloadedFiles] = useState<string[]>([]);

  // Mock attachments for this episode
  useEffect(() => {
    // In a real app, these would be fetched from an API
    const mockAttachments: Attachment[] = [
      {
        id: '1',
        fileName: 'source-code.zip',
        fileType: 'archive',
        fileSize: '2.3 MB',
        description: 'کد منبع مثال‌های این اپیزود',
        downloadUrl: '#',
      },
      {
        id: '2',
        fileName: 'slides.pdf',
        fileType: 'pdf',
        fileSize: '1.5 MB',
        description: 'اسلایدهای ارائه شده در این اپیزود',
        downloadUrl: '#',
      },
      {
        id: '3',
        fileName: 'cheat-sheet.pdf',
        fileType: 'pdf',
        fileSize: '520 KB',
        description: 'خلاصه مفاهیم و نکات کلیدی',
        downloadUrl: '#',
      },
      {
        id: '4',
        fileName: 'additional-examples.tsx',
        fileType: 'code',
        fileSize: '8 KB',
        description: 'مثال‌های تکمیلی با جزئیات بیشتر',
        downloadUrl: '#',
      },
    ];

    setAttachments(mockAttachments);

    // Load download history from localStorage
    const downloadHistory = localStorage.getItem(`course_${courseId}_episode_${episodeId}_downloads`);
    if (downloadHistory) {
      try {
        setDownloadedFiles(JSON.parse(downloadHistory));
      } catch (error) {
        console.error('Error parsing download history:', error);
      }
    }
  }, [courseId, episodeId]);

  // Save download history to localStorage
  useEffect(() => {
    if (downloadedFiles.length > 0) {
      localStorage.setItem(
        `course_${courseId}_episode_${episodeId}_downloads`,
        JSON.stringify(downloadedFiles)
      );
    }
  }, [downloadedFiles, courseId, episodeId]);

  // Mock download functionality
  const handleDownload = (attachment: Attachment) => {
    // In a real app, this would trigger an actual download
    // Here we just track that the file was "downloaded"
    if (!downloadedFiles.includes(attachment.id)) {
      setDownloadedFiles(prev => [...prev, attachment.id]);
    }
    
    // Show a download message
    alert(`دانلود فایل "${attachment.fileName}" شروع شد...`);
  };

  // Get appropriate icon for file type
  const getFileIcon = (fileType: Attachment['fileType']) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'audio':
        return <Music className="h-5 w-5 text-green-500" />;
      case 'code':
        return <FileCode className="h-5 w-5 text-amber-500" />;
      case 'archive':
        return <Archive className="h-5 w-5 text-orange-500" />;
      case 'text':
        return <File className="h-5 w-5 text-gray-500" />;
      default:
        return <FileType className="h-5 w-5 text-gray-500" />;
    }
  };

  // Check if a file has been downloaded
  const isDownloaded = (attachmentId: string) => {
    return downloadedFiles.includes(attachmentId);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium mb-4">فایل‌های ضمیمه</h3>
      
      {attachments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">فایل ضمیمه‌ای برای این اپیزود وجود ندارد.</p>
      ) : (
        <div className="space-y-3">
          {attachments.map(attachment => (
            <div 
              key={attachment.id} 
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            >
              <div className="shrink-0">
                {getFileIcon(attachment.fileType)}
              </div>
              
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {attachment.fileName}
                </h4>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {attachment.fileSize}
                  </span>
                  
                  {isDownloaded(attachment.id) && (
                    <span className="text-green-600 dark:text-green-400 text-xs">
                      دانلود شده
                    </span>
                  )}
                </div>
                
                {attachment.description && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {attachment.description}
                  </p>
                )}
              </div>
              
              <div className="ml-auto pt-2 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(attachment)}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  دانلود
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 