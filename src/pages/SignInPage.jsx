import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, Building2, Briefcase, User } from "lucide-react";

export default function SignInPage({ onSignIn }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Sales Executive",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Simulate sign-in - in real app, this would call an API
    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    if (onSignIn) {
      onSignIn(userData);
    }

    // Store in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");

    navigate("/");
  };

  const roles = [
    {
      value: "Sales Executive",
      label: "Sales Executive",
      icon: Briefcase,
    },
    {
      value: "Relationship Manager",
      label: "Relationship Manager",
      icon: Building2,
    },
    {
      value: "Team Lead",
      label: "Team Lead",
      icon: UserPlus,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 via-brand-sand to-brand-emerald/10 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="text-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-semibold text-2xl mx-auto mb-4">
              ST
            </div>
            <h1 className="text-3xl font-semibold text-brand-navy mb-2">
              Create Account
            </h1>
            <p className="text-slate-500">Join the Sales Team Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Role
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = formData.role === role.value;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleChange("role", role.value)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left h-full ${
                        isSelected
                          ? "border-brand-blue bg-brand-blue/10"
                          : "border-slate-200 hover:border-brand-blue/50"
                      }`}
                    >
                      <div className="flex flex-col gap-3">
                        <div
                          className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                            isSelected
                              ? "bg-brand-blue text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p
                            className={`font-semibold text-base leading-tight ${
                              isSelected ? "text-brand-blue" : "text-slate-700"
                            }`}
                          >
                            {role.label}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 leading-snug">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-brand-blue text-white rounded-xl py-3 font-semibold shadow-lg hover:bg-brand-navy transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="h-5 w-5" />
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand-blue font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
