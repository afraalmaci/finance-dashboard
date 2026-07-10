"use client";

import { useDashboardStore } from "../store/dashboard-store";
import { useDashboardData } from "../lib/use-dashboard-data";

// Main dashboard page - orchestrates layout and data fetching
export default function DashboardPage() {
  const isDarkMode = useDashboardStore((state) => state.isDarkMode);
  const toggleDarkMode = useDashboardStore((state) => state.toggleDarkMode);
  const { data, isLoading, error } = useDashboardData();

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Portfolio Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track your investments at a glance
          </p>
        </div>
        <button
          onClick={toggleDarkMode}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* Loading state */}
      {isLoading && (
        <p className="text-gray-500 dark:text-gray-400">Loading dashboard data...</p>
      )}

      {/* Error state */}
      {error && (
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
      )}

      {/* Data loaded */}
      {data && !isLoading && (
        <>
          {/* KPI summary cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
              <p className="text-xl font-semibold mt-1 text-gray-900 dark:text-gray-100">
                ${data.summary.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Daily Change</p>
              <p className={`text-xl font-semibold mt-1 ${data.summary.dailyChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {data.summary.dailyChange >= 0 ? "+" : ""}
                {data.summary.dailyChangePercent.toFixed(2)}%
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Gain/Loss</p>
              <p className={`text-xl font-semibold mt-1 ${data.summary.totalGainLoss >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {data.summary.totalGainLoss >= 0 ? "+" : ""}
                ${data.summary.totalGainLoss.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Holdings</p>
              <p className="text-xl font-semibold mt-1 text-gray-900 dark:text-gray-100">
                {data.holdings.length}
              </p>
            </div>
          </section>

          {/* Main content grid: chart + sector allocation (still placeholders) */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 h-80">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio Value Over Time</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 h-80">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sector Allocation</p>
            </div>
          </section>

          {/* Holdings table (still placeholder) */}
          <section className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Holdings</p>
          </section>
        </>
      )}
    </div>
  );
}