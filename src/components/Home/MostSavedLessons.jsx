import React from "react";
import { Link } from "react-router";

const MostSavedLessons = ({ lessons }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <h2 className="text-3xl font-bold mb-6">Most Saved Lessons</h2>

      {lessons.length === 0 ? (
        <p className="text-gray-500">No saved lessons found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="card bg-base-100 shadow p-4">
              <h3 className="text-xl font-semibold">{lesson.title}</h3>
              <p className="text-gray-600 mt-2">
                {lesson.description.slice(0, 120)}...
              </p>
              <Link
                className="btn btn-sm btn-primary mt-4"
                to={`/lesson/${lesson._id}`}
              >
                View Lesson
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MostSavedLessons;
