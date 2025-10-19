const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

/**
 * Enroll a user in a course
 */
export const enrollUser = async (userId, courseId) => {
  try {
    const response = await fetch(`${API_URL}/api/enrollments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, courseId }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to enroll in course");
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getUserEnrollments = async (userId) => {
  const res = await fetch(`${API_URL}/api/enrollments/user/${userId}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch enrollments");
  }

  return data; // This returns an array of enrollment objects
};

export const getCourseById = async (id) => {
  const res = await fetch(`${API_URL}/api/courses/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch course");
  }

  return data;
};
