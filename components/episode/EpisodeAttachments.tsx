'use client';

import { useState } from 'react';
import { FileText, Download, FileArchive, FileImage, FileCode, Film, Music, File, ExternalLink } from 'lucide-react';

interface EpisodeAttachmentsProps {
  episodeId: string;
  courseId: string;
}

interface Attachment {
  id: string;
  title: string;
  description?: string;
  fileType: 'pdf' | 'doc' | 'zip' | 'image' | 'code' | 'video' | 'audio' | 'other';
  fileSize: string;
  downloadUrl: string;
  uploadDate: string;
  isNew?: boolean;
}

export default function EpisodeAttachments({ episodeId, courseId }: EpisodeAttachmentsProps) {
  // در یک پروژه واقعی، این داده‌ها از API دریافت می‌شوند
  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      id: '1',
      title: 'جزوه کامل این قسمت',
      description: 'این فایل شامل تمام مطالب ارائه شده در این قسمت به همراه مثال‌های بیشتر است.',
      fileType: 'pdf',
      fileSize: '2.5 MB',
      downloadUrl: '/attachments/episode-notes.pdf',
      uploadDate: '1402/12/01',
      isNew: true
    },
    {
      id: '2',
      title: 'کد نمونه پروژه',
      description: 'کد نمونه پیاده‌سازی شده در این قسمت برای تمرین بیشتر',
      fileType: 'code',
      fileSize: '156 KB',
      downloadUrl: '/attachments/sample-code.zip',
      uploadDate: '1402/12/01'
    },
    {
      id: '3',
      title: 'فایل‌های گرافیکی پروژه',
      fileType: 'image',
      fileSize: '4.2 MB',
      downloadUrl: '/attachments/project-assets.zip',
      uploadDate: '1402/11/28'
    },
    {
      id: '4',
      title: 'نمونه پروژه تکمیل شده',
      description: 'این فایل شامل پروژه کامل با تمام ویژگی‌های توضیح داده شده است.',
      fileType: 'zip',
      fileSize: '8.7 MB',
      downloadUrl: '/attachments/complete-project.zip',
      uploadDate: '1402/11/25'
    },
    {
      id: '5',
      title: 'ویدیوی تکمیلی',
      description: 'ویدیوی اضافی برای درک بهتر مفاهیم پیشرفته',
      fileType: 'video',
      fileSize: '45.3 MB',
      downloadUrl: '/attachments/additional-video.mp4',
      uploadDate: '1402/11/20'
    }
  ]);

  // نمایش آیکون مناسب برای هر نوع فایل
  const renderFileIcon = (fileType: Attachment['fileType']) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="h-10 w-10 text-red-400" />;
      case 'doc':
        return <FileText className="h-10 w-10 text-blue-400" />;
      case 'zip':
        return <FileArchive className="h-10 w-10 text-purple-400" />;
      case 'image':
        return <FileImage className="h-10 w-10 text-green-400" />;
      case 'code':
        return <FileCode className="h-10 w-10 text-yellow-400" />;
      case 'video':
        return <Film className="h-10 w-10 text-pink-400" />;
      case 'audio':
        return <Music className="h-10 w-10 text-blue-400" />;
      default:
        return <File className="h-10 w-10 text-gray-400" />;
    }
  };

  // شبیه‌سازی دانلود فایل
  const handleDownload = (attachment: Attachment) => {
    // در یک پروژه واقعی، اینجا فایل دانلود می‌شود
    console.log(`Downloading: ${attachment.title}`);
    
    // حذف نشانگر "جدید" پس از دانلود
    if (attachment.isNew) {
      setAttachments(attachments.map(item => 
        item.id === attachment.id ? { ...item, isNew: false } : item
      ));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white">فایل‌های ضمیمه ({attachments.length})</h3>
        <span className="text-xs text-gray-400">آخرین به‌روزرسانی: {attachments[0]?.uploadDate}</span>
      </div>
      
      {attachments.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">
          هیچ فایل ضمیمه‌ای برای این قسمت وجود ندارد.
        </div>
      ) : (
        <div className="space-y-4">
          {attachments.map(attachment => (
            <div key={attachment.id} className="bg-gray-800/70 rounded-lg p-4 border border-gray-700 flex">
              <div className="flex-shrink-0 mr-4">
                {renderFileIcon(attachment.fileType)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <h4 className="font-medium text-white truncate">{attachment.title}</h4>
                  {attachment.isNew && (
                    <span className="ml-2 bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded">جدید</span>
                  )}
                </div>
                
                {attachment.description && (
                  <p className="text-sm text-gray-300 mb-2">{attachment.description}</p>
                )}
                
                <div className="flex flex-wrap items-center text-xs text-gray-400 gap-x-4 gap-y-1">
                  <span>نوع: {(() => {
                    switch (attachment.fileType) {
                      case 'pdf': return 'PDF';
                      case 'doc': return 'Word';
                      case 'zip': return 'فایل فشرده';
                      case 'image': return 'تصویر';
                      case 'code': return 'کد';
                      case 'video': return 'ویدیو';
                      case 'audio': return 'صوت';
                      default: return 'سایر';
                    }
                  })()}</span>
                  <span>حجم: {attachment.fileSize}</span>
                  <span>تاریخ: {attachment.uploadDate}</span>
                </div>
              </div>
              
              <div className="flex-shrink-0 flex items-start ml-2">
                <button
                  onClick={() => handleDownload(attachment)}
                  className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-700 text-gray-400 hover:text-green-400 transition-colors"
                  title="دانلود فایل"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
          
          {/* لینک‌های مفید */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <h4 className="text-sm font-medium text-white mb-3">لینک‌های مفید</h4>
            <div className="space-y-2">
              <a 
                href="https://example.com/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span>مستندات تکمیلی</span>
              </a>
              <a 
                href="https://example.com/forum" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span>انجمن پرسش و پاسخ</span>
              </a>
              <a 
                href="https://example.com/github" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                <span>مخزن گیت‌هاب پروژه</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 