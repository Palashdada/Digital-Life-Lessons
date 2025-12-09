import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../assets/context/AuthContext";
import { Link } from "react-router";

const PublicLessons = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState("free"); // default
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user plan (Premium or Free)
  useEffect(() => {
    if (user) {
      axios
        .get(`https://your-backend.com/api/users/plan/${user.uid}`)
        .then((res) => setPlan(res.data.plan))
        .catch(() => setPlan("free"));
    }
  }, [user]);

  // Fetch all public lessons
  useEffect(() => {
    axios
      .get("https://your-backend.com/api/lessons/public")
      .then((res) => {
        setLessons(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-xl">
        Loading public lessons...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Browse Public Life Lessons
      </h1>

      {lessons.length === 0 && (
        <p className="text-center text-gray-500">
          No public lessons available.
        </p>
      )}

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {lessons.map((lesson) => {
          const isPremium = lesson.accessLevel === "premium";
          const isLocked = isPremium && plan === "free";

          return (
            <div
              key={lesson._id}
              className={`card bg-white shadow-md border relative ${
                isLocked ? "opacity-60 blur-[1px]" : ""
              }`}
            >
              {/* Premium Lock Overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center rounded-lg z-20">
                  <span className="text-4xl mb-2">🔒</span>
                  <p className="font-semibold">Premium Lesson</p>
                  <Link
                    to="/dashboard/upgrade"
                    className="btn btn-warning mt-3"
                  >
                    Upgrade to View
                  </Link>
                </div>
              )}

              <div className="card-body z-10">
                <div className="badge badge-primary mb-2">
                  {lesson.category}
                </div>

                <h2 className="card-title">{lesson.title}</h2>

                <p className="text-sm text-gray-600">
                  {lesson.description.slice(0, 100)}...
                </p>

                <div className="flex justify-between mt-4 text-sm">
                  <span className="badge badge-ghost">
                    {lesson.emotionalTone || "Neutral"}
                  </span>
                  <span
                    className={`badge ${
                      lesson.accessLevel === "premium"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {lesson.accessLevel.toUpperCase()}
                  </span>
                </div>

                {/* Creator Info */}
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={lesson.creatorPhoto || "https://i.pravatar.cc/150"}
                    alt="Creator"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {lesson.creatorName || "Unknown"}
                    </p>
                    <p className="text-[12px] text-gray-500">
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Details Button */}
                {!isLocked && (
                  <Link
                    to={`/lesson/${lesson._id}`}
                    className="btn btn-primary btn-sm mt-5"
                  >
                    See Details
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicLessons;
