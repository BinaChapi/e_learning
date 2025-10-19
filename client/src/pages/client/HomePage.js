import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { hp } from "../../utils/responsivescreen";
import Top from "../../assets/images/Top.png";
import MainLayout from "../../layouts/MainLayout";
import { data } from "../../assets/data/data";
import colors from "../../styles/colors";
import TopCourseCard from "../../components/TopCoureseCard";
import RecommendedForYouCard from "../../components/RecommendedForYouCard";
import {
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";

function HomePage() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/courses");
        const data = await res.json();
        console.log(data);

        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: colors.background,
        }}
      >
        <div
          style={{
            padding: hp(2),
            borderRadius: hp(1),
            backgroundColor: colors.card,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 30000); // 30 seconds
  };

  return (
    <MainLayout>
      <div
        style={{
          gap: hp(3),
          display: "flex",
          flexDirection: "column",
          padding: `${hp(2)} ${hp(3)}`,
        }}
      >
        <LoadingSpinner isLoading={isLoading} />
        {/* What is new section */}
        <section
          style={{
            background: `linear-gradient(135deg, ${colors.primary}22, ${colors.primary}11)`,
            borderRadius: hp(2),
            padding: hp(3),
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: hp(1),
              marginBottom: hp(2),
            }}
          >
            <Sparkles size={hp(3)} color={colors.primary} />
            <h3
              style={{
                fontSize: hp(2.5),
                color: colors.text,
                margin: 0,
              }}
            >
              What is new?
            </h3>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: hp(3),
              backgroundColor: colors.card,
              padding: hp(3),
              borderRadius: hp(2),
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              transition: "transform 0.3s ease",
              ":hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <img
              src={Top}
              alt="Featured content"
              style={{
                width: hp(25),
                height: hp(25),
                objectFit: "cover",
                borderRadius: hp(2),
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: hp(1),
                  marginBottom: hp(1),
                }}
              >
                <span
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.card,
                    padding: `${hp(0.5)} ${hp(1)}`,
                    borderRadius: hp(0.8),
                    fontSize: hp(1.4),
                    fontWeight: "500",
                  }}
                >
                  NEW
                </span>
                <h3
                  style={{
                    fontSize: hp(2.2),
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  New Tag
                </h3>
              </div>
              <p
                style={{
                  fontSize: hp(1.8),
                  lineHeight: "1.8",
                  color: colors.textSecondary,
                  margin: 0,
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <button
                style={{
                  marginTop: hp(2),
                  padding: `${hp(1)} ${hp(2)}`,
                  backgroundColor: colors.primary,
                  color: colors.card,
                  border: "none",
                  borderRadius: hp(1),
                  fontSize: hp(1.6),
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  ":hover": {
                    transform: "scale(1.05)",
                    backgroundColor: `${colors.primary}ee`,
                  },
                }}
                onClick={handleLoading}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Top Courses section */}
        <section>
          <h3
            style={{
              fontSize: hp(2.5),
              marginBottom: hp(2),
              color: colors.text,
              display: "flex",
              alignItems: "center",
              gap: hp(1),
            }}
          >
            Top Courses <span style={{ fontSize: hp(2.5) }}>🔥</span>
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: hp(3),
              overflowX: "auto",
              padding: `${hp(1)} ${hp(0.5)}`,
              scrollbarWidth: "thin",
              scrollbarColor: `${colors.primary} ${colors.background}`,
              "::-webkit-scrollbar": {
                height: "8px",
              },
              "::-webkit-scrollbar-track": {
                background: colors.background,
                borderRadius: "4px",
              },
              "::-webkit-scrollbar-thumb": {
                background: colors.primary,
                borderRadius: "4px",
              },
            }}
          >
            {courses.map((item, index) => (
              <TopCourseCard
                key={item._id}
                index={index}
                item={{
                  id: item._id,
                  sub: item.category,
                  img: data[0].img,
                  grade: item.grades?.[0] || "N/A",
                  header: item.title,
                  desc: item.description,
                  likes: 0, // can be dynamic later
                }}
              />
            ))}
          </div>
        </section>

        {/* Recommended section */}
        <section>
          <h3
            style={{
              fontSize: hp(2.5),
              marginBottom: hp(2),
              color: colors.text,
            }}
          >
            Recommended for you
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: hp(3),
              overflowX: "auto",
              padding: `${hp(1)} ${hp(0.5)}`,
              scrollbarWidth: "thin",
              scrollbarColor: `${colors.primary} ${colors.background}`,
              "::-webkit-scrollbar": {
                height: "8px",
              },
              "::-webkit-scrollbar-track": {
                background: colors.background,
                borderRadius: "4px",
              },
              "::-webkit-scrollbar-thumb": {
                background: colors.primary,
                borderRadius: "4px",
              },
            }}
          >
            {data.map((item, index) => (
              <RecommendedForYouCard key={index} index={index} item={item} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            marginTop: hp(4),
            borderTop: `1px solid ${colors.border}`,
            padding: `${hp(4)} 0`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: hp(2),
          }}
        >
          <div
            style={{
              display: "flex",
              gap: hp(3),
              marginBottom: hp(2),
            }}
          >
            <a
              href="#"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: hp(1.6),
              }}
            >
              About Us
            </a>
            <a
              href="#"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: hp(1.6),
              }}
            >
              Contact
            </a>
            <a
              href="#"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: hp(1.6),
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: colors.text,
                textDecoration: "none",
                fontSize: hp(1.6),
              }}
            >
              Terms of Service
            </a>
          </div>

          <div
            style={{
              display: "flex",
              gap: hp(2),
              marginBottom: hp(2),
            }}
          >
            {[Facebook, Twitter, Instagram, Linkedin, Mail].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    width: hp(4),
                    height: hp(4),
                    borderRadius: "50%",
                    backgroundColor: `${colors.primary}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors.primary,
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: colors.primary,
                      color: colors.card,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Icon size={hp(2)} />
                </a>
              )
            )}
          </div>

          <p
            style={{
              color: colors.textSecondary,
              fontSize: hp(1.4),
              textAlign: "center",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Your E-Learning Platform. All rights
            reserved.
          </p>
        </footer>
      </div>
    </MainLayout>
  );
}

export default HomePage;
