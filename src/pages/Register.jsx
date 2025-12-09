import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Register = () => {
  const { register: createUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, photoURL, password } = data;

    // Password validation
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;

    if (!hasUpper || !hasLower || !hasLength) {
      return Swal.fire(
        "Invalid Password",
        "Password must contain uppercase, lowercase, and at least 6 characters",
        "error"
      );
    }

    createUser(email, password)
      .then((res) => {
        // Update profile
        res.user.updateProfile({ displayName: name, photoURL });
        Swal.fire("Success", "Account created successfully", "success");
        navigate("/dashboard");
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  const handleGoogleRegister = () => {
    loginWithGoogle()
      .then(() => {
        Swal.fire("Success", "Logged in with Google", "success");
        navigate("/dashboard");
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-base-100">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            {...register("photoURL", { required: "Photo URL is required" })}
          />
          {errors.photoURL && (
            <p className="text-red-500 text-sm">{errors.photoURL.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button type="submit" className="btn btn-primary w-full mt-4">
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full mt-2"
        >
          Register with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
