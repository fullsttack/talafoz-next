"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, MessageSquare, Star, Users } from "lucide-react";
import { InstructorType } from "@/types/course";

interface CourseInstructorSectionProps {
  instructor: InstructorType;
}

export default function CourseInstructorSection({ instructor }: CourseInstructorSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>مدرس دوره</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="w-24 h-24 border-2 border-primary/10">
              <AvatarImage src={instructor.avatar} alt={instructor.name} />
              <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold mt-3">{instructor.name}</h3>
            <p className="text-sm text-muted-foreground">{instructor.role}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <StatBadge icon={GraduationCap} label={`${instructor.courses} دوره`} />
              <StatBadge icon={Users} label={`${instructor.students.toLocaleString('fa-IR')} دانشجو`} />
              <StatBadge icon={Star} label={`${instructor.rating} امتیاز`} />
            </div>
            
            <Button variant="outline" className="mt-4 gap-2" size="sm">
              <MessageSquare className="w-4 h-4" />
              <span>ارسال پیام به مدرس</span>
            </Button>
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium mb-2">درباره مدرس</h4>
            <p className="text-muted-foreground text-justify leading-relaxed">
              {instructor.bio}
            </p>
            
            {instructor.socialLinks && (
              <div className="flex gap-2 mt-4">
                {Object.entries(instructor.socialLinks).map(([platform, url]) => (
                  url && (
                    <a 
                      key={platform} 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatBadgeProps {
  icon: any;
  label: string;
}

function StatBadge({ icon: Icon, label }: StatBadgeProps) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </Badge>
  );
} 