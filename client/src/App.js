import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './Routes/PrivateRoute';
import Register from './pages/Auth/Register';
import HomePage from './pages/client/HomePage';
import Login from './pages/Auth/login';
import Hobby from './pages/client/Hobby';
import Dashboard from './pages/admin/Dashboard';
import Favorite from './pages/client/Favorite';
import MyCourses from './pages/client/MyCourses';
import Progress from './pages/client/Progress';
import Tests from './pages/client/Tests';
import ClientLayout from './layouts/ClientLayout';
import Course from './pages/admin/Course';
import Students from './pages/admin/Students';
import CourseDetails from './pages/admin/CourseDetails';
import SpecialAdminPage from './pages/admin/SpecialAdminPage';
import MyCourseDetails from './pages/client/MyCourseDetails';
import MyCourseVideos from './pages/client/MyCourseVideos';
import LessonContent from './pages/client/LessonContent';
import AddVideo from './pages/admin/AddVideo';
import AddCourse from './pages/admin/AddCourse';
import AddChapter from './pages/admin/AddChapter';
import AddPDF from './pages/admin/AddPDF';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hobby" element={<Hobby />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute role="client" />}>
              <Route path="/" element={<ClientLayout />}>
                <Route path="homepage" element={<HomePage />} />
                <Route path="favorite" element={<Favorite />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="my-courses/:courseId" element={<MyCourseDetails />} />
                <Route path="progress" element={<Progress />} />
                <Route path="tests" element={<Tests />} />
                <Route path="lesson-content" element={<LessonContent />} />
              </Route>
            </Route>
            <Route element={<PrivateRoute role="admin" />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/course" element={<Course />} />
              <Route path="/chapters/add-course" element={<AddCourse />} />
              <Route path="/chapters/add-chapter" element={<AddChapter />} />
              <Route path="/students" element={<Students />} />
              <Route path="courses/:id" element={<CourseDetails />} />
              <Route path="courses/:courseName/:ChapterId" element={<MyCourseVideos />} />
              <Route path="/special-admin-page" element={<SpecialAdminPage />} />
              <Route path="/chapters/add-video/:chapterId" element={<AddVideo />} />
              <Route path="/chapters/add-chapter" element={<AddChapter />} />
              <Route path="/chapters/add-pdf/:chapterId" element={<AddPDF />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;