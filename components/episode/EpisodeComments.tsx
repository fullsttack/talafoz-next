'use client';

import { useState, useEffect } from 'react';
import { Send, ThumbsUp, Flag, MoreVertical, Reply, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isInstructor?: boolean;
  };
  likes: number;
  userLiked?: boolean;
  replies?: Comment[];
  parentId?: string | null;
}

interface EpisodeCommentsProps {
  episodeId: string;
  courseId: string;
}

export default function EpisodeComments({ episodeId, courseId }: EpisodeCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  // Current user for demonstration
  const currentUser = {
    id: 'current-user',
    name: 'محمد رضایی',
    avatar: 'https://i.pravatar.cc/150?img=8'
  };

  // Mock instructor for demonstration
  const instructor = {
    id: 'instructor',
    name: 'استاد علی محمدی',
    avatar: 'https://i.pravatar.cc/150?img=10',
    isInstructor: true
  };

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem(`course_${courseId}_episode_${episodeId}_comments`);
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (error) {
        console.error('Error parsing saved comments:', error);
      }
    } else {
      // Generate mock comments if none exist
      const mockComments: Comment[] = [
        {
          id: '1',
          content: 'این اپیزود خیلی مفید بود! لطفا در مورد کاربردهای عملی بیشتر توضیح دهید.',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          author: {
            id: 'user1',
            name: 'سارا احمدی',
            avatar: 'https://i.pravatar.cc/150?img=5'
          },
          likes: 3,
          replies: [
            {
              id: '3',
              content: 'ممنون از نظر شما. در اپیزود بعدی به کاربردهای عملی‌تر می‌پردازیم.',
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              author: instructor,
              likes: 1,
              parentId: '1'
            }
          ]
        },
        {
          id: '2',
          content: 'آیا می‌توان از این تکنیک در پروژه‌های بزرگ هم استفاده کرد؟',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          author: {
            id: 'user2',
            name: 'امیر حسینی',
            avatar: 'https://i.pravatar.cc/150?img=7'
          },
          likes: 0,
          replies: []
        }
      ];
      
      setComments(mockComments);
      localStorage.setItem(
        `course_${courseId}_episode_${episodeId}_comments`,
        JSON.stringify(mockComments)
      );
    }
  }, [courseId, episodeId]);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(
        `course_${courseId}_episode_${episodeId}_comments`,
        JSON.stringify(comments)
      );
    }
  }, [comments, courseId, episodeId]);

  // Add a new comment
  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      createdAt: new Date().toISOString(),
      author: currentUser,
      likes: 0,
      replies: []
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  // Toggle liking a comment
  const toggleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    setComments(prev => 
      prev.map(comment => {
        if (!isReply && comment.id === commentId) {
          // Toggle like on main comment
          return { 
            ...comment, 
            likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
            userLiked: !comment.userLiked
          };
        } else if (isReply && parentId && comment.id === parentId) {
          // Toggle like on a reply
          return {
            ...comment,
            replies: comment.replies?.map(reply => 
              reply.id === commentId 
                ? {
                    ...reply,
                    likes: reply.userLiked ? reply.likes - 1 : reply.likes + 1,
                    userLiked: !reply.userLiked
                  }
                : reply
            )
          };
        }
        return comment;
      })
    );
  };

  // Add a reply to a comment
  const addReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    
    const reply: Comment = {
      id: Date.now().toString(),
      content: replyContent,
      createdAt: new Date().toISOString(),
      author: currentUser,
      likes: 0,
      parentId
    };

    setComments(prev => 
      prev.map(comment => 
        comment.id === parentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), reply]
            }
          : comment
      )
    );

    setReplyingTo(null);
    setReplyContent('');
  };

  // Delete a comment
  const deleteComment = (commentId: string, isReply = false, parentId?: string) => {
    if (!isReply) {
      // Delete main comment
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } else if (parentId) {
      // Delete reply
      setComments(prev => 
        prev.map(comment => 
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies?.filter(reply => reply.id !== commentId)
              }
            : comment
        )
      );
    }
  };

  // Start editing a comment
  const startEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  // Save edited comment
  const saveEditedComment = (commentId: string, isReply = false, parentId?: string) => {
    if (!editContent.trim()) return;
    
    if (!isReply) {
      // Edit main comment
      setComments(prev => 
        prev.map(comment => 
          comment.id === commentId
            ? { ...comment, content: editContent }
            : comment
        )
      );
    } else if (parentId) {
      // Edit reply
      setComments(prev => 
        prev.map(comment => 
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies?.map(reply => 
                  reply.id === commentId
                    ? { ...reply, content: editContent }
                    : reply
                )
              }
            : comment
        )
      );
    }
    
    setEditingCommentId(null);
    setEditContent('');
  };

  // Format date to Persian style
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Simple formatting - in a real app would use a Persian date formatter
    return date.toLocaleDateString('fa-IR');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">نظرات</h3>
      
      {/* Add new comment form */}
      <div className="space-y-3">
        <Textarea
          placeholder="نظر خود را بنویسید..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[120px] resize-y"
        />
        <div className="flex justify-end">
          <Button 
            onClick={addComment}
            disabled={!newComment.trim()}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
          >
            <Send className="h-4 w-4 ml-1" />
            ارسال نظر
          </Button>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6 mt-8">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">هنوز نظری برای این اپیزود ثبت نشده است.</p>
        ) : (
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="space-y-3">
                {/* Main comment */}
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <div className="flex items-start gap-3">
                    {/* Author avatar */}
                    <div className="shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        {comment.author.avatar ? (
                          <img 
                            src={comment.author.avatar} 
                            alt={comment.author.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-300 dark:bg-gray-600" />
                        )}
                      </div>
                    </div>
                    
                    {/* Comment content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {comment.author.name}
                          </span>
                          {comment.author.isInstructor && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-400 text-xs rounded-full">
                              استاد
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      
                      {editingCommentId === comment.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="min-h-[80px] resize-y"
                          />
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingCommentId(null)}
                            >
                              انصراف
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => saveEditedComment(comment.id)}
                              disabled={!editContent.trim()}
                              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                            >
                              ذخیره
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Comment actions */}
                  {!editingCommentId && (
                    <div className="flex items-center justify-between mt-4 pr-12">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleLikeComment(comment.id)}
                          className={`flex items-center gap-1 text-sm ${
                            comment.userLiked
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </button>
                        
                        <button 
                          onClick={() => setReplyingTo(comment.id)}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <Reply className="h-4 w-4" />
                          <span>پاسخ</span>
                        </button>
                        
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                          <Flag className="h-4 w-4" />
                          <span>گزارش</span>
                        </button>
                      </div>
                      
                      {/* Actions dropdown (only for user's own comments) */}
                      {comment.author.id === currentUser.id && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => startEditComment(comment)}>
                              <Edit className="h-4 w-4 mr-2" />
                              ویرایش
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteComment(comment.id)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Reply form */}
                {replyingTo === comment.id && (
                  <div className="pr-12 space-y-2">
                    <Textarea
                      placeholder="پاسخ خود را بنویسید..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="min-h-[80px] resize-y"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setReplyingTo(null)}
                      >
                        انصراف
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => addReply(comment.id)}
                        disabled={!replyContent.trim()}
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                      >
                        ارسال پاسخ
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="space-y-3 pr-12">
                    {comment.replies.map(reply => (
                      <div 
                        key={reply.id} 
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950"
                      >
                        <div className="flex items-start gap-3">
                          {/* Author avatar */}
                          <div className="shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                              {reply.author.avatar ? (
                                <img 
                                  src={reply.author.avatar} 
                                  alt={reply.author.name} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-gray-300 dark:bg-gray-600" />
                              )}
                            </div>
                          </div>
                          
                          {/* Reply content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {reply.author.name}
                                </span>
                                {reply.author.isInstructor && (
                                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-400 text-xs rounded-full">
                                    استاد
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">
                                {formatDate(reply.createdAt)}
                              </span>
                            </div>
                            
                            {editingCommentId === reply.id ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  className="min-h-[80px] resize-y"
                                />
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setEditingCommentId(null)}
                                  >
                                    انصراف
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => saveEditedComment(reply.id, true, comment.id)}
                                    disabled={!editContent.trim()}
                                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                                  >
                                    ذخیره
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                {reply.content}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Reply actions */}
                        {!editingCommentId && (
                          <div className="flex items-center justify-between mt-2 pr-10">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => toggleLikeComment(reply.id, true, comment.id)}
                                className={`flex items-center gap-1 text-xs ${
                                  reply.userLiked
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                              >
                                <ThumbsUp className="h-3 w-3" />
                                <span>{reply.likes}</span>
                              </button>
                              
                              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <Flag className="h-3 w-3" />
                                <span>گزارش</span>
                              </button>
                            </div>
                            
                            {/* Actions dropdown (only for user's own replies) */}
                            {reply.author.id === currentUser.id && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <MoreVertical className="h-3 w-3" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => startEditComment(reply)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    ویرایش
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => deleteComment(reply.id, true, comment.id)}
                                    className="text-red-600 dark:text-red-400"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    حذف
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 