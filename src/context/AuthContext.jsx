import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New lead assigned: Kavya Steel",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      message: "Application approved: Vihaan Infra",
      time: "15 min ago",
      read: false,
    },
    {
      id: 3,
      message: "Reminder: Follow-up call due in 1 hour",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      message: "Incentive payout processed",
      time: "2 hours ago",
      read: true,
    },
  ]);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  };

  const signIn = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  const sendPasswordReset = (email, optIn = false) => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject(new Error("Email is required"));
        return;
      }

      // generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

      // Store OTP record scoped by email (lowercased)
      try {
        const key = `passwordReset:${email.toLowerCase()}`;
        localStorage.setItem(key, JSON.stringify({ otp, expires }));

        if (optIn) {
          localStorage.setItem("optIn", "true");
        } else {
          localStorage.removeItem("optIn");
        }

        // Simulate network delay and pretend we sent an email
        setTimeout(() => {
          // For demo/testing we return the OTP in the resolved value.
          resolve({
            ok: true,
            message: `Reset OTP generated for ${email}`,
            otp,
          });
        }, 700);
      } catch (err) {
        reject(err);
      }
    });
  };

  const verifyResetOtp = (email, otp) => {
    return new Promise((resolve, reject) => {
      if (!email || !otp) {
        reject(new Error("Email and OTP are required"));
        return;
      }

      try {
        const key = `passwordReset:${email.toLowerCase()}`;
        const raw = localStorage.getItem(key);
        if (!raw) {
          resolve({ ok: false, message: "No OTP found for this email" });
          return;
        }

        const record = JSON.parse(raw);
        if (Date.now() > record.expires) {
          localStorage.removeItem(key);
          resolve({ ok: false, message: "OTP expired" });
          return;
        }

        if (record.otp === String(otp).trim()) {
          // OTP verified — clear it
          localStorage.removeItem(key);
          resolve({ ok: true, message: "OTP verified" });
        } else {
          resolve({ ok: false, message: "Invalid OTP" });
        }
      } catch (err) {
        reject(err);
      }
    });
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = {
    user,
    isAuthenticated,
    login,
    signIn,
    logout,
    sendPasswordReset,
    verifyResetOtp,
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
