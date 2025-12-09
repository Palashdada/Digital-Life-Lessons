import React from "react";

const WhyLearningMatters = () => {
  const benefits = [
    { title: "Real-World Wisdom", desc: "True experiences, not theories." },
    { title: "Emotional Strength", desc: "Grow resilience & clarity." },
    { title: "Better Decisions", desc: "Avoid mistakes others made." },
    { title: "Community Support", desc: "Learn together & grow." },
  ];

  return (
    <div className="bg-base-200 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Why Learning From Life Matters
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {benefits.map((item, i) => (
            <div key={i} className="p-6 bg-white shadow rounded-lg">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyLearningMatters;
