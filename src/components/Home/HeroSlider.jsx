import React from "react";
import { Link } from "react-router";

const HeroSlider = () => {
  return (
    <div className="carousel w-full h-[400px] rounded-xl shadow-lg overflow-hidden">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/PwVhdww/life1.jpg"
          className="w-full object-cover"
        />
        <div className="absolute flex flex-col justify-center px-10 h-full text-white bg-black/40 w-full">
          <h1 className="text-4xl font-bold">
            Learn From Real Life Experiences
          </h1>
          <p className="mt-4 w-2/3">
            Discover valuable lessons shared by real people.
          </p>
          <Link to="/public-lessons" className="btn btn-primary mt-6">
            Explore Lessons
          </Link>
        </div>
        <a href="#slide3" className="btn btn-circle absolute left-4 top-1/2">
          ❮
        </a>
        <a href="#slide2" className="btn btn-circle absolute right-4 top-1/2">
          ❯
        </a>
      </div>

      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/TP18jBp/life2.jpg"
          className="w-full object-cover"
        />
        <div className="absolute flex flex-col justify-center px-10 h-full text-white bg-black/40 w-full">
          <h1 className="text-4xl font-bold">Share Your Life Lessons</h1>
          <p className="mt-4 w-2/3">
            Inspire thousands with your real experience.
          </p>
          <Link to="/dashboard/add-lesson" className="btn btn-primary mt-6">
            Add Lesson
          </Link>
        </div>
        <a href="#slide1" className="btn btn-circle absolute left-4 top-1/2">
          ❮
        </a>
        <a href="#slide3" className="btn btn-circle absolute right-4 top-1/2">
          ❯
        </a>
      </div>

      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/vmS30hV/life3.jpg"
          className="w-full object-cover"
        />
        <div className="absolute flex flex-col justify-center px-10 h-full text-white bg-black/40 w-full">
          <h1 className="text-4xl font-bold">Grow With Wisdom</h1>
          <p className="mt-4 w-2/3">
            Learn practical skills for life & mindset.
          </p>
          <Link to="/pricing" className="btn btn-primary mt-6">
            Upgrade Plan
          </Link>
        </div>
        <a href="#slide2" className="btn btn-circle absolute left-4 top-1/2">
          ❮
        </a>
        <a href="#slide1" className="btn btn-circle absolute right-4 top-1/2">
          ❯
        </a>
      </div>
    </div>
  );
};

export default HeroSlider;
