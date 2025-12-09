import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useAuth } from "../assets/context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const LessonDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [similarLessons, setSimilarLessons] = useState([]);

  // ------------------------
  // Fetch User Plan
  // ------------------------
  useEffect(() => {
    if (user) {
      axios
        .get(`https://your-backend.com/api/users/plan/${user.uid}`)
        .then((res) => setPlan(res.data.plan))
        .catch(() => setPlan("free"));
    }
  }, [user]);

  // ------------------------
  // Fetch Lesson Details
  // ------------------------
  useEffect(() => {
    axios
      .get(`https://your-backend.com/api/lessons/${id}`)
      .then((res) => {
        setLesson(res.data);
        setLikes(res.data.likesCount || 0);
        setIsLiked(res.data.likes?.includes(user?.uid));
        setSaved(res.data.favorites?.includes(user?.uid));
        setLoading(false);

        // Fetch recommended
        axios
          .get(
            `https://your-backend.com/api/lessons/similar?category=${res.data.category}&tone=${res.data.emotionalTone}`
          )
          .then((similarRes) => {
            setSimilarLessons(similarRes.data.slice(0, 6));
          });
      })
      .catch(() => setLoading(false));
  }, [id, user]);

  if (loading)
    return (
      <div className="min-h-[70vh] flex justify-center items-center text-xl">
        Loading lesson...
      </div>
    );

  if (!lesson)
    return <p className="text-center text-red-500">Lesson not found.</p>;

  const isPremiumLesson = lesson.accessLevel === "premium";
  const locked = isPremiumLesson && plan === "free";

  // ------------------------
  // Handle Like
  // ------------------------
  const handleLike = () => {
    if (!user)
      return Swal.fire(
        "Login Required",
        "Please log in to like lessons",
        "info"
      );

    axios
      .post(`https://your-backend.com/api/lessons/${id}/toggle-like`, {
        userId: user.uid,
      })
      .then((res) => {
        setIsLiked(res.data.isLiked);
        setLikes(res.data.likesCount);
      });
  };

  // ------------------------
  // Handle Favorites
  // ------------------------
  const handleFavorite = () => {
    if (!user)
      return Swal.fire(
        "Login Required",
        "Please log in to save lessons",
        "info"
      );

    axios
      .post(`https://your-backend.com/api/lessons/${id}/toggle-favorite`, {
        userId: user.uid,
      })
      .then((res) => setSaved(res.data.saved));
  };

  // ------------------------
  // Handle Report
  // ------------------------
  const handleReport = () => {
    if (!user)
      return Swal.fire("Login Required", "Please log in to report", "info");

    Swal.fire({
      title: "Report this lesson?",
      input: "select",
      inputOptions: {
        inappr: "Inappropriate Content",
        hate: "Hate Speech or Harassment",
        false: "Misleading or False Information",
        spam: "Spam or Promotional Content",
        sensitive: "Sensitive/Disturbing Content",
        other: "Other",
      },
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`https://your-backend.com/api/reports`, {
          lessonId: id,
          reporter: user.uid,
          reason: result.value,
        });

        Swal.fire("Reported", "The lesson has been reported", "success");
      }
    });
  };

  // ------------------------
  // Handle Comment Submit
  // ------------------------
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) return Swal.fire("Login Required", "Please log in to comment");

    const message = e.target.comment.value;

    axios
      .post(`https://your-backend.com/api/lessons/${id}/comment`, {
        userId: user.uid,
        message,
      })
      .then((res) => {
        setComments(res.data);
        e.target.reset();
      });
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      {/* ----------- PREMIUM LOCK ------------- */}
      {locked && (
        <div className="p-5 bg-yellow-100 border mb-5 rounded">
          <h2 className="text-xl font-bold">🔒 Premium Content</h2>
          <p className="mt-2">
            This is a premium life lesson. Upgrade to unlock full access.
          </p>
          <Link to="/dashboard/upgrade" className="btn btn-warning mt-3">
            Upgrade Now
          </Link>
        </div>
      )}

      {/* MAIN BODY */}
      <div className={`${locked ? "blur-sm pointer-events-none" : ""}`}>
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>

        {/* Image */}
        {lesson.featuredImage && (
          <img
            src={lesson.featuredImage}
            className="w-full rounded-lg mb-6"
            alt="Featured"
          />
        )}

        {/* Description */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
          {lesson.description}
        </p>

        {/* Metadata */}
        <div className="mb-8 bg-base-200 p-4 rounded-lg">
          <p>
            <strong>Category:</strong> {lesson.category}
          </p>
          <p>
            <strong>Emotional Tone:</strong> {lesson.emotionalTone}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {new Date(lesson.createdAt).toDateString()}
          </p>
          <p>
            <strong>Updated:</strong>{" "}
            {new Date(lesson.updatedAt).toDateString()}
          </p>
          <p>
            <strong>Visibility:</strong> Public
          </p>
          <p>
            <strong>Reading Time:</strong> ~
            {Math.ceil(lesson.description.length / 250)} mins
          </p>
        </div>

        {/* Author Card */}
        <div className="flex items-center gap-4 bg-base-100 border p-4 rounded-lg mb-8">
          <img src={lesson.creatorPhoto} className="w-16 h-16 rounded-full" />
          <div>
            <h3 className="font-bold text-lg">{lesson.creatorName}</h3>
            <p>{lesson.totalLessons} lessons created</p>
            <Link
              to={`/author/${lesson.creatorId}`}
              className="btn btn-sm mt-2"
            >
              View all lessons by this author
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-lg mb-8">
          <span>❤️ {likes}</span>
          <span>🔖 {lesson.favoritesCount}</span>
          <span>👀 {Math.floor(Math.random() * 10000)}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={handleLike}
            className={`btn ${isLiked ? "btn-error" : "btn-outline"}`}
          >
            ❤️ Like
          </button>

          <button
            onClick={handleFavorite}
            className={`btn ${saved ? "btn-success" : "btn-outline"}`}
          >
            🔖 {saved ? "Saved" : "Save to Favorites"}
          </button>

          <button onClick={handleReport} className="btn btn-warning">
            🚩 Report
          </button>

          <button className="btn btn-info">🔗 Share</button>
        </div>

        {/* Comments */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-3">Comments</h2>

          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                name="comment"
                className="textarea textarea-bordered w-full"
                placeholder="Write a comment..."
                required
              ></textarea>
              <button className="btn btn-primary mt-2">Post Comment</button>
            </form>
          )}

          {comments.length === 0 && (
            <p className="text-gray-500">No comments yet.</p>
          )}

          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="p-3 border rounded">
                <p className="font-semibold">{c.userName}</p>
                <p>{c.message}</p>
                <small className="text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Lessons */}
        <div>
          <h2 className="text-3xl font-bold mb-5">Similar Lessons</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarLessons.map((l) => (
              <Link
                key={l._id}
                to={`/lesson/${l._id}`}
                className="card bg-base-100 shadow-md"
              >
                <div className="card-body">
                  <h3 className="card-title">{l.title}</h3>
                  <p className="text-gray-600">
                    {l.description.slice(0, 80)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
