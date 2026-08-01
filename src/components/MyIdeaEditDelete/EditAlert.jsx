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
  Pencil,
} from "lucide-react";

import { Button,  Modal,  } from "@heroui/react";

const categories = [
  { key: "tech", label: "Tech" },
  { key: "health", label: "Health" },
  { key: "ai", label: "AI" },
  { key: "education", label: "Education" },
  { key: "finance", label: "Finance" },
  { key: "productivity", label: "Productivity" },
  { key: "other", label: "Other" },
];

const EditAlert = ({data}) => {
     const cardData = data;
     const [formData, setFormData] = useState({
       title: cardData?.title || "",
       shortDescription: cardData?.shortDescription || "",
       detailedDescription: cardData?.detailedDescription || "",
       category: cardData?.category || "",
       tags: Array.isArray(cardData?.tags) ? cardData.tags.join(", ") : cardData?.tags || "",
       imageUrl: cardData?.imageUrl || cardData?.imageURL || "",
       budget: cardData?.budget || cardData?.estimatedBudget || "",
       targetAudience: cardData?.targetAudience || "",
       problemStatement: cardData?.problemStatement || "",
       proposedSolution: cardData?.proposedSolution || "",
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
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${cardData._id}`, {
           method: "PATCH",
           headers: {
             "content-type": "application/json",
           },
           body: JSON.stringify({
             title: formData.title,
             shortDescription: formData.shortDescription,
             detailedDescription: formData.detailedDescription,
             category: formData.category,
             tags: formData.tags
               .split(",")
               .map((tag) => tag.trim())
               .filter((tag) => tag),
             imageUrl: formData.imageUrl,
             budget: formData.budget,
             targetAudience: formData.targetAudience,
             problemStatement: formData.problemStatement,
             proposedSolution: formData.proposedSolution,
           }),
         });

         if (res.ok) {
           toast.success("Idea updated successfully!");
           setTimeout(() => {
             window.location.reload();
           }, 500);
         } else {
           toast.error("Failed to update idea. Please try again.");
         }
       } catch (error) {
         toast.error("An error occurred. Please try again.");
       } finally {
         setIsSubmitting(false);
       }
     };

    return (
        <Modal>
              <Button
                className="p-2 rounded-full bg-black/60 hover:bg-cyan-500 backdrop-blur-md border border-white/20 text-cyan-400 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-md min-w-0 w-10 h-10 flex items-center justify-center"
                variant="flat"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Modal.Backdrop>
                <Modal.Container placement="auto">
                  <Modal.Dialog className="sm:max-w-xl bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                    <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
                              <Modal.CloseTrigger />
                              <div className="flex justify-between items-center p-6 border-b border-[var(--border)]">
                                <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                                  <Sparkles className="w-5 h-5 text-cyan-500 animate-pulse" />
                                  Edit Idea
                                </h2>
                              </div>
                              <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
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
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    placeholder="e.g., $5,000 - $15,000"
                                    className="w-full px-4 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                  />
                                </div>
                              </div>
                            </div>
                    
                              {/* form  submit  */}
                              <div className="p-6 border-t border-[var(--border)] bg-[var(--background)]/30 flex gap-3">
                                <Button
                                  slot="close"
                                  variant="flat"
                                  className="w-1/3 h-12 border border-[var(--border)] text-[var(--foreground)] font-semibold rounded-xl hover:bg-[var(--border)] transition-all cursor-pointer"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  isLoading={isSubmitting}
                                  className="w-2/3 h-12 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                  {!isSubmitting && <Send className="w-5 h-5" />}
                                  <span>Update Idea</span>
                                </Button>
                              </div>
                            </form>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
    );
};

export default EditAlert;