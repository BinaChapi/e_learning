import React, { useEffect, useState } from "react";
import { data } from "../assets/data/data";
import { hp } from "../utils/responsivescreen";
import colors from "../styles/colors";
import { Heart } from "lucide-react";
import { enrollUser } from "../services/enrollmentService";
import { useAuth } from "../context/AuthContext";

function TopCourseCard({ index, item }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const userId = user.id;
  const courseId = item.id;

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleEnroll = async () => {
    try {
      setLoading(true);
      // Here item.courseId should match the ID in your DB
      const response = await enrollUser(userId, courseId);
      console.log("✅ Enrolled successfully:", response);
      alert(`You enrolled in ${item.header}`);
    } catch (err) {
      console.error("❌ Enrollment failed:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id={index}
      className="course-card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: hp(2),
        backgroundColor: colors.card,
        borderRadius: hp(2.5),
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        cursor: "pointer",
        ":hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <img
        src={item.img}
        alt={item.header}
        style={{
          width: "100%",
          height: hp(20),
          objectFit: "cover",
          borderRadius: hp(1.5),
          marginBottom: hp(1.5),
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: hp(1),
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: hp(2),
            color: colors.text,
          }}
        >
          {item.header}
        </h4>
        {item.grade && (
          <span
            style={{
              backgroundColor: colors.primary,
              color: colors.card,
              padding: `${hp(0.5)}px ${hp(1)}px`,
              borderRadius: hp(0.8),
              fontSize: hp(1.6),
            }}
          >
            {item.grade}th
          </span>
        )}
      </div>

      <p
        style={{
          margin: `${hp(0.5)}px 0`,
          fontSize: hp(1.8),
          color: colors.text,
        }}
      >
        {item.sub}
        <span
          style={{
            color: "#6C757D",
            fontSize: hp(1.6),
          }}
        >
          {item.desc}
        </span>
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: hp(1),
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: hp(1),
          }}
        >
          <button
            onClick={handleLikeClick}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: hp(0.5),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heart
              size={hp(3)}
              fill={liked ? colors.primary : "none"}
              color={liked ? colors.primary : colors.text}
              strokeWidth={2}
            />
          </button>
          <span
            style={{
              fontSize: hp(1.8),
              color: colors.text,
            }}
          >
            {item.likes}
          </span>
        </div>

        <button
          onClick={handleEnroll}
          style={{
            cursor: "pointer",
            fontSize: hp(2.2),
            backgroundColor: colors.primary,
            borderRadius: hp(1),
            width: hp(16),
            height: hp(5),
            border: "none",
            color: colors.card,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease",
            ":hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default TopCourseCard;
