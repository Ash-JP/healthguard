"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import inventory from "@/data/inventory.json";

export default function ProductsCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");

  const { departments, products } = inventory;

  // Filter products based on search query and selected department
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.workflowStage && product.workflowStage.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === "all" || product.departmentId === selectedDept;

    return matchesSearch && matchesDept;
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
            Solutions Directory
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Enterprise Solutions Catalog
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Explore our curated catalog of medical equipment and workflow integrated solutions for CSSD, Endoscopy, and Radiology.
          </p>
        </div>
      </section>

      {/* Main Catalog Area */}
      <section className="container py-12 lg:py-16 max-w-6xl mx-auto px-4">
        {/* Search & Filters Controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between mb-10 pb-6 border-b">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search products, specifications, workflows..."
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

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            <SlidersHorizontal className="text-muted-foreground w-4 h-4 mr-2 hidden sm:block" />
            <button
              onClick={() => setSelectedDept("all")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedDept === "all"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              All Departments
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedDept === dept.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {dept.name}
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
              {filteredProducts.map((product, index) => {
                const dept = departments.find((d) => d.id === product.departmentId);
                return (
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
                        {/* Image Showcase */}
                        <div className="relative h-52 bg-muted overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            {dept && (
                              <Badge className="bg-primary/95 text-primary-foreground font-semibold">
                                {dept.name}
                              </Badge>
                            )}
                            {product.workflowStage && (
                              <Badge className="bg-accent/95 text-accent-foreground font-semibold">
                                {product.workflowStage}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Card Content */}
                        <CardContent className="p-6">
                          <h3 className="font-bold text-xl mb-3 text-primary group-hover:text-accent transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                            {product.description}
                          </p>
                        </CardContent>
                      </div>

                      <div className="px-6 pb-6 mt-auto">
                        <Button className="w-full bg-primary group-hover:bg-accent hover:bg-accent text-white flex justify-center items-center gap-2 h-11 text-sm font-semibold transition-colors" asChild>
                          <Link href={`/products/${product.slug}`}>
                            View System Details <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border"
            >
              <SlidersHorizontal className="mx-auto w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-primary mb-2">No matching systems found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                We couldn&apos;t find any products matching &quot;{searchQuery}&quot; in the selected filter. Try revising your keywords or clearing the filter.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("all");
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
