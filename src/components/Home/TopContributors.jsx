import React from "react";

const TopContributors = ({ contributors }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Top Contributors of the Week</h2>

      {contributors.length === 0 ? (
        <p className="text-gray-500">No contributors this week.</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {contributors.map((user) => (
            <div
              key={user._id}
              className="card bg-base-100 shadow p-4 text-center"
            >
              <img src={user.photoURL} className="w-20 mx-auto rounded-full" />
              <h3 className="font-semibold mt-3">{user.name}</h3>
              <p className="text-gray-500 text-sm">
                {user.totalLessons} Lessons
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopContributors;
