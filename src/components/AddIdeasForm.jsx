"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Lightbulb,
  FileText,
  AlignLeft,
  Grid,
  Tag,
  Image as ImageIcon,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Send,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import React from "react";


const categories = [
  { key: "tech", label: "Tech" },
  { key: "health", label: "Health" },
  { key: "ai", label: "AI" },
  { key: "education", label: "Education" },
  { key: "finance", label: "Finance" },
  { key: "productivity", label: "Productivity" },
  { key: "other", label: "Other" },
];

const AddIdeasForm = () => {
  const router = useRouter();
   const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "",
    tags: "",
    imageUrl: "",
    estimatedBudget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",

    

  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:9090/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),

            userId: user?.id
        }),
      });


      if (res.ok) {
        toast.success("Idea submitted successfully!");
        setFormData({
          title: "",
          shortDescription: "",
          detailedDescription: "",
          category: "",
          tags: "",
          imageUrl: "",
          estimatedBudget: "",
          targetAudience: "",
          problemStatement: "",
          proposedSolution: "",
        });
        router.push("/my-ideas");
        
        
      } else {
        toast.error("Failed to submit idea. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Share Innovation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
           <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">Submit Your Startup Idea</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--secondary)] max-w-xl mx-auto">
            Transform your vision into reality. Provide key details below to feature your idea in the vault.
          </p>
        </div>

        {/* input Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 sm:p-8 space-y-5 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Idea Title */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <Lightbulb className="w-4 h-4 text-cyan-500" />
                <span>Idea Title</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Enter your Idea title"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <Grid className="w-4 h-4 text-cyan-500" />
                <span>Category</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              >
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <ImageIcon className="w-4 h-4 text-cyan-500" />
                <span>ImageURL</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.png"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <FileText className="w-4 h-4 text-cyan-500" />
                <span>Short Description</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                maxLength={150}
                placeholder="Catchy high-level summary (max 150 characters)"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Detailed Description */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <AlignLeft className="w-4 h-4 text-cyan-500" />
                <span>Detailed Description</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Explain your vision, key features, and implementation roadmap..."
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all min-h-[100px]"
              />
            </div>

            {/* Problem Statement */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <AlertCircle className="w-4 h-4 text-cyan-500" />
                <span>Problem Statement</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                required
                rows={3}
                placeholder="What core problem or pain point does this idea address?"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all min-h-[85px]"
              />
            </div>

            {/* Proposed Solution */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>Proposed Solution</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleChange}
                required
                rows={3}
                placeholder="How does your startup effectively solve this problem?"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all min-h-[85px]"
              />
            </div>

            {/* Target Audience */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <Users className="w-4 h-4 text-cyan-500" />
                <span>Target Audience</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                required
                placeholder="e.g., University students, Remote workers, Freelancers"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Tags  */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <Tag className="w-4 h-4 text-cyan-500" />
                <span>Tags <span className="text-xs text-[var(--secondary)] font-normal">(Optional)</span></span>
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., EdTech, SaaS, Productivity"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* $$$ Budget  */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                <DollarSign className="w-4 h-4 text-cyan-500" />
                <span>Estimated Budget <span className="text-xs text-[var(--secondary)] font-normal">(Optional)</span></span>
              </label>
              <input
                type="text"
                name="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={handleChange}
                placeholder="e.g., $5,000 - $15,000"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* form  submit  */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Idea...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Idea</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIdeasForm;

