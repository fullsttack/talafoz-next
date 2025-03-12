"use client";

import { useState } from "react";
import {
  FileText,
  FileArchive,
  FileImage,
  FileCode,
  Film,
  Music,
  File,
  Lock,
  Download,
  Github,
  MessageCircleQuestion,
  BookOpenCheck
} from "lucide-react";

interface EpisodeAttachmentsProps {
  episodeId: string;
  courseId: string;
  isLocked?: boolean;
}

interface Attachment {
  id: string;
  title: string;
  description?: string;
  fileType:
    | "pdf"
    | "doc"
    | "zip"
    | "image"
    | "code"
    | "video"
    | "audio"
    | "other";
  fileSize: string;
  downloadUrl: string;
  uploadDate: string;
  isNew?: boolean;
}

export default function EpisodeAttachments({
  isLocked = false,
}: EpisodeAttachmentsProps) {
  // در یک پروژه واقعی، این داده‌ها از API دریافت می‌شوند
  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      id: "1",
      title: "جزوه کامل این قسمت",
      description:
        "این فایل شامل تمام مطالب ارائه شده در این قسمت به همراه مثال‌های بیشتر است.",
      fileType: "pdf",
      fileSize: "2.5 MB",
      downloadUrl: "/attachments/episode-notes.pdf",
      uploadDate: "1402/12/01",
      isNew: true,
    },
    {
      id: "2",
      title: "کد نمونه پروژه",
      description: "کد نمونه پیاده‌سازی شده در این قسمت برای تمرین بیشتر",
      fileType: "code",
      fileSize: "156 KB",
      downloadUrl: "/attachments/sample-code.zip",
      uploadDate: "1402/12/01",
    },
    {
      id: "3",
      title: "فایل‌های گرافیکی پروژه",
      fileType: "image",
      fileSize: "4.2 MB",
      downloadUrl: "/attachments/project-assets.zip",
      uploadDate: "1402/11/28",
    },
    {
      id: "4",
      title: "نمونه پروژه تکمیل شده",
      description:
        "این فایل شامل پروژه کامل با تمام ویژگی‌های توضیح داده شده است.",
      fileType: "zip",
      fileSize: "8.7 MB",
      downloadUrl: "/attachments/complete-project.zip",
      uploadDate: "1402/11/25",
    },
    {
      id: "5",
      title: "ویدیوی تکمیلی",
      description: "ویدیوی اضافی برای درک بهتر مفاهیم پیشرفته",
      fileType: "video",
      fileSize: "45.3 MB",
      downloadUrl: "/attachments/additional-video.mp4",
      uploadDate: "1402/11/20",
    },
  ]);

  // اطلاعات آیکون و رنگ برای هر نوع فایل
  const getFileTypeInfo = (fileType: Attachment["fileType"]) => {
    switch (fileType) {
      case "pdf":
        return {
          icon: <FileText className="h-5 w-5" />,
          color: "text-rose-400",
          bgColor: "bg-rose-400/10",
          label: "PDF",
        };
      case "doc":
        return {
          icon: <FileText className="h-5 w-5" />,
          color: "text-blue-400",
          bgColor: "bg-blue-400/10",
          label: "Word",
        };
      case "zip":
        return {
          icon: <FileArchive className="h-5 w-5" />,
          color: "text-purple-400",
          bgColor: "bg-purple-400/10",
          label: "فایل فشرده",
        };
      case "image":
        return {
          icon: <FileImage className="h-5 w-5" />,
          color: "text-emerald-400",
          bgColor: "bg-emerald-400/10",
          label: "تصویر",
        };
      case "code":
        return {
          icon: <FileCode className="h-5 w-5" />,
          color: "text-amber-400",
          bgColor: "bg-amber-400/10",
          label: "کد",
        };
      case "video":
        return {
          icon: <Film className="h-5 w-5" />,
          color: "text-pink-400",
          bgColor: "bg-pink-400/10",
          label: "ویدیو",
        };
      case "audio":
        return {
          icon: <Music className="h-5 w-5" />,
          color: "text-cyan-400",
          bgColor: "bg-cyan-400/10",
          label: "صوت",
        };
      default:
        return {
          icon: <File className="h-5 w-5" />,
          color: "text-gray-400",
          bgColor: "bg-gray-400/10",
          label: "سایر",
        };
    }
  };

  // شبیه‌سازی دانلود فایل
  const handleDownload = (attachment: Attachment) => {
    // در یک پروژه واقعی، اینجا فایل دانلود می‌شود
    console.log(`Downloading: ${attachment.title}`);

    // حذف نشانگر "جدید" پس از دانلود
    if (attachment.isNew) {
      setAttachments(
        attachments.map((item) =>
          item.id === attachment.id ? { ...item, isNew: false } : item
        )
      );
    }
  };

  // اگر محتوا قفل باشد، صفحه قفل نمایش داده می‌شود
  if (isLocked) {
    return (
      <div className="p-5 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-full mb-4">
          <Lock className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">
          دسترسی محدود شده
        </h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-5">
          برای دسترسی به فایل‌های ضمیمه این قسمت، لطفاً دوره را خریداری کنید.
        </p>

        <div className="flex justify-center gap-3">
          <button className="bg-blue-600/90 hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded-md text-sm">
            خرید دوره
          </button>
          <button className="border border-gray-600 hover:border-gray-500 transition-colors text-white py-2 px-4 rounded-md text-sm">
            تهیه اشتراک
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[300px]">
      <div className="flex-1">
        {/* هدر */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className=" font-medium">فایل‌های ضمیمه</h3>
          {attachments.length > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs ">
              {attachments.length} فایل
            </span>
          )}
        </div>

        {/* محتوا */}
        <div>
          {attachments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileArchive className="h-8 w-8 text-gray-600 mb-2" />
              <div className="text-gray-400 text-sm">
                هیچ فایل ضمیمه‌ای برای این قسمت وجود ندارد.
              </div>
            </div>
          ) : (
            <div className="space-y-2 mb-8">
              {attachments.map((attachment) => {
                const { icon, color, bgColor, label } = getFileTypeInfo(
                  attachment.fileType
                );

                return (
                  <div
                    key={attachment.id}
                    onClick={() => handleDownload(attachment)}
                    className="flex border rounded-md transition-colors overflow-hidden relative group cursor-pointer"
                  >
                    {/* آیکون فایل */}
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-12 ${bgColor}`}
                    >
                      <div className={color}>{icon}</div>
                    </div>

                    {/* اطلاعات فایل */}
                    <div className="p-3 flex-1">
                      <div className="flex items-center">
                        <h4 className="text-sm ">{attachment.title}</h4>
                        {attachment.isNew && (
                          <span className="mr-2 inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs bg-green-500/10 text-green-400">
                            جدید
                          </span>
                        )}
                      </div>

                      {attachment.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {attachment.description}
                        </p>
                      )}

                      <div className="flex mt-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${color.replace(
                              "text",
                              "bg"
                            )} mr-1.5`}
                          ></span>
                          <span className="ml-1">نوع فایل: </span>
                          <span>{label}</span>
                          <span className="mx-2">•</span>
                          <span>حجم فایل: </span>
                          <span>{attachment.fileSize}</span>
                        </div>
                      </div>
                    </div>

                    {/* دکمه دانلود هاوری وسط */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="absolute inset-0 backdrop-blur-sm "></div>
                      <div className="z-10 p-2  rounded-full">
                        <Download className="h-5 w-5 " />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* لینک‌های مفید */}
      <div className="absolute bottom-10  pt-4 border-t">
        <h4 className="text-sm font-medium  mb-3">لینک‌های مفید</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <a
            href="https://example.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-2 justify-center  border rounded-lg transition-colors"
          >
            <BookOpenCheck className="h-4 w-4 ml-2 text-blue-400" />
            <span className="text-xs"> راهنمایی تمرین </span>
          </a>
          <a
            href="https://example.com/forum"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-2 justify-center  border rounded-lg transition-colors"
          >
            <MessageCircleQuestion className="h-4 w-4 ml-2 text-purple-400" />
            <span className="text-xs"> پرسش و پاسخ</span>
          </a>
          <a
            href="https://example.com/github"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-2 justify-center  border rounded-lg transition-colors"
          >
            <Github className="h-4 w-4 ml-2 text-amber-400" />
            <span className="text-xs">مخزن گیت‌ هاب</span>
          </a>
        </div>
      </div>
    </div>
  );
}
