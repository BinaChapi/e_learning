// GET all courses
export async function getCourses() {
  const response = await fetch('http://localhost:3000/api/courses');
  if (!response.ok) throw new Error('Failed to fetch courses');
  return await response.json();
}

// GET course by ID
export async function getCourseById(courseId) {
  const response = await fetch(`http://localhost:3000/api/courses/${courseId}`);
  if (!response.ok) throw new Error('Failed to fetch course');
  return await response.json();
}

// POST add course
export async function addCourse(courseData) {
  const response = await fetch('http://localhost:3000/api/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(courseData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to add course');
  }

  return await response.json();
}
