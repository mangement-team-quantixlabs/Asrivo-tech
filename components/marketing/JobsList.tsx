"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowRight, Briefcase, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { JobListing } from "@/types";

interface JobsListProps {
  initialJobs: JobListing[];
}

export default function JobsList({ initialJobs }: JobsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique options dynamically
  const departments = useMemo(() => {
    const unique = new Set(initialJobs.map((j) => j.department).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [initialJobs]);

  const locations = useMemo(() => {
    const unique = new Set(initialJobs.map((j) => j.location).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [initialJobs]);

  const experienceLevels = useMemo(() => {
    const unique = new Set(initialJobs.map((j) => j.experience_level).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [initialJobs]);

  const employmentTypes = useMemo(() => {
    const unique = new Set(initialJobs.map((j) => j.employment_type).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [initialJobs]);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDept === "All" || job.department === selectedDept;
      const matchesLocation = selectedLocation === "All" || job.location === selectedLocation;
      const matchesLevel = selectedLevel === "All" || job.experience_level === selectedLevel;
      const matchesType = selectedType === "All" || job.employment_type === selectedType;

      return matchesSearch && matchesDept && matchesLocation && matchesLevel && matchesType;
    });
  }, [initialJobs, searchQuery, selectedDept, selectedLocation, selectedLevel, selectedType]);

  return (
    <div className="space-y-8">
      {/* Search & Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search by title, department, location..."
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
          {(selectedDept !== "All" || selectedLocation !== "All" || selectedLevel !== "All" || selectedType !== "All") && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-xxs font-bold text-white">
              {
                [selectedDept, selectedLocation, selectedLevel, selectedType].filter(
                  (f) => f !== "All"
                ).length
              }
            </span>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Department */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-gray-400">
                  Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-brand-off-white px-3 text-sm text-brand-gray-700 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/25"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-gray-400">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-brand-off-white px-3 text-sm text-brand-gray-700 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/25"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-gray-400">
                  Experience Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-brand-off-white px-3 text-sm text-brand-gray-700 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/25"
                >
                  {experienceLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employment Type */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-gray-400">
                  Employment Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-10 w-full rounded-lg border border-border bg-brand-off-white px-3 text-sm text-brand-gray-700 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/25"
                >
                  {employmentTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear */}
            {(selectedDept !== "All" || selectedLocation !== "All" || selectedLevel !== "All" || selectedType !== "All") && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedDept("All");
                    setSelectedLocation("All");
                    setSelectedLevel("All");
                    setSelectedType("All");
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

      {/* Listings */}
      {filteredJobs.length > 0 ? (
        <motion.div layout className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/careers/${job.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-white p-5 transition-all hover:border-brand-electric/20 hover:shadow-md"
                >
                  <div>
                    <h3 className="text-base font-semibold text-brand-navy group-hover:text-brand-electric transition-colors">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-brand-gray-400">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {job.department}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.employment_type}
                      </span>
                      <span>•</span>
                      <span className="rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-xs font-medium text-brand-teal">
                        {job.experience_level}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-brand-gray-400 group-hover:text-brand-electric transition-colors shrink-0" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-16 text-center"
        >
          <p className="text-base font-semibold text-brand-navy font-[var(--font-sora)]">
            No openings found
          </p>
          <p className="mt-1 text-sm text-brand-gray-400">
            Try adjusting your search query or filters.
          </p>
        </motion.div>
      )}
    </div>
  );
}
