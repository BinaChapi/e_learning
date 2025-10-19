import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import MyCourseCard from "../../components/MyCourseCard";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import colors from "../../styles/colors";
import { hp } from "../../utils/responsivescreen";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getUserEnrollments } from "../../services/enrollmentService";
import { getCourseById } from "../../services/courseService";
import { useAuth } from "../../context/AuthContext";
import { data } from "../../assets/data/data";

function MyCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const userId = user.id;

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setIsLoading(true);
      try {
        // 1. Get enrollments for user
        const enrollments = await getUserEnrollments(userId);

        // 2. Fetch course details for each enrollment
        const coursePromises = enrollments.map(async (enrollment) => {
          const course = await getCourseById(enrollment.courseId);
          return {
            ...course,
            progress: enrollment.progress,
            enrollmentId: enrollment.enrollmentId,
          };
        });

        const courseData = await Promise.all(coursePromises);
        setCourses(courseData);
      } catch (err) {
        console.error("Failed to load enrolled courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [userId]);

  const handleCardClick = (item) => {
    // navigate(`/my-courses/${courseId}`);
  };

  return (
    <MainLayout>
      <div
        style={{
          padding: `${hp(2)} ${hp(3)}`,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <LoadingSpinner isLoading={isLoading} />

        {/* Header Section */}
        <div style={{ marginBottom: hp(4) }}>
          <h1
            style={{
              fontSize: hp(3),
              color: colors.text,
              marginBottom: hp(2),
            }}
          >
            My Learning Journey
          </h1>
          <p
            style={{
              fontSize: hp(1.8),
              color: colors.textSecondary,
              marginBottom: hp(3),
            }}
          >
            Track your progress and continue learning
          </p>

          {/* Search and Filter */}
          <div
            style={{
              display: "flex",
              gap: hp(2),
              marginBottom: hp(3),
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: hp(1),
                padding: `${hp(1.5)} ${hp(2)}`,
                backgroundColor: colors.card,
                borderRadius: hp(1),
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Search size={hp(2.5)} color={colors.textSecondary} />
              <input
                placeholder="Search your courses"
                style={{
                  border: "none",
                  background: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: hp(1.8),
                  color: colors.text,
                }}
              />
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: hp(1),
                padding: `${hp(1.5)} ${hp(2)}`,
                backgroundColor: colors.card,
                border: "none",
                borderRadius: hp(1),
                cursor: "pointer",
                color: colors.text,
                fontSize: hp(1.8),
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Filter size={hp(2.5)} />
              Filter
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: hp(3),
          }}
        >
          {courses.length === 0 && !isLoading && (
            <p style={{ color: colors.textSecondary }}>
              No courses enrolled yet.
            </p>
          )}
          {courses.map((item, index) => (
            <MyCourseCard
              key={index}
              item={{
                title: item.title,
                img: data[0].img,
                lessons: [
                  // Fake lessons — in real app, fetch actual lesson data
                  { finished: item.progress > 20 },
                  { finished: item.progress > 50 },
                  { finished: item.progress > 80 },
                ],
                donePercentage: item.progress,
                NoLikes: 0,
              }}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
}

export default MyCourses;
