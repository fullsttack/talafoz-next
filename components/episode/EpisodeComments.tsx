'use client';

import { useState, useRef } from 'react';
import { MoreVertical, MessageCircle, Heart, Clock, Reply, Edit, Trash, Send, Lock } from 'lucide-react';

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

export default function EpisodeComments({ episodeId, courseId, isLocked = false }: EpisodeCommentsProps) {
  // در یک پروژه واقعی، این داده‌ها از API دریافت می‌شوند
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: 'user1',
      username: 'علی محمدی',
      avatarUrl: 'https://via.placeholder.com/40',
      content: 'این قسمت واقعاً عالی بود! مفاهیم خیلی واضح توضیح داده شدند.',
      createdAt: '1402/12/05 14:30',
      likes: 12,
      userHasLiked: false,
      replies: [
        {
          id: 'reply1',
          userId: 'user2',
          username: 'سارا احمدی',
          avatarUrl: 'https://via.placeholder.com/40',
          content: 'کاملاً موافقم! مخصوصاً بخش مربوط به کار با API ها خیلی مفید بود.',
          createdAt: '1402/12/05 15:15',
          likes: 3,
          userHasLiked: true
        }
      ]
    },
    {
      id: '2',
      userId: 'user3',
      username: 'مهدی رضایی',
      avatarUrl: 'https://via.placeholder.com/40',
      content: 'من یک سوال درباره بخش پیاده‌سازی احراز هویت دارم. آیا می‌توان از روش دیگری هم استفاده کرد؟',
      createdAt: '1402/12/04 10:22',
      likes: 5,
      userHasLiked: true,
      replies: [
        {
          id: 'reply2',
          userId: 'instructor',
          username: 'استاد دوره',
          avatarUrl: 'https://via.placeholder.com/40',
          content: 'بله، شما می‌توانید از JWT هم استفاده کنید. در قسمت بعدی به آن خواهیم پرداخت.',
          createdAt: '1402/12/04 11:30',
          likes: 8,
          userHasLiked: false
        },
        {
          id: 'reply3',
          userId: 'user3',
          username: 'مهدی رضایی',
          avatarUrl: 'https://via.placeholder.com/40',
          content: 'ممنون از پاسخ شما! منتظر قسمت بعدی هستم.',
          createdAt: '1402/12/04 12:15',
          likes: 2,
          userHasLiked: false
        }
      ]
    },
    {
      id: '3',
      userId: 'user4',
      username: 'زهرا کریمی',
      avatarUrl: 'https://via.placeholder.com/40',
      content: 'من این پروژه رو پیاده‌سازی کردم ولی با یک مشکل مواجه شدم. وقتی کاربر لاگین می‌کنه، احیاناً با ارور مواجه میشم. کسی می‌تونه کمک کنه؟',
      createdAt: '1402/12/03 19:45',
      likes: 2,
      userHasLiked: false,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newReplyContent, setNewReplyContent] = useState('');
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
      userId: 'currentUser',
      username: 'شما',
      avatarUrl: 'https://via.placeholder.com/40',
      content: newComment,
      createdAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR').substring(0, 5),
      likes: 0,
      userHasLiked: false,
      replies: []
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  // ارسال پاسخ به نظر
  const handleSubmitReply = (commentId: string) => {
    if (!newReplyContent.trim()) return;
    
    const newReplyObj: Reply = {
      id: `new-reply-${Date.now()}`,
      userId: 'currentUser',
      username: 'شما',
      avatarUrl: 'https://via.placeholder.com/40',
      content: newReplyContent,
      createdAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR').substring(0, 5),
      likes: 0,
      userHasLiked: false
    };
    
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, newReplyObj] } 
        : comment
    ));
    
    setReplyingTo(null);
    setNewReplyContent('');
  };

  // تغییر وضعیت لایک
  const toggleLike = (commentId: string, replyId?: string) => {
    if (replyId) {
      // لایک کردن پاسخ
      setComments(comments.map(comment => {
        if (comment.id !== commentId) return comment;
        
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id !== replyId) return reply;
            
            return {
              ...reply,
              likes: reply.userHasLiked ? reply.likes - 1 : reply.likes + 1,
              userHasLiked: !reply.userHasLiked
            };
          })
        };
      }));
    } else {
      // لایک کردن نظر اصلی
      setComments(comments.map(comment => {
        if (comment.id !== commentId) return comment;
        
        return {
          ...comment,
          likes: comment.userHasLiked ? comment.likes - 1 : comment.likes + 1,
          userHasLiked: !comment.userHasLiked
        };
      }));
    }
  };

  // ویرایش نظر
  const startEditing = (commentId: string, replyId?: string) => {
    setMenuOpenFor(null);
    
    if (replyId) {
      // ویرایش پاسخ
      setComments(comments.map(comment => {
        if (comment.id !== commentId) return comment;
        
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id !== replyId) return reply;
            
            return { ...reply, isEditing: true };
          })
        };
      }));
    } else {
      // ویرایش نظر اصلی
      setComments(comments.map(comment => 
        comment.id === commentId ? { ...comment, isEditing: true } : comment
      ));
    }
  };

  // حذف نظر
  const deleteComment = (commentId: string, replyId?: string) => {
    setMenuOpenFor(null);
    
    if (replyId) {
      // حذف پاسخ
      setComments(comments.map(comment => {
        if (comment.id !== commentId) return comment;
        
        return {
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== replyId)
        };
      }));
    } else {
      // حذف نظر اصلی
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  // ذخیره تغییرات ویرایش
  const saveEdit = (commentId: string, newContent: string, replyId?: string) => {
    if (replyId) {
      // ذخیره تغییرات پاسخ
      setComments(comments.map(comment => {
        if (comment.id !== commentId) return comment;
        
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id !== replyId) return reply;
            
            return { ...reply, content: newContent, isEditing: false };
          })
        };
      }));
    } else {
      // ذخیره تغییرات نظر اصلی
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: newContent, isEditing: false } 
          : comment
      ));
    }
  };

  // رندر کردن منوی عملیات
  const renderActionMenu = (commentId: string, replyId?: string) => {
    return (
      <div ref={menuRef} className="absolute left-0 top-6 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-10 w-28">
        <button
          onClick={() => startEditing(commentId, replyId)} 
          className="w-full text-right px-3 py-1.5 text-sm hover:bg-gray-700 flex items-center"
        >
          <Edit className="h-4 w-4 ml-2" />
          <span>ویرایش</span>
        </button>
        <button
          onClick={() => deleteComment(commentId, replyId)}
          className="w-full text-right px-3 py-1.5 text-sm text-red-400 hover:bg-gray-700 flex items-center"
        >
          <Trash className="h-4 w-4 ml-2" />
          <span>حذف</span>
        </button>
      </div>
    );
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
            برای دسترسی به نظرات این قسمت، لطفاً دوره را خریداری کنید یا اشتراک ویژه تهیه نمایید.
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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-white">نظرات ({comments.length})</h3>
      </div>
      
      {/* فرم ارسال نظر جدید */}
      <div className="bg-gray-800/70 rounded-lg border border-gray-700 p-3 mb-6">
        <textarea
          className="w-full bg-gray-700 rounded-md border border-gray-600 text-white text-sm p-3 h-24 mb-2 placeholder-gray-400 resize-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
          placeholder="نظر خود را درباره این قسمت بنویسید..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className={`flex items-center text-sm px-4 py-2 rounded-md ${
              newComment.trim() 
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            <Send className="h-4 w-4 ml-1 -rotate-90" />
            ارسال نظر
          </button>
        </div>
      </div>
      
      {/* لیست نظرات */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">
          هنوز نظری برای این قسمت ثبت نشده است. اولین نظر را شما ثبت کنید!
        </div>
      ) : (
        <div className="space-y-6 overflow-y-auto flex-grow">
          {comments.map(comment => (
            <div key={comment.id} className="bg-gray-800/70 rounded-lg border border-gray-700 p-4">
              {/* نظر اصلی */}
              <div className="flex">
                <img
                  src={comment.avatarUrl}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full ml-3"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-medium text-white">{comment.username}</span>
                      <span className="text-gray-400 text-xs mr-2 flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        {comment.createdAt}
                      </span>
                    </div>
                    {/* منوی عملیات */}
                    {comment.userId === 'currentUser' && (
                      <div className="relative">
                        <button
                          onClick={() => toggleMenu(comment.id)}
                          className="text-gray-400 hover:text-white p-1"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {menuOpenFor === comment.id && renderActionMenu(comment.id)}
                      </div>
                    )}
                  </div>
                  
                  {/* محتوای نظر */}
                  {comment.isEditing ? (
                    <div className="mt-2">
                      <textarea
                        className="w-full bg-gray-700 rounded-md border border-gray-600 text-white text-sm p-2 mb-2 resize-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                        defaultValue={comment.content}
                        rows={2}
                        autoFocus
                        id={`edit-comment-${comment.id}`}
                      ></textarea>
                      <div className="flex justify-end space-x-2 space-x-reverse">
                        <button
                          onClick={() => saveEdit(comment.id, document.getElementById(`edit-comment-${comment.id}`) as HTMLTextAreaElement ? (document.getElementById(`edit-comment-${comment.id}`) as HTMLTextAreaElement).value : '')}
                          className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
                        >
                          ذخیره
                        </button>
                        <button
                          onClick={() => setComments(comments.map(c => c.id === comment.id ? { ...c, isEditing: false } : c))}
                          className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors"
                        >
                          انصراف
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
                  )}
                  
                  {/* دکمه‌های عملیات */}
                  <div className="flex items-center mt-3 space-x-4 space-x-reverse">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className={`flex items-center text-xs ${comment.userHasLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart className={`h-4 w-4 ml-1 ${comment.userHasLiked ? 'fill-current' : ''}`} />
                      {comment.likes > 0 && comment.likes}
                    </button>
                    
                    <button
                      onClick={() => {
                        setReplyingTo(comment.id);
                        setNewReplyContent('');
                      }}
                      className="flex items-center text-xs text-gray-400 hover:text-blue-400"
                    >
                      <Reply className="h-4 w-4 ml-1" />
                      پاسخ
                    </button>
                  </div>
                  
                  {/* فرم پاسخ به نظر */}
                  {replyingTo === comment.id && (
                    <div className="mt-3 bg-gray-700/50 rounded-md p-3 border border-gray-600">
                      <textarea
                        className="w-full bg-gray-700 rounded-md border border-gray-600 text-white text-sm p-2 h-16 mb-2 resize-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                        placeholder="پاسخ خود را بنویسید..."
                        value={newReplyContent}
                        onChange={(e) => setNewReplyContent(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!newReplyContent.trim()}
                          className={`text-xs px-3 py-1 rounded-md ${
                            newReplyContent.trim() 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          } transition-colors`}
                        >
                          ارسال پاسخ
                        </button>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors"
                        >
                          انصراف
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* پاسخ‌ها */}
              {comment.replies.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-700 mr-12">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="flex mt-3 first:mt-0">
                      <img
                        src={reply.avatarUrl}
                        alt={reply.username}
                        className="w-8 h-8 rounded-full ml-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium text-white text-sm">{reply.username}</span>
                            <span className="text-gray-400 text-xs mr-2 flex items-center">
                              <Clock className="h-3 w-3 ml-1" />
                              {reply.createdAt}
                            </span>
                          </div>
                          {/* منوی عملیات پاسخ */}
                          {reply.userId === 'currentUser' && (
                            <div className="relative">
                              <button
                                onClick={() => toggleMenu(`${comment.id}-${reply.id}`)}
                                className="text-gray-400 hover:text-white p-1"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                              {menuOpenFor === `${comment.id}-${reply.id}` && renderActionMenu(comment.id, reply.id)}
                            </div>
                          )}
                        </div>
                        
                        {/* محتوای پاسخ */}
                        {reply.isEditing ? (
                          <div className="mt-2">
                            <textarea
                              className="w-full bg-gray-700 rounded-md border border-gray-600 text-white text-sm p-2 mb-2 resize-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                              defaultValue={reply.content}
                              rows={2}
                              autoFocus
                              id={`edit-reply-${reply.id}`}
                            ></textarea>
                            <div className="flex justify-end space-x-2 space-x-reverse">
                              <button
                                onClick={() => saveEdit(comment.id, document.getElementById(`edit-reply-${reply.id}`) as HTMLTextAreaElement ? (document.getElementById(`edit-reply-${reply.id}`) as HTMLTextAreaElement).value : '', reply.id)}
                                className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
                              >
                                ذخیره
                              </button>
                              <button
                                onClick={() => {
                                  setComments(comments.map(c => {
                                    if (c.id !== comment.id) return c;
                                    return {
                                      ...c,
                                      replies: c.replies.map(r => r.id === reply.id ? { ...r, isEditing: false } : r)
                                    };
                                  }));
                                }}
                                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-colors"
                              >
                                انصراف
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-300 text-xs mt-1">{reply.content}</p>
                        )}
                        
                        {/* دکمه‌های عملیات پاسخ */}
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => toggleLike(comment.id, reply.id)}
                            className={`flex items-center text-xs ${reply.userHasLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                          >
                            <Heart className={`h-3.5 w-3.5 ml-1 ${reply.userHasLiked ? 'fill-current' : ''}`} />
                            {reply.likes > 0 && reply.likes}
                          </button>
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