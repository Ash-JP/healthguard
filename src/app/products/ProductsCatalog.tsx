"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ArrowUpRight, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import cssdProducts from "@/data/cssd-products.json";

export default function ProductsCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract unique categories from products
  const categories = Array.from(new Set(cssdProducts.map(p => p.category)));

  // Filter products based on search query and selected category
  const filteredProducts = cssdProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.primary_application.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge className="bg-accent text-accent-foreground mb-4 uppercase tracking-widest px-3 py-1 font-semibold">
            CSSD Consumables Directory
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Master Consumables Catalog
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Explore our exhaustive catalog of CSSD solutions and consumables integrated seamlessly into the clinical workflow.
          </p>
        </div>
      </section>

      {/* Main Catalog Area */}
      <section className="container py-12 lg:py-16 max-w-7xl mx-auto px-4">
        {/* Search & Filters Controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between mb-10 pb-6 border-b">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search by SKU, Name, or Application..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-2xl border-2 border-border focus:border-accent bg-card text-foreground shadow-sm transition-all outline-none text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            <SlidersHorizontal className="text-muted-foreground w-4 h-4 mr-2 hidden sm:block" />
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex"
                >
                  <Card className="h-full w-full overflow-hidden group border-2 hover:border-accent transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
                    <div>
                      {/* CSSD Item Header */}
                      <div className="bg-secondary/30 p-5 border-b border-border flex justify-between items-start">
                        <Badge variant="secondary" className="font-mono text-xs text-muted-foreground shadow-sm">
                          {product.sku}
                        </Badge>
                        {product.iso_class !== "N/A" && (
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {product.iso_class}
                          </Badge>
                        )}
                      </div>

                      {/* Card Content */}
                      <CardContent className="p-6">
                        <h3 className="font-bold text-xl mb-2 text-primary group-hover:text-accent transition-colors line-clamp-2 leading-tight">
                          {product.title}
                        </h3>
                        <p className="text-muted-foreground font-medium text-sm mb-4">
                          {product.category}
                        </p>

                        <div className="space-y-3 bg-secondary/20 p-4 rounded-xl border border-secondary">
                          <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/80 leading-snug">{product.primary_application}</span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-foreground/80 leading-snug">{product.packaging_spec}</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>

                    <div className="px-6 pb-6 mt-auto">
                      <Button className="w-full bg-primary group-hover:bg-accent hover:bg-accent text-white flex justify-center items-center gap-2 h-11 text-sm font-semibold transition-colors" asChild>
                        <Link href={`/products/${product.sku}`}>
                          Request Quotation <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border col-span-full"
            >
              <SlidersHorizontal className="mx-auto w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-primary mb-2">No matching products found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                We couldn&apos;t find any products matching &quot;{searchQuery}&quot; in the selected category. Try revising your keywords or clearing the filter.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Reset Search Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
