
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: CourseLevel;
  duration: string;
  instructor: string;
  rating: number;
  enrolled: number;
}

const getLevelColor = (level: CourseLevel) => {
  switch (level) {
    case 'beginner':
      return 'bg-success-light text-success hover:bg-success-light';
    case 'intermediate':
      return 'bg-secondary-light text-secondary hover:bg-secondary-light';
    case 'advanced':
      return 'bg-accent-light text-accent hover:bg-accent-light';
    default:
      return 'bg-primary-light text-primary hover:bg-primary-light';
  }
};

const CourseCard: React.FC<CourseProps> = ({
  id,
  title,
  description,
  image,
  category,
  level,
  duration,
  instructor,
  rating,
  enrolled,
}) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <Badge className="absolute top-4 right-4">
          {category}
        </Badge>
      </div>
      
      <CardHeader className="space-y-1 p-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={`${getLevelColor(level)} border-none`}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
          <div className="text-sm font-medium">{duration}</div>
        </div>
        <h3 className="font-heading font-medium text-lg line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 h-4 w-4">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>{instructor}</span>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {enrolled.toLocaleString()} students
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/course/${id}`}>Enroll Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
