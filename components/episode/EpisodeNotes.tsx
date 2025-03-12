'use client';

import { useState, useEffect } from 'react';
import { Clock, Plus, Trash2, Edit2, Save, X, Lock } from 'lucide-react';

interface EpisodeNotesProps {
  episodeId: string;
  courseId: string;
  currentTime: number;
  isLocked?: boolean;
}

interface Note {
  id: string;
  content: string;
  timestamp: number;
  createdAt: Date;
}

export default function EpisodeNotes({ episodeId, currentTime, isLocked = false }: EpisodeNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // در یک پروژه واقعی، این داده‌ها از API دریافت می‌شوند
  useEffect(() => {
    // شبیه‌سازی دریافت یادداشت‌ها از سرور
    const mockNotes: Note[] = [
      {
        id: '1',
        content: 'توضیحات مربوط به ساختار کلاس‌ها در این بخش بسیار مفید بود.',
        timestamp: 125, // 2:05
        createdAt: new Date(Date.now() - 86400000), // دیروز
      },
      {
        id: '2',
        content: 'نکته مهم: استفاده از async/await برای مدیریت عملیات‌های ناهمگام.',
        timestamp: 360, // 6:00
        createdAt: new Date(Date.now() - 3600000), // یک ساعت پیش
      },
    ];
    
    setNotes(mockNotes);
  }, [episodeId]);

  // تبدیل ثانیه به فرمت mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // افزودن یادداشت جدید
  const addNote = () => {
    if (newNote.trim() === '') return;
    
    const newNoteObj: Note = {
      id: Date.now().toString(),
      content: newNote,
      timestamp: Math.floor(currentTime),
      createdAt: new Date(),
    };
    
    setNotes([newNoteObj, ...notes]);
    setNewNote('');
  };

  // حذف یادداشت
  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // شروع ویرایش یادداشت
  const startEditing = (note: Note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  // ذخیره تغییرات یادداشت
  const saveEdit = () => {
    if (editingNoteId && editContent.trim() !== '') {
      setNotes(notes.map(note => 
        note.id === editingNoteId 
          ? { ...note, content: editContent } 
          : note
      ));
      setEditingNoteId(null);
    }
  };

  // لغو ویرایش
  const cancelEdit = () => {
    setEditingNoteId(null);
  };

  // مرتب‌سازی یادداشت‌ها بر اساس زمان ویدیو
  const sortedNotes = [...notes].sort((a, b) => a.timestamp - b.timestamp);

  // اگر محتوا قفل باشد، صفحه قفل نمایش داده می‌شود
  if (isLocked) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center p-8">
        <div className=" p-6 rounded-lg border flex flex-col items-center max-w-md">
          <div className="bg-yellow-500/20 p-3 rounded-full mb-4">
            <Lock className="h-12 w-12 text-yellow-500" />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">دسترسی محدود شده</h3>
          <p className="text-gray-300 text-sm mb-4">
            برای دسترسی به یادداشت‌های این قسمت، لطفاً دوره را خریداری کنید یا اشتراک ویژه تهیه نمایید.
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
      {/* فرم افزودن یادداشت جدید */}
      <div className="mb-4  rounded-lg p-3 border ">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4 " />
          <span className="text-sm ">
            افزودن یادداشت در {formatTime(currentTime)}
          </span>
        </div>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="یادداشت خود را اینجا بنویسید..."
          className="w-full  rounded-md p-2 text-sm resize-none h-20  border "
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={addNote}
            disabled={newNote.trim() === ''}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className='text-xs'>افزودن یادداشت</span>
          </button>
        </div>
      </div>

      {/* لیست یادداشت‌ها */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-500 mb-2">یادداشت‌های شما ({notes.length})</h3>
        
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            هنوز یادداشتی ثبت نکرده‌اید.
          </div>
        ) : (
          <div className="space-y-3">
            {sortedNotes.map(note => (
              <div key={note.id} className=" rounded-lg p-3 border">
                {editingNoteId === note.id ? (
                  // حالت ویرایش
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full text-gray-500 rounded-md p-2 text-sm resize-none h-20  border  mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-md text-xs"
                      >
                        <Save className="h-3 w-3" />
                        <span>ذخیره</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1 border text-gray-500 px-2 py-1 rounded-md text-xs"
                      >
                        <X className="h-3 w-3" />
                        <span>انصراف</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // حالت نمایش
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <button 
                          className="flex items-center justify-center bg-green-600/20 text-green-600 rounded px-1.5 py-0.5 text-xs hover:bg-green-600/30 transition-colors"
                          title="پرش به این زمان"
                        >
                          <Clock className="h-3 w-3 mr-0.5" />
                          {formatTime(note.timestamp)}
                        </button>
                        <span className="text-xs text-gray-400">
                          {new Date(note.createdAt).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEditing(note)}
                          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
                          title="ویرایش"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-gray-700 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 whitespace-pre-wrap">{note.content}</p>
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