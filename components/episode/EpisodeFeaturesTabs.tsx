'use client';

import { useState } from 'react';
import { BookOpen, FileText, Paperclip, MessageSquare } from 'lucide-react';
import EpisodeNotes from './EpisodeNotes';
import EpisodeAssignments from './EpisodeAssignments';
import EpisodeAttachments from './EpisodeAttachments';
import EpisodeComments from './EpisodeComments';

interface EpisodeFeaturesTabsProps {
  episodeId: string;
  courseId: string;
  currentTime?: number;
}

type TabType = 'notes' | 'assignments' | 'attachments' | 'comments';

export default function EpisodeFeaturesTabs({ 
  episodeId, 
  courseId, 
  currentTime = 0 
}: EpisodeFeaturesTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('notes');

  const tabs = [
    { id: 'notes', label: 'یادداشت‌ها', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'assignments', label: 'تمرین‌ها', icon: <FileText className="h-4 w-4" /> },
    { id: 'attachments', label: 'فایل‌های ضمیمه', icon: <Paperclip className="h-4 w-4" /> },
    { id: 'comments', label: 'نظرات', icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <div className="mt-8">
      {/* Tabs Navigation */}
      <div className="border-b ">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'notes' && (
          <EpisodeNotes 
            episodeId={episodeId} 
            courseId={courseId} 
            currentTime={currentTime} 
          />
        )}
        
        {activeTab === 'assignments' && (
          <EpisodeAssignments 
            episodeId={episodeId} 
            courseId={courseId} 
          />
        )}
        
        {activeTab === 'attachments' && (
          <EpisodeAttachments 
            episodeId={episodeId} 
            courseId={courseId} 
          />
        )}
        
        {activeTab === 'comments' && (
          <EpisodeComments 
            episodeId={episodeId} 
            courseId={courseId} 
          />
        )}
      </div>
    </div>
  );
} 