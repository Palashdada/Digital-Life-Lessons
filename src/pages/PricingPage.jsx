import React, { useEffect, useState } from "react";
import { useAuth } from "../assets/context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";

const PricingPage = () => {
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState("free");
  const navigate = useNavigate();

  // Fetch the plan from MongoDB (Single Source of Truth)
  useEffect(() => {
    if (!user) return;

    axios
      .get(`https://your-backend.com/api/users/plan/${user.uid}`)
      .then((res) => setUserPlan(res.data.plan)) // plan = free or premium
      .catch(() => setUserPlan("free"));
  }, [user]);

  const handleCheckout = () => {
    axios
      .post("https://your-backend.com/api/create-checkout-session", {
        uid: user.uid,
        email: user.email,
      })
      .then((res) => {
        window.location.href = res.data.url; // redirect to Stripe checkout
      })
      .catch((err) => console.log(err));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Please login to view pricing.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold">Upgrade Your Learning</h1>
        <p className="text-gray-600 mt-2">
          Unlock premium lessons, unlimited features & lifetime access.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* FREE CARD */}
        <div className="card bg-white shadow-xl p-6 border">
          <h2 className="text-2xl font-bold text-blue-600 mb-3">Free Plan</h2>
          <p className="text-gray-500 mb-6">Good for beginners</p>

          <ul className="space-y-3 text-left">
            <li>✔ Access to public lessons</li>
            <li>✔ Can create up to 5 lessons</li>
            <li>✔ Basic dashboard</li>
            <li>✔ Can save up to 10 lessons</li>
            <li>✔ View contributors</li>
            <li>❌ No premium templates</li>
            <li>❌ No priority listing</li>
            <li>❌ Ads included</li>
          </ul>
        </div>

        {/* PREMIUM CARD */}
        <div className="card bg-white shadow-xl p-6 border relative">
          {userPlan === "premium" && (
            <span className="absolute top-3 right-3 badge badge-primary py-3 px-4">
              ⭐ Premium Member
            </span>
          )}

          <h2 className="text-2xl font-bold text-purple-600 mb-3">
            Premium Plan
          </h2>
          <p className="text-gray-500 mb-6">
            Lifetime access — One-time payment
          </p>

          <ul className="space-y-3 text-left">
            <li>✔ Unlimited lesson creation</li>
            <li>✔ Access to premium lessons</li>
            <li>✔ Add unlimited favorites</li>
            <li>✔ Priority profile listing</li>
            <li>✔ Premium templates</li>
            <li>✔ Ad-free experience</li>
            <li>✔ Featured creator badge</li>
            <li>✔ Lifetime support</li>
          </ul>

          {userPlan === "premium" ? (
            <button className="btn btn-success mt-8 w-full" disabled>
              You Are Already Premium ⭐
            </button>
          ) : (
            <button
              onClick={handleCheckout}
              className="btn btn-primary mt-8 w-full text-lg"
            >
              Upgrade to Premium — ৳1500
            </button>
          )}
        </div>
      </div>

      {/* Payment Notice */}
      <div className="max-w-3xl mx-auto text-center mt-10 text-sm text-gray-600">
        <p>One-time payment. No monthly fees. Lifetime premium access.</p>
      </div>
    </div>
  );
};

export default PricingPage;
