"use client";

import { useState, useRef } from "react";
import {
  MoreVertical,
  Heart,
  Clock,
  Reply,
  Edit,
  Trash,
  Send,
  Lock,
} from "lucide-react";
import Image from "next/image";
interface EpisodeCommentsProps {
  episodeId: string;
  courseId: string;
  isLocked?: boolean;
}

interface Comment {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  likes: number;
  userHasLiked: boolean;
  replies: Reply[];
  isEditing?: boolean;
}

interface Reply {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  likes: number;
  userHasLiked: boolean;
  isEditing?: boolean;
}

export default function EpisodeComments({
  isLocked = false,
}: EpisodeCommentsProps) {
  // در یک پروژه واقعی، این داده‌ها از API دریافت می‌شوند
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      userId: "user1",
      username: "علی محمدی",
      avatarUrl: "/avatar/vctrly-notion-people-15.webp",
      content: "این قسمت واقعاً عالی بود! مفاهیم خیلی واضح توضیح داده شدند.",
      createdAt: "1402/12/05",
      likes: 12,
      userHasLiked: false,
      replies: [
        {
          id: "reply1",
          userId: "user2",
          username: "سارا احمدی",
          avatarUrl: "/avatar/vctrly-notion-people-16.webp",
          content:
            "کاملاً موافقم! مخصوصاً بخش مربوط به کار با API ها خیلی مفید بود.",
          createdAt: "1402/12/05",
          likes: 3,
          userHasLiked: true,
        },
      ],
    },
    {
      id: "2",
      userId: "user3",
      username: "مهدی رضایی",
      avatarUrl: "/avatar/vctrly-notion-people-17.webp",
      content:
        "من یک سوال درباره بخش پیاده‌سازی احراز هویت دارم. آیا می‌توان از روش دیگری هم استفاده کرد؟",
      createdAt: "1402/12/04",
      likes: 5,
      userHasLiked: true,
      replies: [
        {
          id: "reply2",
          userId: "instructor",
          username: "استاد دوره",
          avatarUrl: "/avatar/vctrly-notion-people-18.webp",
          content:
            "بله، شما می‌توانید از JWT هم استفاده کنید. در قسمت بعدی به آن خواهیم پرداخت.",
          createdAt: "1402/12/04",
          likes: 8,
          userHasLiked: false,
        },
        {
          id: "reply3",
          userId: "user3",
          username: "مهدی رضایی",
          avatarUrl: "/avatar/vctrly-notion-people-19.webp",
          content: "ممنون از پاسخ شما! منتظر قسمت بعدی هستم.",
          createdAt: "1402/12/04",
          likes: 2,
          userHasLiked: false,
        },
      ],
    },
    {
      id: "3",
      userId: "user4",
      username: "زهرا کریمی",
      avatarUrl: "/avatar/vctrly-notion-people-20.webp",
      content:
        "من این پروژه رو پیاده‌سازی کردم ولی با یک مشکل مواجه شدم. وقتی کاربر لاگین می‌کنه، احیاناً با ارور مواجه میشم. کسی می‌تونه کمک کنه؟",
      createdAt: "1402/12/03",
      likes: 2,
      userHasLiked: false,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // باز و بسته کردن منوی عملیات نظر
  const toggleMenu = (commentId: string) => {
    setMenuOpenFor(menuOpenFor === commentId ? null : commentId);
  };

  // ارسال نظر جدید
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: `new-${Date.now()}`,
      userId: "currentUser",
      username: "شما",
      avatarUrl: "https://via.placeholder.com/40",
      content: newComment,
      createdAt:
        new Date().toLocaleDateString("fa-IR") +
        " " +
        new Date().toLocaleTimeString("fa-IR").substring(0, 5),
      likes: 0,
      userHasLiked: false,
      replies: [],
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  // ارسال پاسخ به نظر
  const handleSubmitReply = (commentId: string) => {
    if (!newReplyContent.trim()) return;

    const newReplyObj: Reply = {
      id: `new-reply-${Date.now()}`,
      userId: "currentUser",
      username: "شما",
      avatarUrl: "https://via.placeholder.com/40",
      content: newReplyContent,
      createdAt:
        new Date().toLocaleDateString("fa-IR") +
        " " +
        new Date().toLocaleTimeString("fa-IR").substring(0, 5),
      likes: 0,
      userHasLiked: false,
    };

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, newReplyObj] }
          : comment
      )
    );

    setReplyingTo(null);
    setNewReplyContent("");
  };

  // تغییر وضعیت لایک
  const toggleLike = (commentId: string, replyId?: string) => {
    if (replyId) {
      // لایک کردن پاسخ
      setComments(
        comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id !== replyId) return reply;

              return {
                ...reply,
                likes: reply.userHasLiked ? reply.likes - 1 : reply.likes + 1,
                userHasLiked: !reply.userHasLiked,
              };
            }),
          };
        })
      );
    } else {
      // لایک کردن نظر اصلی
      setComments(
        comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            likes: comment.userHasLiked ? comment.likes - 1 : comment.likes + 1,
            userHasLiked: !comment.userHasLiked,
          };
        })
      );
    }
  };

  // ویرایش نظر
  const startEditing = (commentId: string, replyId?: string) => {
    setMenuOpenFor(null);

    if (replyId) {
      // ویرایش پاسخ
      setComments(
        comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id !== replyId) return reply;

              return { ...reply, isEditing: true };
            }),
          };
        })
      );
    } else {
      // ویرایش نظر اصلی
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, isEditing: true } : comment
        )
      );
    }
  };

  // حذف نظر
  const deleteComment = (commentId: string, replyId?: string) => {
    setMenuOpenFor(null);

    if (replyId) {
      // حذف پاسخ
      setComments(
        comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== replyId),
          };
        })
      );
    } else {
      // حذف نظر اصلی
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  // ذخیره تغییرات ویرایش
  const saveEdit = (
    commentId: string,
    newContent: string,
    replyId?: string
  ) => {
    if (replyId) {
      // ذخیره تغییرات پاسخ
      setComments(
        comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id !== replyId) return reply;

              return { ...reply, content: newContent, isEditing: false };
            }),
          };
        })
      );
    } else {
      // ذخیره تغییرات نظر اصلی
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: newContent, isEditing: false }
            : comment
        )
      );
    }
  };

  // اگر محتوا قفل باشد، صفحه قفل نمایش داده می‌شود
  if (isLocked) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center p-8">
        <div className="bg-gray-800/90 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-lg flex flex-col items-center max-w-md shadow-2xl">
          <div className="bg-amber-500/30 p-4 rounded-full mb-6 shadow-inner">
            <Lock className="h-12 w-12 text-amber-400" />
          </div>
          <h3 className="text-white text-xl font-bold mb-3">
            دسترسی محدود شده
          </h3>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-xs">
            برای دسترسی به نظرات این قسمت، لطفاً دوره را خریداری کنید یا اشتراک
            ویژه تهیه نمایید.
          </p>
          <div className="flex gap-4 w-full">
            <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white py-3 px-6 rounded-xl text-sm transition-all duration-300 w-1/2 font-medium shadow-lg shadow-amber-600/20 hover:shadow-amber-500/30">
              خرید دوره
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 border border-gray-600/50 text-white py-3 px-6 rounded-xl text-sm transition-all duration-300 w-1/2 font-medium hover:shadow-lg">
              تهیه اشتراک ویژه
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          نظرات ({comments.length})
        </h3>
      </div>

      {/* فرم ارسال نظر جدید */}
      <div className="mb-10">
        <textarea
          className="w-full rounded-2xl border  text-base p-5 h-32 placeholder-gray-500 resize-none  focus:outline-none transition-all duration-300 shadow-sm"
          placeholder="نظر خود را درباره این قسمت بنویسید..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
              newComment.trim() ? "border" : "border text-gray-500"
            }`}
          >
            <Send className="h-5 w-5 ml-2 -rotate-90" />
            ارسال نظر
          </button>
        </div>
      </div>

      {/* لیست نظرات */}
      {comments.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-dashed ">
          <div className="flex flex-col items-center max-w-xs mx-auto">
            <div className="p-4 rounded-full  mb-5 shadow-inner">
              <Heart className="h-10 w-10 text-gray-300 dark:text-gray-600" />
            </div>
            <h4 className=" font-semibold mb-3 text-lg">
              هنوز نظری ثبت نشده است
            </h4>
            <p className=" text-sm leading-relaxed">
              اولین نظر را شما ثبت کنید و به بهبود محتوای دوره کمک کنید!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-10 overflow-y-auto flex-grow pb-10">
          {comments.map((comment) => (
            <div key={comment.id} className="group">
              {/* نظر اصلی */}
              <div className="flex">
                <div className="relative">
                  <div className="rounded-full p-0.5 bg-muted-foreground">
                    <Image
                      width={48}
                      height={48}
                      src={comment.avatarUrl}
                      alt={comment.username}
                      className="w-12 h-12 rounded-full object-cover p-1"
                    />
                  </div>
                  {/* خط عمودی */}
                  {comment.replies.length > 0 && (
                    <div className="absolute top-14 bottom-0 right-[24px] w-0.5 bg-gradient-to-b from-purple-100 to-gray-100 dark:from-gray-500 dark:to-gray-700 z-0"></div>
                  )}
                </div>

                <div className="flex-1 mr-4">
                  <div className=" rounded-2xl p-5 border  shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <span className="font-bold  text-base">
                          {comment.username}
                        </span>
                        <span className="text-gray-400 text-xs flex items-center mt-1">
                          <Clock className="h-3 w-3 ml-1.5" />
                          {comment.createdAt}
                        </span>
                      </div>
                      {/* منوی عملیات */}
                      {comment.userId === "currentUser" && (
                        <div className="relative">
                          <button
                            onClick={() => toggleMenu(comment.id)}
                            className=" p-2 rounded-full  transition-all duration-300 opacity-0 group-hover:opacity-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {menuOpenFor === comment.id && (
                            <div
                              ref={menuRef}
                              className="absolute left-0 top-8 border bg-foreground rounded-xl shadow-xl py-1 z-10 w-36  overflow-hidden"
                            >
                              <button
                                onClick={() => startEditing(comment.id)}
                                className="w-full text-right px-4 py-2.5 text-sm text-background hover:text-green-500 flex items-center transition-colors"
                              >
                                <Edit className="h-4 w-4 ml-2 " />
                                <span>ویرایش</span>
                              </button>
                              <button
                                onClick={() => deleteComment(comment.id)}
                                className="w-full text-right px-4 py-2.5 text-sm text-background hover:text-red-500 flex items-center transition-colors"
                              >
                                <Trash className="h-4 w-4 ml-2" />
                                <span>حذف</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* محتوای نظر */}
                    {comment.isEditing ? (
                      <div>
                        <textarea
                          className="w-full rounded-xl border  text-base p-4 mb-3 resize-none  focus:outline-none"
                          defaultValue={comment.content}
                          rows={3}
                          autoFocus
                          id={`edit-comment-${comment.id}`}
                        ></textarea>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              saveEdit(
                                comment.id,
                                (document.getElementById(
                                  `edit-comment-${comment.id}`
                                ) as HTMLTextAreaElement)
                                  ? (
                                      document.getElementById(
                                        `edit-comment-${comment.id}`
                                      ) as HTMLTextAreaElement
                                    ).value
                                  : ""
                              )
                            }
                            className="text-sm border hover:text-green-500 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                          >
                            ذخیره
                          </button>
                          <button
                            onClick={() =>
                              setComments(
                                comments.map((c) =>
                                  c.id === comment.id
                                    ? { ...c, isEditing: false }
                                    : c
                                )
                              )
                            }
                            className="text-sm border hover:text-red-500 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                          >
                            انصراف
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500  text-sm leading-7">
                        {comment.content}
                      </p>
                    )}

                    {/* دکمه‌های عملیات */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                      <div className="flex gap-5">
                        <button
                          onClick={() => toggleLike(comment.id)}
                          className={`flex items-center text-sm transition-colors group/like`}
                        >
                          <div
                            className={`flex items-center justify-center p-1.5 rounded-full transition-colors ${
                              comment.userHasLiked
                                ? "bg-red-50 dark:bg-red-900/20 text-red-500"
                                : "text-gray-400 group-hover/like:text-red-500 group-hover/like:bg-red-50 dark:group-hover/like:bg-red-900/20"
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                comment.userHasLiked ? "fill-current" : ""
                              }`}
                            />
                          </div>
                          {comment.likes > 0 && (
                            <span
                              className={`text-xs mr-1.5 transition-colors ${
                                comment.userHasLiked
                                  ? "text-red-500"
                                  : "text-gray-500 group-hover/like:text-red-500"
                              }`}
                            >
                              {comment.likes}
                            </span>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            setReplyingTo(comment.id);
                            setNewReplyContent("");
                          }}
                          className="flex items-center text-sm text-gray-500 hover:text-green-500 transition-colors group/reply"
                        >
                          <div className="flex items-center justify-center p-1.5 rounded-full group-hover/reply:bg-purple-50 dark:group-hover/reply:bg-purple-900/20 transition-colors">
                            <Reply className="h-4 w-4" />
                          </div>
                          <span className="text-xs mr-1.5">پاسخ</span>
                        </button>
                      </div>

                      {/* نمایش تعداد پاسخ‌ها */}
                      {comment.replies.length > 0 && (
                        <span className="text-xs  py-1 border rounded-md px-4">
                          {comment.replies.length} پاسخ
                        </span>
                      )}
                    </div>
                  </div>

                  {/* فرم پاسخ به نظر */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 mr-5">
                      <div className="flex">
                        <div className=" rounded-2xl p-4 border  shadow-sm flex-1">
                          <textarea
                            className="w-full rounded-xl border  text-sm p-3 h-24 resize-none  focus:outline-none"
                            placeholder="پاسخ خود را بنویسید..."
                            value={newReplyContent}
                            onChange={(e) => setNewReplyContent(e.target.value)}
                          ></textarea>
                          <div className="flex justify-end gap-2 mt-3">
                            <button
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={!newReplyContent.trim()}
                              className={`text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
                                newReplyContent.trim()
                                  ? "border cursor-pointer hover:text-green-500"
                                  : "border text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              ارسال پاسخ
                            </button>
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="text-sm  border hover:text-red-500 cursor-pointer px-4 py-2 rounded-lg transition-colors"
                            >
                              انصراف
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* پاسخ‌ها */}
              {comment.replies.length > 0 && (
                <div className="mr-[52px] space-y-5 mt-5">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="group">
                      <div className="flex">
                        <div className="relative">
                          <div className="rounded-full p-0.5 bg-muted-foreground">
                            <Image
                              width={48}
                              height={48}
                              src={comment.avatarUrl}
                              alt={comment.username}
                              className="w-12 h-12 rounded-full object-cover p-1"
                            />
                          </div>
                          {/* خط عمودی */}
                          {comment.replies.length > 0 && (
                            <div className="absolute top-14 bottom-0 right-[24px] w-0.5 bg-gradient-to-b from-purple-100 to-gray-100 dark:from-gray-500 dark:to-gray-700 z-0"></div>
                          )}
                        </div>
                        <div className="flex-1 mr-3">
                          <div className=" rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex flex-col">
                                <span className="font-semibold  text-sm">
                                  {reply.username}
                                </span>
                                <span className="text-gray-500 text-xs flex items-center mt-0.5">
                                  <Clock className="h-3 w-3 ml-1" />
                                  {reply.createdAt}
                                </span>
                              </div>
                              {/* منوی عملیات پاسخ */}
                              {reply.userId === "currentUser" && (
                                <div className="relative">
                                  <button
                                    onClick={() =>
                                      toggleMenu(`${comment.id}-${reply.id}`)
                                    }
                                    className="text-gray-500 border  p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </button>
                                  {menuOpenFor ===
                                    `${comment.id}-${reply.id}` && (
                                    <div
                                      ref={menuRef}
                                      className="absolute left-0 top-8 border  rounded-xl shadow-xl py-1 z-10 w-36  overflow-hidden"
                                    >
                                      <button
                                        onClick={() =>
                                          startEditing(comment.id, reply.id)
                                        }
                                        className="w-full text-right px-4 py-2.5 text-sm border cursor-pointer hover:text-green-500 flex items-center transition-colors"
                                      >
                                        <Edit className="h-4 w-4 ml-2 text-gray-400" />
                                        <span>ویرایش</span>
                                      </button>
                                      <button
                                        onClick={() =>
                                          deleteComment(comment.id, reply.id)
                                        }
                                        className="w-full text-right px-4 py-2.5 text-sm  flex items-center cursor-pointer hover:text-red-500 transition-colors"
                                      >
                                        <Trash className="h-4 w-4 ml-2" />
                                        <span>حذف</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* محتوای پاسخ */}
                            {reply.isEditing ? (
                              <div>
                                <textarea
                                  className="w-full rounded-xl border  text-sm p-3 mb-3 resize-none   focus:outline-none"
                                  defaultValue={reply.content}
                                  rows={2}
                                  autoFocus
                                  id={`edit-reply-${reply.id}`}
                                ></textarea>
                                <div className="flex justify-end space-x-2 space-x-reverse">
                                  <button
                                    onClick={() =>
                                      saveEdit(
                                        comment.id,
                                        (document.getElementById(
                                          `edit-reply-${reply.id}`
                                        ) as HTMLTextAreaElement)
                                          ? (
                                              document.getElementById(
                                                `edit-reply-${reply.id}`
                                              ) as HTMLTextAreaElement
                                            ).value
                                          : "",
                                        reply.id
                                      )
                                    }
                                    className="text-xs  border hover:text-green-500  cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-300"
                                  >
                                    ذخیره
                                  </button>
                                  <button
                                    onClick={() => {
                                      setComments(
                                        comments.map((c) => {
                                          if (c.id !== comment.id) return c;
                                          return {
                                            ...c,
                                            replies: c.replies.map((r) =>
                                              r.id === reply.id
                                                ? { ...r, isEditing: false }
                                                : r
                                            ),
                                          };
                                        })
                                      );
                                    }}
                                    className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors"
                                  >
                                    انصراف
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-500 text-xs leading-6">
                                {reply.content}
                              </p>
                            )}

                            {/* دکمه‌های عملیات پاسخ */}
                            <div className="flex items-center mt-3 pt-3 border-t ">
                              <button
                                onClick={() => toggleLike(comment.id, reply.id)}
                                className={`flex items-center text-xs transition-colors group/like`}
                              >
                                <div
                                  className={`flex items-center justify-center p-1.5 rounded-full transition-colors ${
                                    reply.userHasLiked
                                      ? "bg-red-50 dark:bg-red-900/20 text-red-500"
                                      : "text-gray-400 group-hover/like:text-red-500 group-hover/like:bg-red-50 dark:group-hover/like:bg-red-900/20"
                                  }`}
                                >
                                  <Heart
                                    className={`h-3.5 w-3.5 ${
                                      reply.userHasLiked ? "fill-current" : ""
                                    }`}
                                  />
                                </div>
                                {reply.likes > 0 && (
                                  <span
                                    className={`text-xs mr-1.5 transition-colors ${
                                      reply.userHasLiked
                                        ? "text-red-500"
                                        : "text-gray-500 group-hover/like:text-red-500"
                                    }`}
                                  >
                                    {reply.likes}
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
