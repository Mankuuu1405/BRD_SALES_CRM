import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const auth = useAuth();
  const sendPasswordReset = auth?.sendPasswordReset;

  const handleSend = async (e) => {
    e?.preventDefault?.();
    setMessage("");
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setSending(true);
    try {
      if (sendPasswordReset) {
        const res = await sendPasswordReset(email, optIn);
        // For demo, the context returns the OTP so we can display it (remove in production)
        if (res?.otp) {
          setMessage(
            `Reset OTP sent. Check your inbox. (demo OTP: ${res.otp})`
          );
        } else {
          setMessage("Reset link sent. Check your inbox.");
        }
        setOtpSent(true);
      } else {
        await new Promise((r) => setTimeout(r, 800));
        if (optIn) localStorage.setItem("optIn", "true");
        else localStorage.removeItem("optIn");
        setMessage("Reset link (mock) sent. Check your inbox.");
        setOtpSent(true);
      }
    } catch (err) {
      setMessage(err?.message || "Failed to send reset link");
    }
    setSending(false);
  };

  const handleVerify = async () => {
    setMessage("");
    if (!email || !otp) {
      setMessage("Please provide email and OTP");
      return;
    }
    setVerifying(true);
    try {
      if (auth?.verifyResetOtp) {
        const res = await auth.verifyResetOtp(email, otp);
        if (res.ok) {
          setVerified(true);
          setMessage("OTP verified. You may now reset your password.");
        } else {
          setMessage(res.message || "OTP verification failed");
        }
      } else {
        // fallback: check localStorage
        const key = `passwordReset:${email.toLowerCase()}`;
        const raw = localStorage.getItem(key);
        if (!raw) {
          setMessage("No OTP found for this email");
        } else {
          const record = JSON.parse(raw);
          if (record.otp === String(otp).trim()) {
            localStorage.removeItem(key);
            setVerified(true);
            setMessage("OTP verified (mock).");
          } else {
            setMessage("Invalid OTP");
          }
        }
      }
    } catch (err) {
      setMessage(err?.message || "Verification failed");
    }
    setVerifying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue/10 via-brand-sand to-brand-emerald/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-brand-navy mb-1">
              Forgot Password
            </h1>
            <p className="text-sm text-slate-500">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
                className="rounded border-slate-300 text-brand-blue focus:ring-brand-blue"
              />
              <span>Opt-in to product updates and emails</span>
            </label>

            {message && <div className="text-sm text-slate-700">{message}</div>}

            {otpSent && !verified && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Enter OTP
                </label>
                <div className="relative mb-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 rounded-xl border border-slate-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    placeholder="Enter the 6-digit code"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleVerify}
                    disabled={verifying}
                    className="bg-brand-blue text-white rounded-xl py-2 px-4 text-sm hover:bg-brand-navy transition-colors"
                  >
                    {verifying ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </div>
            )}

            {verified && (
              <div className="text-sm text-emerald-700">
                OTP verified — you can now reset your password.
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                onClick={handleSend}
                disabled={sending}
                className="bg-brand-blue text-white rounded-xl py-2 px-4 text-sm hover:bg-brand-navy transition-colors"
              >
                {sending ? "Sending..." : "Send reset link"}
              </button>

              <Link
                to="/login"
                className="text-sm text-slate-600 hover:underline self-center"
              >
                Back to sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
