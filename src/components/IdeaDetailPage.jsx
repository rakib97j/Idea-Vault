"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Users,
  Tag,
  Calendar,
  Layers,
  TrendingUp,
  Eye,
  ShieldCheck,
  Zap,
  Send,
  ThumbsUp,
  Share2,
  MessageSquare,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import EditDeleteBTN from "./CommentCURD/EditDeleteBTN";

const IdeaDetailPage = ({ IdeaDetailsData }) => {
  const {
    _id,
    id,
    title = "Untitled Idea",
    shortDescription = "No short description provided.",
    detailedDescription = "",
    category = "General",
    tags = [],
    imageURL,
    imageUrl,
    estimatedBudget,
    budget,
    targetAudience,
    problemStatement,
    proposedSolution,
    createdAt,
  } = IdeaDetailsData || {};

  const bannerImage =
    imageUrl ||
    imageURL ||
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80";
  const displayBudget = estimatedBudget || budget || "Flexible / TBD";
  const displayAudience = targetAudience || "Startup Enthusiasts & Early Adopters";
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Added";

  // Process tags into array format
  const tagList = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
    ? tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [comments, setComments] = useState([]);

  
  useEffect(() => {
    if (!_id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }
        return res.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
      });
  }, [_id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const commentText = form.comment.value;

    if (!user) {
      toast.error("Please login to post a comment!");
      return;
    }

    const commentData = {
      userId: user.id,
      detailsDataId: _id,
      detailedDataTitle: title,
      userImage: user.image,
      userName: user.name,
      comment: commentText,
      date: new Date(),
    };

    try {
       const {data:tokenData} =  await authClient.token()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization : `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(commentData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Comment Added Successfully");
        form.reset();
        setTimeout(() => {
      window.location.reload();
    },500);
        setComments((prev) => [commentData, ...prev]);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Network error!");
    }
  };

  return (
    <div className="w-full py-6 space-y-8 text-[var(--foreground)] transition-colors">
      {/* Top Action & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] hover:text-cyan-500 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-500" />
          <span>Back to All Ideas</span>
        </Link>
      </div>

      {/* Hero Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-slate-950 shadow-xl"
      >
        <div className="relative aspect-[21/9] w-full min-h-[280px] sm:min-h-[360px]">
          <Image
            src={bannerImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 via-45% to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 space-y-3 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-cyan-500 text-white shadow-lg uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {category}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 text-slate-200 border border-slate-700/80 backdrop-blur-md">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {formattedDate}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-200 line-clamp-2 max-w-3xl font-normal drop-shadow">
              {shortDescription}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-2 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Estimated Budget</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-[var(--foreground)] truncate">
            {displayBudget}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-2 hover:border-indigo-500/40 transition-all">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Target Audience</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-[var(--foreground)] truncate">
            {displayAudience}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-2 hover:border-teal-500/40 transition-all">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Market Traction</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-[var(--foreground)] truncate">
            High Potential
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-2 hover:border-purple-500/40 transition-all">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Current Stage</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-[var(--foreground)] truncate">
            Concept / Validation
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {problemStatement && (
            <div className="p-6 sm:p-7 rounded-2xl border border-red-500/30 bg-red-500/5 dark:bg-red-500/10 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 font-extrabold text-base sm:text-lg">
                <div className="p-2 rounded-xl bg-red-500/10">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <span>The Problem Statement</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--foreground)] font-medium pl-11">
                {problemStatement}
              </p>
            </div>
          )}

          {proposedSolution && (
            <div className="p-6 sm:p-7 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-500/10 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400 font-extrabold text-base sm:text-lg">
                <div className="p-2 rounded-xl bg-cyan-500/10">
                  <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                </div>
                <span>The Proposed Solution</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--foreground)] font-medium pl-11">
                {proposedSolution}
              </p>
            </div>
          )}

          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-lg font-extrabold pb-3 border-b border-[var(--border)]">
              <Layers className="w-5 h-5 text-cyan-500" />
              <span>Full Idea Breakdown & Blueprint</span>
            </div>
            <div className="text-sm sm:text-base leading-relaxed space-y-4 text-[var(--foreground)]">
              {detailedDescription ? (
                detailedDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>
                  This idea envisions an innovative approach to modern startup solutions...
                </p>
              )}
            </div>
          </div>

          {tagList.length > 0 && (
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                <Tag className="w-4 h-4 text-cyan-500" />
                <span>Related Tags & Domains</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {tagList.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-xs font-bold text-cyan-600 dark:text-cyan-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Feedback & Community Discussion */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5 text-lg font-extrabold">
                <MessageSquare className="w-5 h-5 text-cyan-500" />
                <span>Community Discussion ({comments.length})</span>
              </div>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                rows={3}
                name="comment"
                required
                placeholder="Share your thoughts, suggestions, or potential collaboration ideas..."
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-sm text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-sm shadow-md hover:opacity-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Feedback</span>
                </button>
              </div>
            </form>

            {/* Comments List Dynamic  */}
            <div className="space-y-4 pt-2">
              {comments.length === 0 ? (
                <p className="text-xs text-[var(--secondary)] text-center py-4">
                  No comments yet. Be the first to share your thoughts!
                </p>
              ) : (
                comments.map((c , index) => (
                  <div
                    key={c._id || index}
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-500/40 bg-slate-800">
                          <Image
                            src={c.userImage }
                            alt={c.userName }
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[var(--foreground)]">
                            {c.userName || "Anonymous"}
                          </p>
                          <p className="text-[10px] text-[var(--secondary)]">
                            {c.date ? new Date(c.date).toLocaleDateString() : "Just now"}
                          </p>
                        </div>
                      </div>
                      {user && user.id === c.userId && (
                        <EditDeleteBTN commentId={c._id} />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--foreground)] pl-11">
                      {c.comment}
                    </p>
                    
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--card)] to-[var(--background)] shadow-lg space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-cyan-500 uppercase tracking-wider">
                Support Innovation
              </span>
              <h3 className="text-xl font-black text-[var(--foreground)]">Back This Startup Idea</h3>
              <p className="text-xs text-[var(--secondary)] font-medium">
                Connect with the founder to offer funding, mentorship, or technical collaboration.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 text-white font-bold text-sm shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>Upvote & Support Idea</span>
              </button>

              <button className="w-full py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-cyan-500/10 font-bold text-sm text-[var(--foreground)] transition-all cursor-pointer flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-500" />
                <span>Share with Network</span>
              </button>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--secondary)] font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Vault Item
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-cyan-500" /> 1.4k Views
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailPage;