import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

function MyCourseVideos() {
  const { courseName, lessonId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <LoadingSpinner isLoading={isLoading} />
      <h1>{courseName} - Lesson {lessonId} Videos</h1>
      {/* You can dynamically render lesson videos here based on lessonId */}
      <p>Details for lesson {lessonId} from {courseName}</p>
    </div>
  );
}

export default MyCourseVideos;
