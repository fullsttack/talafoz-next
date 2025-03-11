'use client';

import { useState, useEffect } from 'react';
import { Save, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Note {
  id: string;
  content: string;
  timestamp: number;
  episodeId: string;
  courseId: string;
  timestampFormatted?: string;
}

interface EpisodeNotesProps {
  episodeId: string;
  courseId: string;
  currentTime?: number;
}

export default function EpisodeNotes({ episodeId, courseId, currentTime = 0 }: EpisodeNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`course_${courseId}_episode_${episodeId}_notes`);
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes) as Note[];
        // Add formatted timestamp
        const notesWithFormatted = parsedNotes.map(note => ({
          ...note,
          timestampFormatted: formatVideoTime(note.timestamp)
        }));
        setNotes(notesWithFormatted);
      } catch (error) {
        console.error('Error parsing saved notes:', error);
      }
    }
  }, [courseId, episodeId]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(
        `course_${courseId}_episode_${episodeId}_notes`,
        JSON.stringify(notes)
      );
    }
  }, [notes, courseId, episodeId]);

  // Format video time (seconds) to MM:SS
  const formatVideoTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Add a new note
  const addNote = () => {
    if (!newNote.trim()) return;
    
    const timestamp = currentTime || 0;
    const newNoteObj: Note = {
      id: Date.now().toString(),
      content: newNote,
      timestamp,
      timestampFormatted: formatVideoTime(timestamp),
      episodeId,
      courseId
    };

    setNotes(prev => [...prev, newNoteObj]);
    setNewNote('');
  };

  // Delete a note
  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (editingNoteId === id) {
      setEditingNoteId(null);
    }
  };

  // Start editing a note
  const startEditNote = (note: Note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  // Save edited note
  const saveEditedNote = () => {
    if (!editingNoteId) return;
    
    setNotes(prev => 
      prev.map(note => 
        note.id === editingNoteId 
          ? { ...note, content: editContent } 
          : note
      )
    );
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder="یادداشت خود را وارد کنید..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="min-h-[100px] resize-y"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            زمان فعلی: {formatVideoTime(currentTime || 0)}
          </span>
          <Button 
            onClick={addNote}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
          >
            ذخیره یادداشت
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-3">یادداشت‌های شما</h3>
        
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">هنوز یادداشتی ثبت نکرده‌اید.</p>
        ) : (
          <div className="space-y-3">
            {notes.map(note => (
              <div 
                key={note.id} 
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                {editingNoteId === note.id ? (
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
                        onClick={() => setEditingNoteId(null)}
                      >
                        انصراف
                      </Button>
                      <Button 
                        size="sm"
                        onClick={saveEditedNote}
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                      >
                        <Save className="h-4 w-4 ml-1" />
                        ذخیره
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                        {note.timestampFormatted}
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => startEditNote(note)}
                          className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteNote(note.id)}
                          className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{note.content}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 