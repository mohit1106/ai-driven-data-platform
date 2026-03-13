import { create } from "zustand";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type UserRole = "viewer" | "admin";

interface AuthState {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  error: string | null;
  isConfigured: boolean;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: "viewer",
  isLoading: true,
  error: null,
  isConfigured: isSupabaseConfigured(),

  initialize: async () => {
    if (!supabase) {
      set({ isLoading: false, isConfigured: false });
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const role =
          (session.user.user_metadata?.role as UserRole) || "viewer";
        set({ user: session.user, role, isLoading: false });
      } else {
        set({ isLoading: false });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const role =
            (session.user.user_metadata?.role as UserRole) || "viewer";
          set({ user: session.user, role });
        } else {
          set({ user: null, role: "viewer" });
        }
      });
    } catch {
      set({ isLoading: false });
    }
  },

  signIn: async (email, password) => {
    if (!supabase) return false;
    set({ error: null, isLoading: true });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }

    if (data.user) {
      const role =
        (data.user.user_metadata?.role as UserRole) || "viewer";
      set({ user: data.user, role, isLoading: false });
      return true;
    }

    set({ isLoading: false });
    return false;
  },

  signUp: async (email, password, role) => {
    if (!supabase) return false;
    set({ error: null, isLoading: true });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    if (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }

    if (data.user) {
      set({ user: data.user, role, isLoading: false });
      return true;
    }

    set({ isLoading: false });
    return false;
  },

  signOut: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    set({ user: null, role: "viewer" });
  },

  clearError: () => set({ error: null }),
}));
