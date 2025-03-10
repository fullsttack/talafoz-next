"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Star, MessageSquare, ThumbsUp, Flag } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}

interface CourseReviewsSectionProps {
  courseId: number;
  overallRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
  isPurchased?: boolean;
}

export default function CourseReviewsSection({
  courseId,
  overallRating,
  totalReviews,
  ratingBreakdown,
  reviews,
  isPurchased = false
}: CourseReviewsSectionProps) {
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState(reviews.slice(0, 3));
  const [showingAll, setShowingAll] = useState(false);

  // Calculate rating percentage for each star level
  const calculatePercentage = (count: number) => {
    return (count / totalReviews) * 100;
  };

  // Load more reviews
  const handleLoadMore = () => {
    if (!showingAll) {
      setDisplayedReviews(reviews);
      setShowingAll(true);
    } else {
      setDisplayedReviews(reviews.slice(0, 3));
      setShowingAll(false);
    }
  };
  
  // Submit a review
  const handleSubmitReview = () => {
    if (userRating === 0 || userReview.trim() === "") {
      alert("لطفا امتیاز و نظر خود را وارد کنید");
      return;
    }
    
    // In a real app, we would post this to the server
    console.log({
      courseId,
      rating: userRating,
      review: userReview
    });
    
    // Clear form after submission
    setUserReview("");
    setUserRating(0);
  };
  
  // Toggle like on a review
  const handleLikeReview = (reviewId: number) => {
    setDisplayedReviews(prev => 
      prev.map(review => {
        if (review.id === reviewId) {
          const wasLiked = review.userLiked || false;
          return {
            ...review,
            likes: wasLiked ? review.likes - 1 : review.likes + 1,
            userLiked: !wasLiked
          };
        }
        return review;
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>نظرات دانشجویان</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating overview */}
        <div className="flex flex-col md:flex-row gap-8 p-4 bg-muted/30 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold">{overallRating.toFixed(1)}</div>
            <div className="flex gap-1 my-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.round(overallRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {totalReviews} نظر
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="w-3">{rating}</span>
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress
                  className="h-2"
                  value={calculatePercentage(ratingBreakdown[rating as keyof typeof ratingBreakdown])}
                />
                <span className="text-xs text-muted-foreground w-12">
                  {ratingBreakdown[rating as keyof typeof ratingBreakdown]} نظر
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit review section */}
        {isPurchased && (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">نظر خود را ثبت کنید</h3>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 cursor-pointer ${
                    index < (hoveredRating || userRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setUserRating(index + 1)}
                  onMouseEnter={() => setHoveredRating(index + 1)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>
            <Textarea
              placeholder="نظر خود را در مورد این دوره بنویسید..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              className="mb-3 h-24"
            />
            <Button onClick={handleSubmitReview}>ثبت نظر</Button>
          </div>
        )}

        {/* Reviews list */}
        <div className="space-y-4">
          {displayedReviews.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <MessageSquare className="mx-auto h-10 w-10 mb-2 opacity-50" />
              <p>نظری برای این دوره ثبت نشده است.</p>
            </div>
          ) : (
            displayedReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={review.userAvatar} alt={review.userName} />
                      <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.userName}</div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2">{review.content}</p>
                <div className="flex justify-between mt-3 text-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-1 ${review.userLiked ? 'text-blue-500' : ''}`}
                    onClick={() => handleLikeReview(review.id)}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Flag className="w-4 h-4" />
                    <span>گزارش</span>
                  </Button>
                </div>
              </div>
            ))
          )}

          {reviews.length > 3 && (
            <div className="text-center">
              <Button variant="outline" onClick={handleLoadMore}>
                {showingAll ? "نمایش کمتر" : "نمایش همه نظرات"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 