"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "./magic-card";
import { useTheme } from "next-themes";

export function MagicCardDemo() {
  const { theme } = useTheme();
  return (
    <Card>
      <MagicCard 
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        gradientFrom="#4F46E5"
        gradientTo="#14B8A6"
      >
        <CardHeader>
          <CardTitle>Latest Courses</CardTitle>
          <CardDescription>
            Explore our newest educational offerings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Course 1 */}
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <div className="h-14 w-14 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10v2H7z"/><path d="M7 11h10v2H7z"/><path d="M7 15h4v2H7z"/></svg>
              </div>
              <div>
                <h3 className="font-medium">Web Development Fundamentals</h3>
                <p className="text-sm text-muted-foreground mt-1">Learn HTML, CSS and JavaScript basics</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    8 weeks
                  </span>
                  <span>•</span>
                  <span>Beginner</span>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <div className="h-14 w-14 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19c-4.3 0-7.8-3.4-7.8-7.8 0-2 .8-3.8 2.1-5.1.6-.6 1.5-.6 2.1 0l.6.6c.6.6.6 1.5 0 2.1l-.6.6c-.6.6-.6 1.5 0 2.1l1.6 1.6c.6.6 1.5.6 2.1 0l.6-.6c.6-.6 1.5-.6 2.1 0l.6.6c.6.6.6 1.5 0 2.1-1.4 1.3-3.2 2.1-5.2 2.1"/><path d="M12 19V5"/><path d="M8 19v-3"/><path d="M16 19v-3"/></svg>
              </div>
              <div>
                <h3 className="font-medium">React & Next.js Masterclass</h3>
                <p className="text-sm text-muted-foreground mt-1">Build modern web applications with React</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    10 weeks
                  </span>
                  <span>•</span>
                  <span>Intermediate</span>
                </div>
              </div>
            </div>

            {/* Course 3 */}
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <div className="h-14 w-14 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M12 8v7"/><path d="M8.2 10.2l7.6 7.6"/><path d="M15.8 10.2l-7.6 7.6"/></svg>
              </div>
              <div>
                <h3 className="font-medium">UI/UX Design Principles</h3>
                <p className="text-sm text-muted-foreground mt-1">Design beautiful and functional user interfaces</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    6 weeks
                  </span>
                  <span>•</span>
                  <span>All levels</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View All Courses</Button>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
