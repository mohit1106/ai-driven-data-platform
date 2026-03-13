"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Loader2, Eye, EyeOff, Shield, UserIcon } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils/cn";

type Mode = "signin" | "signup";

export function AuthModal() {
  const { signIn, signUp, error, isLoading, clearError } = useAuthStore();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"viewer" | "admin">("viewer");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    if (mode === "signin") {
      await signIn(email, password);
    } else {
      await signUp(email, password, selectedRole);
    }
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    clearError();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">
              Bharat<span className="text-orange-400">Insight</span>
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {mode === "signin"
                ? "Sign in to your account"
                : "Create a new account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 outline-none transition-colors focus:border-orange-500/50 focus:bg-white/[0.07]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm text-zinc-300 placeholder-zinc-600 outline-none transition-colors focus:border-orange-500/50 focus:bg-white/[0.07]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Role selector (signup only) */}
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">
                  Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("viewer")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                      selectedRole === "viewer"
                        ? "border-orange-500/40 bg-orange-500/10 text-orange-300"
                        : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                    )}
                  >
                    <UserIcon className="h-4 w-4" />
                    Viewer
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("admin")}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all",
                      selectedRole === "admin"
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                        : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                    )}
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </button>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-sm text-zinc-500 mt-6">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={switchMode}
                  className="text-orange-400 hover:text-orange-300 font-medium"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={switchMode}
                  className="text-orange-400 hover:text-orange-300 font-medium"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
