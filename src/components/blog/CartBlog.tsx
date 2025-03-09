import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, EyeIcon, TagIcon } from "lucide-react";

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  viewCount: number;
  imageUrl: string;
  slug: string;
}

export default function CartBlog({
  id,
  title,
  description,
  category,
  tags,
  readTime,
  date,
  viewCount,
  imageUrl,
  slug,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={id <= 3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Badge className="absolute right-3 top-3 bg-primary/90 font-medium hover:bg-primary">
            {category}
          </Badge>
        </div>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="line-clamp-2 text-lg font-bold transition-colors duration-300 group-hover:text-primary">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CardDescription className="line-clamp-3 text-sm text-muted-foreground">
            {description}
          </CardDescription>
          
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <TagIcon className="h-4 w-4 text-muted-foreground" />
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <EyeIcon className="h-3.5 w-3.5" />
            <span>{viewCount.toLocaleString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
