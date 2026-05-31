"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudyCard from "./CaseStudyCard";
import type { CaseStudy } from "@/types";

interface CaseStudiesListProps {
  initialCaseStudies: CaseStudy[];
}

export default function CaseStudiesList({ initialCaseStudies }: CaseStudiesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedService, setSelectedService] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique filter options dynamically from data
  const industries = useMemo(() => {
    const unique = new Set(initialCaseStudies.map((cs) => cs.industry).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [initialCaseStudies]);

  const services = useMemo(() => {
    const unique = new Set(initialCaseStudies.map((cs) => cs.service).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [initialCaseStudies]);

  const regions = useMemo(() => {
    const unique = new Set(initialCaseStudies.map((cs) => cs.region).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [initialCaseStudies]);

  const filteredStudies = useMemo(() => {
    return initialCaseStudies.filter((cs) => {
      const matchesSearch =
        cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cs.client_name && cs.client_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cs.challenge && cs.challenge.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesIndustry =
        selectedIndustry === "All" || cs.industry === selectedIndustry;
      const matchesService =
        selectedService === "All" || cs.service === selectedService;
      const matchesRegion =
        selectedRegion === "All" || cs.region === selectedRegion;

      return matchesSearch && matchesIndustry && matchesService && matchesRegion;
    });
  }, [initialCaseStudies, searchQuery, selectedIndustry, selectedService, selectedRegion]);

  return (
    <div className="space-y-8">
      {/* Search and Toggle Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by client or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm placeholder:text-brand-gray-400 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20 text-brand-gray-700 transition-all duration-300"
          />
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-400" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex h-11 items-center gap-2 rounded-lg border px-5 text-sm font-semibold transition-all duration-300 ${
            showFilters
              ? "bg-brand-electric border-brand-electric text-white shadow-lg shadow-brand-electric/20"
              : "bg-white border-border text-brand-gray-700 hover:border-brand-electric/50"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {(selectedIndustry !== "All" || selectedService !== "All" || selectedRegion !== "All") && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-xxs font-bold text-white">
              {
                [selectedIndustry, selectedService, selectedRegion].filter(
                  (f) => f !== "All"
                ).length
              }
            </span>
          )}
        </button>
      </div>

      {/* Expanded Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm"
          >
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Industry */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-gray-400">
                  Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-brand-off-white px-3 text-sm text-brand-gray-700 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/25"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-gray-400">
                  Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-brand-off-white px-3 text-sm text-brand-gray-700 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/25"
                >
                  {services.map((svc) => (
                    <option key={svc} value={svc}>
                      {svc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-gray-400">
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-brand-off-white px-3 text-sm text-brand-gray-700 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/25"
                >
                  {regions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedIndustry !== "All" || selectedService !== "All" || selectedRegion !== "All") && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedIndustry("All");
                    setSelectedService("All");
                    setSelectedRegion("All");
                  }}
                  className="text-xs font-semibold text-brand-electric hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid List */}
      {filteredStudies.length > 0 ? (
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((cs, i) => {
              let firstStat = { stat: "N/A", label: "Result" };
              try {
                const results = typeof cs.results === "string" ? JSON.parse(cs.results) : cs.results;
                if (Array.isArray(results) && results.length > 0) {
                  firstStat = {
                    stat: results[0].stat || "N/A",
                    label: results[0].label || "Result",
                  };
                }
              } catch (e) {
                console.error("Error parsing case study results", e);
              }

              return (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <CaseStudyCard
                    title={cs.title}
                    client={cs.client_name || "Enterprise Client"}
                    stat={firstStat.stat}
                    statLabel={firstStat.label}
                    industry={cs.industry || "Technology"}
                    href={`/case-studies/${cs.slug}`}
                    index={i}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-16 text-center"
        >
          <p className="text-base font-semibold text-brand-navy font-[var(--font-sora)]">
            No case studies found
          </p>
          <p className="mt-1 text-sm text-brand-gray-400">
            Try adjusting your search query or filters.
          </p>
        </motion.div>
      )}
    </div>
  );
}
