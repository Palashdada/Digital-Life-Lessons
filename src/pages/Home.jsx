import React, { useEffect, useState } from "react";

import HeroSlider from "../components/Home/HeroSlider";
import FeaturedLessons from "../components/Home/FeaturedLessons";
import WhyLearningMatters from "../components/Home/WhyLearningMatters";
import TopContributors from "../components/Home/TopContributors";
import MostSavedLessons from "../components/Home/MostSavedLessons";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [savedLessons, setSavedLessons] = useState([]);

  useEffect(() => {
    fetch("https://your-api.com/featured-lessons")
      .then((res) => res.json())
      .then(setFeatured);

    fetch("https://your-api.com/top-contributors")
      .then((res) => res.json())
      .then(setContributors);

    fetch("https://your-api.com/most-saved-lessons")
      .then((res) => res.json())
      .then(setSavedLessons);
  }, []);

  return (
    <div className="space-y-20">
      <HeroSlider />
      <FeaturedLessons lessons={featured} />
      <WhyLearningMatters />
      <TopContributors contributors={contributors} />
      <MostSavedLessons lessons={savedLessons} />
    </div>
  );
};

export default Home;
