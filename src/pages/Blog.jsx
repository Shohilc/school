import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Tabs from "../components/ui/Tabs";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { blogPosts, blogCategories } from "../data/blogPosts";
import { fadeInUp, staggerContainer } from "../animations/variants";

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePostId = searchParams.get("post");
  const activeCategory = searchParams.get("category") || "All";

  // Category filter tabs mapping
  const categoryTabs = blogCategories.map((cat) => ({
    id: cat,
    label: cat
  }));

  const handleCategoryChange = (cat) => {
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleSelectPost = (id) => {
    setSearchParams({ post: id });
  };

  const handleBackToGrid = () => {
    if (activeCategory !== "All") {
      setSearchParams({ category: activeCategory });
    } else {
      setSearchParams({});
    }
  };

  // Render Single Article Reader View
  if (activePostId) {
    const post = blogPosts.find((p) => p.id === activePostId);

    if (!post) {
      return (
        <PageTransition>
          <div className="max-w-xl mx-auto text-center py-16">
            <h2 className="font-fredoka font-bold text-navy text-2xl mb-4">Post Not Found</h2>
            <Button variant="primary" onClick={handleBackToGrid}>Back to Blog</Button>
          </div>
        </PageTransition>
      );
    }

    return (
      <PageTransition>
        <article className="max-w-3xl mx-auto px-4 md:px-6 text-left">
          {/* Back button */}
          <button
            onClick={handleBackToGrid}
            className="inline-flex items-center gap-2 font-fredoka font-bold text-navy hover:text-primary transition-colors mb-8 cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Resources</span>
          </button>

          {/* Category Badge */}
          <Badge variant="primary" className="mb-4">
            {post.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-fredoka font-black text-navy leading-tight mb-6">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-xs md:text-sm font-fredoka font-bold text-navy-muted border-y border-cream-dark/60 py-4 mb-8">
            <span className="flex items-center gap-1.5">
              <User className="w-4.5 h-4.5 text-primary" />
              <span>{post.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4.5 h-4.5 text-secondary" />
              <span>{post.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4.5 h-4.5 text-accent-pink" />
              <span>{post.readTime}</span>
            </span>
          </div>

          {/* Article Image */}
          <div className="w-full h-80 sm:h-[400px] rounded-3xl overflow-hidden border-2 border-cream-dark mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* HTML Article content rendering */}
          <div
            className="prose prose-slate max-w-none font-nunito text-navy-muted leading-relaxed space-y-6 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Strip */}
          <div className="border-t border-cream-dark/60 pt-8 mt-12 flex justify-between items-center">
            <span className="font-fredoka text-xs text-navy-muted font-bold">SHARE THIS ARTICLE</span>
            <button
              onClick={() => alert("Copied article link to clipboard!")}
              className="p-2.5 bg-cream hover:bg-primary-light text-navy-muted hover:text-primary rounded-full shadow-sm cursor-pointer transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </article>
      </PageTransition>
    );
  }

  // Filter blog posts based on tab
  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-fredoka font-bold text-accent-pink uppercase tracking-wider">
            Educator Publications
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            Parent Resources
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            Stay updated with school milestones, read guides on vocabulary tracking, and early childhood behavior.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-10">
          <Tabs
            tabs={categoryTabs}
            activeTab={activeCategory}
            onChange={handleCategoryChange}
            className="flex-wrap justify-center"
          />
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx * 0.1}
            >
              <Card
                variant="white"
                hoverEffect
                className="h-full flex flex-col justify-between border-2 border-cream-dark p-0 overflow-hidden cursor-pointer"
                onClick={() => handleSelectPost(post.id)}
              >
                <div>
                  {/* Post Image Cover */}
                  <div className="h-56 w-full overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="navy">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 text-left">
                    <div className="flex gap-4 text-xs font-bold font-fredoka text-navy-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-secondary" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-fredoka font-bold text-navy hover:text-primary transition-colors leading-tight mb-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-navy-muted font-nunito leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 text-left border-t border-cream-dark/40 mt-4 flex justify-between items-center font-fredoka text-sm font-bold text-navy-muted">
                  <span>By {post.author.split(",")[0]}</span>
                  <span className="flex items-center gap-1 hover:text-primary transition-colors text-primary">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </PageTransition>
  );
}
