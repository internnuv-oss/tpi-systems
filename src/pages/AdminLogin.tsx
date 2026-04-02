import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (user && !authLoading) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "hsl(222 47% 11%)" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl font-bold" style={{ color: "hsl(174 85% 32%)" }}>π</span>
            <span className="text-xl font-bold text-white">TheProcessInsights</span>
          </div>
          <p className="text-sm" style={{ color: "hsl(215 16% 60%)" }}>
            Content Management System
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-lg p-8 border"
          style={{
            background: "hsl(222 47% 15%)",
            borderColor: "hsl(222 47% 22%)",
          }}
        >
          <h2 className="text-lg font-bold text-white mb-6">Admin Login</h2>

          {error && (
            <div
              className="mb-4 p-3 rounded text-sm"
              style={{ background: "hsl(0 84% 60% / 0.15)", color: "hsl(0 84% 70%)" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded text-sm text-white placeholder-white/30 outline-none transition-colors duration-200"
                style={{
                  background: "hsl(222 47% 11%)",
                  border: "1px solid hsl(222 47% 25%)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(174 85% 32%)")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(222 47% 25%)")}
                placeholder="admin@tpisystems.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded text-sm text-white placeholder-white/30 outline-none transition-colors duration-200"
                style={{
                  background: "hsl(222 47% 11%)",
                  border: "1px solid hsl(222 47% 25%)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "hsl(174 85% 32%)")}
                onBlur={(e) => (e.target.style.borderColor = "hsl(222 47% 25%)")}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading || authLoading}
              className="w-full py-3 rounded text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
              style={{ background: "hsl(174 85% 32%)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(174 85% 26%)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(174 85% 32%)")}
            >
              {loading ? "Signing in..." : authLoading ? "Checking session..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: "hsl(215 16% 45%)" }}>
          Access restricted to authorized administrators.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
