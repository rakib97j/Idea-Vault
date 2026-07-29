"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Mail,
  Sparkles,
  Lightbulb,
  Eye,
  Heart,
  Calendar,
  LockKeyhole,
  Activity,
  Award,
  ArrowRight,
  Edit2,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button, Card, CardContent, Skeleton } from "@heroui/react";



export default function ProfileClient() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Handle unauthorized view redirect
  useEffect(() => {
    if (!isPending && !user) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, isPending, router]);

  // Loading skeleton screen
  if (isPending) {
    return <ProfileSkeleton />;
  }

  // Not logged in redirect state
  if (!user) {
    return <ProfileRedirect router={router} />;
  }

  return <ProfileContent user={user} router={router} />;
}

// Separate component mounted after session loaded to avoid setState-in-effect issues
function ProfileContent({ user, router }) {
  const [userIdeas, setUserIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    image: "",
  });

  // Open modal and load user data
  const openEditModal = () => {
    setProfileForm({
      name: user.name || "",
      image: user.image || "",
    });
    setIsModalOpen(true);
  };

  // Fetch ideas once user is available. Loaded asynchronously inside microtask to avoid react-hooks warning.
  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(async () => {
      if (!isMounted) return;
      setLoadingIdeas(true);
      try {
        const res = await fetch("http://localhost:9090/ideas");
        if (res.ok && isMounted) {
          const data = await res.json();
          const submittedIdeaTitles = JSON.parse(localStorage.getItem("submitted_idea_titles") || "[]");
          const filtered = data.filter(idea => 
            submittedIdeaTitles.includes(idea.title)
          );

          if (filtered.length > 0) {
            setUserIdeas(filtered);
          } else {
            setUserIdeas(data.slice(0, 2));
          }
        }
      } catch (err) {
        console.error("Error fetching user ideas:", err);
      } finally {
        if (isMounted) setLoadingIdeas(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Save changes via better-auth updateUser
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setIsSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: profileForm.name,
        image: profileForm.image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile details");
      } else {
        toast.success("Profile updated successfully!");
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--background)] to-cyan-500/[0.02]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* UNIQUE HERO HEADER BANNER */}
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 p-8 sm:p-12 text-white shadow-xl">
          {/* Background decorative components */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/10 blur-[80px] -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-400/20 blur-[100px] pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* Profile Image with Ring border */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/50 bg-cyan-900/50 shadow-2xl">
                <Image
                  src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Creator Account</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
                  {user.name}
                </h1>
                <p className="text-cyan-100/90 text-sm sm:text-base font-medium flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-4 h-4 opacity-80" />
                  {user.email}
                </p>
              </div>
            </div>

            {/* Action Buttons in Banner */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={openEditModal}
                className="font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl px-5 py-3 shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </Button>

              <Button
                onClick={() => router.push("/add-idea")}
                className="font-bold bg-white text-cyan-600 hover:bg-cyan-50 rounded-xl px-5 py-3 shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <span>Submit Idea</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* STATS TILES GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* STAT 1 */}
          <Card className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xs hover:border-cyan-500/30 transition-all">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black block tracking-tight font-sans">
                  {userIdeas.length}
                </span>
                <span className="text-xs text-[var(--secondary)] font-medium">
                  Ideas Posted
                </span>
              </div>
            </CardContent>
          </Card>

          {/* STAT 2 */}
          <Card className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xs hover:border-teal-500/30 transition-all">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black block tracking-tight font-sans">1,280</span>
                <span className="text-xs text-[var(--secondary)] font-medium">
                  Idea Impressions
                </span>
              </div>
            </CardContent>
          </Card>

          {/* STAT 3 */}
          <Card className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xs hover:border-indigo-500/30 transition-all">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black block tracking-tight font-sans">340</span>
                <span className="text-xs text-[var(--secondary)] font-medium">
                  Interactions
                </span>
              </div>
            </CardContent>
          </Card>

          {/* STAT 4 */}
          <Card className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xs hover:border-amber-500/30 transition-all">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black block tracking-tight font-sans">Level 4</span>
                <span className="text-xs text-[var(--secondary)] font-medium">
                  Innovator Level
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TIMELINE ACTIVITY SECTION */}
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-500" />
            <span>Timeline Activity</span>
          </h2>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 shadow-xs space-y-6">
            <div className="space-y-5 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--border)]">
              {/* EVENT 1 */}
              <div className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0 z-10 bg-[var(--card)]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--foreground)] leading-tight font-sans">
                    Profile verified successfully
                  </p>
                  <p className="text-[10px] text-[var(--secondary)] font-sans">Just Now</p>
                </div>
              </div>

              {/* EVENT 2 */}
              <div className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 flex items-center justify-center shrink-0 z-10 bg-[var(--card)]">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--foreground)] leading-tight font-sans">
                    Submissions loaded in vault
                  </p>
                  <p className="text-[10px] text-[var(--secondary)] font-sans">1 Hour Ago</p>
                </div>
              </div>

              {/* EVENT 3 */}
              <div className="flex gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0 z-10 bg-[var(--card)]">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--foreground)] leading-tight font-sans">
                    Joined the Idea-Vault startup community
                  </p>
                  <p className="text-[10px] text-[var(--secondary)] font-sans">Recently</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[var(--border)]">
                <h3 className="text-xl font-bold flex items-center gap-2 text-[var(--foreground)]">
                  <Edit2 className="w-5 h-5 text-cyan-500" />
                  <span>Update Profile Details</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors p-1.5 rounded-lg hover:bg-cyan-500/5 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6">


                {/* Input Fields */}
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm font-medium shadow-inner"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Custom Image URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider block">
                      Custom Image URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.image}
                      onChange={(e) => setProfileForm((prev) => ({ ...prev, image: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm font-medium shadow-inner"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>

                {/* Live Avatar Preview inside Modal */}
                <div className="flex items-center gap-4 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-cyan-500/20 shrink-0">
                    <Image
                      src={profileForm.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{profileForm.name || "Preview Name"}</p>
                    <p className="text-xs text-[var(--secondary)]">Live Preview of your profile avatar card.</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="font-bold border border-[var(--border)] text-[var(--foreground)] hover:bg-gray-500/5 rounded-xl px-5 py-2.5 cursor-pointer text-sm"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    isLoading={isSaving}
                    className="font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 text-white rounded-xl px-6 py-2.5 cursor-pointer shadow-md"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Redirect view for not-logged-in sessions
function ProfileRedirect({ router }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl space-y-6"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
          <LockKeyhole className="w-8 h-8 animate-bounce" />
        </div>
        <h2 className="text-2xl font-black tracking-tight font-sans">Access Restricted</h2>
        <p className="text-[var(--secondary)] text-sm leading-relaxed font-sans">
          Please log in to view your profile dashboard. Redirecting you to the login screen in a few seconds...
        </p>
        <Button
          onClick={() => router.push("/login")}
          className="w-full font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 text-white rounded-xl py-3 cursor-pointer shadow-md hover:shadow-cyan-500/20"
        >
          Go to Login Now
        </Button>
      </motion.div>
    </div>
  );
}

// Skeleton Fallback for beautiful page loading states
function ProfileSkeleton() {
  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse bg-gradient-to-b from-[var(--background)] to-cyan-500/[0.02]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner Skeleton */}
        <div className="h-44 sm:h-52 w-full bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-cyan-500/20 shrink-0" />
            <div className="space-y-3 w-full max-w-[250px]">
              <div className="h-4 w-28 bg-cyan-500/20 rounded-lg" />
              <div className="h-8 w-full bg-cyan-500/20 rounded-lg" />
              <div className="h-3 w-36 bg-cyan-500/20 rounded-lg" />
            </div>
          </div>
          <div className="h-12 w-40 bg-cyan-500/20 rounded-xl shrink-0" />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-24 bg-cyan-500/[0.03] border border-[var(--border)] rounded-2xl animate-pulse" />
          <div className="h-24 bg-cyan-500/[0.03] border border-[var(--border)] rounded-2xl animate-pulse" />
          <div className="h-24 bg-cyan-500/[0.03] border border-[var(--border)] rounded-2xl animate-pulse" />
          <div className="h-24 bg-cyan-500/[0.03] border border-[var(--border)] rounded-2xl animate-pulse" />
        </div>

        {/* Content Skeletons */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-8 w-48 bg-cyan-500/20 rounded-lg animate-pulse" />
          <div className="h-44 bg-cyan-500/[0.03] border border-[var(--border)] rounded-2xl animate-pulse" />
        </div>

      </div>
    </div>
  );
}
