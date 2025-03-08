'use client'

import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface CartBlogProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  publishDate: string;
  readTime: string;
  isFeatured?: boolean;
}

export default function CartBlog({
  title,
  excerpt,
  slug,
  coverImage,
  author,
  category,
  publishDate,
  readTime,
  isFeatured = false
}: CartBlogProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card className="h-full overflow-hidden border transition-colors hover:bg-muted/50">
        <div className="relative aspect-[12/7] overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className=" transition-transform duration-300 group-hover:scale-105"
          />
          
          {isFeatured && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-primary">مقاله ویژه</Badge>
            </div>
          )}
          
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="outline" className="bg-black/40 backdrop-blur-sm text-white border-white/10">
              {category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-5">
          <h3 className="font-bold text-xl mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-2 mb-4 text-sm">
            {excerpt}
          </p>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{publishDate}</span>
            </div>
            <span className="text-muted-foreground/30">|</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-5 py-4 border-t flex justify-between items-center">
          <div className="flex items-center gap-2">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="text-sm">{author.name}</span>
          </div>
          
          <div className="text-primary flex items-center text-sm font-medium">
            <span>ادامه مطلب</span>
            <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
