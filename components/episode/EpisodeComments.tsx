'use client';

import { useState, useRef } from 'react';
import { Send, ThumbsUp, MessageSquare, MoreVertical, Edit2, Trash2, AlertCircle, User } from 'lucide-react';

interface EpisodeCommentsProps {
  episodeId: string;
  courseId: string;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isAuthor: boolean;
  replies?: Comment[];
  isInstructor?: boolean;
}

export default function EpisodeComments({ episodeId, courseId }: EpisodeCommentsProps) {
  // در یک پروژه واقعی، این داده‌ها از API دریافت می‌شوند
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'instructor1',
      userName: 'استاد محمدی',
      userAvatar: '/avatars/instructor.jpg',
      content: 'دوستان عزیز، اگر سوالی در مورد مطالب این قسمت دارید، می‌توانید در بخش نظرات مطرح کنید.',
      createdAt: '1402/12/01 14:30',
      likes: 12,
      isLiked: false,
      isAuthor: false,
      isInstructor: true
    },
    {
      id: '2',
      userId: 'user1',
      userName: 'علی رضایی',
      userAvatar: '/avatars/user1.jpg',
      content: 'خیلی ممنون از توضیحات کاملتون. یک سوال داشتم در مورد بخش پیاده‌سازی کلاس‌ها، آیا می‌شه از روش دیگه‌ای هم استفاده کرد؟',
      createdAt: '1402/12/02 10:15',
      likes: 3,
      isLiked: true,
      isAuthor: false,
      replies: [
        {
          id: '2-1',
          userId: 'instructor1',
          userName: 'استاد محمدی',
          userAvatar: '/avatars/instructor.jpg',
          content: 'بله، روش‌های دیگری هم وجود دارد. در قسمت بعدی به روش‌های جایگزین هم خواهیم پرداخت.',
          createdAt: '1402/12/02 11:30',
          likes: 2,
          isLiked: false,
          isAuthor: false,
          isInstructor: true
        }
      ]
    },
    {
      id: '3',
      userId: 'user2',
      userName: 'سارا کریمی',
      content: 'من در پیاده‌سازی بخش آخر به مشکل برخوردم. خطای زیر رو دریافت می‌کنم:\n`TypeError: Cannot read property of undefined`\nمی‌تونید راهنمایی کنید؟',
      createdAt: '1402/12/03 16:45',
      likes: 0,
      isLiked: false,
      isAuthor: false
    },
    {
      id: '4',
      userId: 'currentUser',
      userName: 'شما',
      userAvatar: '/avatars/me.jpg',
      content: 'توضیحات این قسمت خیلی کامل و مفید بود. ممنون از زحماتتون.',
      createdAt: '1402/12/04 09:20',
      likes: 1,
      isLiked: false,
      isAuthor: true
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // ارسال نظر جدید
  const submitComment = () => {
    if (newComment.trim() === '') return;
    
    const newCommentObj: Comment = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'شما',
      userAvatar: '/avatars/me.jpg',
      content: newComment,
      createdAt: new Date().toLocaleString('fa-IR'),
      likes: 0,
      isLiked: false,
      isAuthor: true
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  
  // ارسال پاسخ به نظر
  const submitReply = (parentId: string) => {
    if (replyContent.trim() === '') return;
    
    const newReply: Comment = {
      id: `${parentId}-${Date.now()}`,
      userId: 'currentUser',
      userName: 'شما',
      userAvatar: '/avatars/me.jpg',
      content: replyContent,
      createdAt: new Date().toLocaleString('fa-IR'),
      likes: 0,
      isLiked: false,
      isAuthor: true
    };
    
    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    }));
    
    setReplyingTo(null);
    setReplyContent('');
  };
  
  // لایک کردن نظر
  const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  isLiked: !reply.isLiked
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      }));
    }
  };
  
  // شروع ویرایش نظر
  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
    setOpenMenuId(null);
    
    // تمرکز روی تکست‌اریا پس از رندر
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };
  
  // ذخیره تغییرات نظر
  const saveEdit = () => {
    if (editingCommentId && editContent.trim() !== '') {
      setComments(comments.map(comment => {
        if (comment.id === editingCommentId) {
          return { ...comment, content: editContent };
        }
        
        if (comment.replies) {
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === editingCommentId) {
              return { ...reply, content: editContent };
            }
            return reply;
          });
          
          if (updatedReplies.some(reply => reply.id === editingCommentId)) {
            return { ...comment, replies: updatedReplies };
          }
        }
        
        return comment;
      }));
      
      setEditingCommentId(null);
      setEditContent('');
    }
  };
  
  // حذف نظر
  const deleteComment = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== commentId)
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
    
    setOpenMenuId(null);
  };
  
  // رندر منوی عملیات
  const renderActionMenu = (comment: Comment, isReply = false, parentId?: string) => {
    if (!comment.isAuthor) return null;
    
    return (
      <div className="relative">
        <button
          onClick={() => setOpenMenuId(openMenuId === comment.id ? null : comment.id)}
          className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        
        {openMenuId === comment.id && (
          <div className="absolute left-0 mt-1 w-32 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-10">
            <button
              onClick={() => startEditing(comment)}
              className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              <span>ویرایش</span>
            </button>
            <button
              onClick={() => deleteComment(comment.id, isReply, parentId)}
              className="flex items-center w-full px-3 py-2 text-sm text-left text-red-400 hover:bg-gray-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span>حذف</span>
            </button>
          </div>
        )}
      </div>
    );
  };
  
  // رندر آواتار کاربر
  const renderAvatar = (comment: Comment) => {
    if (comment.userAvatar) {
      return (
        <img 
          src={comment.userAvatar} 
          alt={comment.userName} 
          className="h-8 w-8 rounded-full object-cover"
        />
      );
    }
    
    return (
      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
        <User className="h-4 w-4 text-gray-400" />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white">نظرات ({comments.length})</h3>
      </div>
      
      {/* فرم ارسال نظر جدید */}
      <div className="mb-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="نظر خود را بنویسید..."
          className="w-full bg-gray-700 text-white rounded-md p-3 text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-600"
        />
        <div className="flex justify-between items-center mt-3">
          <div className="text-xs text-gray-400">
            <AlertCircle className="h-3.5 w-3.5 inline-block mr-1" />
            نظرات پس از تایید نمایش داده می‌شوند
          </div>
          <button
            onClick={submitComment}
            disabled={newComment.trim() === ''}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>ارسال نظر</span>
          </button>
        </div>
      </div>
      
      {/* لیست نظرات */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهد!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
              {/* سربرگ نظر */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  {renderAvatar(comment)}
                  <div className="ml-2">
                    <div className="flex items-center">
                      <span className="font-medium text-white text-sm">{comment.userName}</span>
                      {comment.isInstructor && (
                        <span className="ml-2 bg-blue-500/20 text-blue-400 text-xs px-1.5 py-0.5 rounded">استاد</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{comment.createdAt}</span>
                  </div>
                </div>
                
                {renderActionMenu(comment)}
              </div>
              
              {/* محتوای نظر */}
              {editingCommentId === comment.id ? (
                <div className="mb-3">
                  <textarea
                    ref={textareaRef}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-md p-3 text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-600 mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs"
                    >
                      ذخیره تغییرات
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-200 whitespace-pre-wrap mb-3">{comment.content}</p>
              )}
              
              {/* دکمه‌های عملیات */}
              <div className="flex items-center gap-4 text-xs">
                <button
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1 ${
                    comment.isLiked ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                  }`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{comment.likes > 0 ? comment.likes : 'پسندیدن'}</span>
                </button>
                
                <button
                  onClick={() => {
                    setReplyingTo(replyingTo === comment.id ? null : comment.id);
                    setReplyContent('');
                  }}
                  className="flex items-center gap-1 text-gray-400 hover:text-blue-400"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>پاسخ</span>
                </button>
              </div>
              
              {/* فرم پاسخ به نظر */}
              {replyingTo === comment.id && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`در پاسخ به ${comment.userName}...`}
                    className="w-full bg-gray-700 text-white rounded-md p-2 text-sm resize-none h-20 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-600"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => submitReply(comment.id)}
                      disabled={replyContent.trim() === ''}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-3 w-3" />
                      <span>ارسال پاسخ</span>
                    </button>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md text-xs"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              )}
              
              {/* پاسخ‌ها */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-700 space-y-3">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="bg-gray-700/30 rounded-lg p-3 border border-gray-700">
                      {/* سربرگ پاسخ */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          {renderAvatar(reply)}
                          <div className="ml-2">
                            <div className="flex items-center">
                              <span className="font-medium text-white text-sm">{reply.userName}</span>
                              {reply.isInstructor && (
                                <span className="ml-2 bg-blue-500/20 text-blue-400 text-xs px-1.5 py-0.5 rounded">استاد</span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400">{reply.createdAt}</span>
                          </div>
                        </div>
                        
                        {renderActionMenu(reply, true, comment.id)}
                      </div>
                      
                      {/* محتوای پاسخ */}
                      {editingCommentId === reply.id ? (
                        <div className="mb-2">
                          <textarea
                            ref={textareaRef}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full bg-gray-700 text-white rounded-md p-2 text-sm resize-none h-20 focus:outline-none focus:ring-1 focus:ring-green-500 border border-gray-600 mb-2"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={saveEdit}
                              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-md text-xs"
                            >
                              ذخیره
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md text-xs"
                            >
                              انصراف
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-200 whitespace-pre-wrap mb-2">{reply.content}</p>
                      )}
                      
                      {/* دکمه‌های عملیات پاسخ */}
                      <div className="flex items-center gap-3 text-xs">
                        <button
                          onClick={() => toggleLike(reply.id, true, comment.id)}
                          className={`flex items-center gap-1 ${
                            reply.isLiked ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{reply.likes > 0 ? reply.likes : 'پسندیدن'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 