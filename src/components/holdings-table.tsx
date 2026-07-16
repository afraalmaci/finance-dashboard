"use client";

import { useState } from "react";
import { Holding } from "../types/portfolio";

interface HoldingsTableProps {
  holdings: Holding[];
}

type SortKey = "symbol" | "shares" | "currentPrice" | "gainLoss";
type SortDirection = "asc" | "desc";

// Calculates gain/loss value and percentage for a single holding
function getGainLoss(holding: Holding) {
  const costBasis = holding.shares * holding.avgBuyPrice;
  const currentValue = holding.shares * holding.currentPrice;
  const gainLoss = currentValue - costBasis;
  const gainLossPercent = (gainLoss / costBasis) * 100;
  return { gainLoss, gainLossPercent, currentValue };
}

// Renders a sortable table of portfolio holdings
export function HoldingsTable({ holdings }: HoldingsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("symbol");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  const sortedHoldings = [...holdings].sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    if (sortKey === "gainLoss") {
      aValue = getGainLoss(a).gainLoss;
      bValue = getGainLoss(b).gainLoss;
    } else {
      aValue = a[sortKey];
      bValue = b[sortKey];
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc"
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  function SortButton({
    label,
    sortKeyValue,
    align = "left",
  }: {
    label: string;
    sortKeyValue: SortKey;
    align?: "left" | "right";
  }) {
    const isActive = sortKey === sortKeyValue;
    return (
      <button
        onClick={() => handleSort(sortKeyValue)}
        className={`flex items-center gap-1 w-full hover:text-gray-900 dark:hover:text-gray-100 transition-colors ${
          align === "right" ? "justify-end" : "justify-start"
        }`}
      >
        {label}
        <span
          className={`text-xs ${
            isActive ? "text-gray-700 dark:text-gray-200" : "text-gray-300 dark:text-gray-600"
          }`}
        >
          {isActive && sortDirection === "desc" ? "▼" : "▲"}
        </span>
      </button>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm table-fixed">
        <colgroup>
          <col className="w-[12%]" />
          <col className="w-[28%]" />
          <col className="w-[20%]" />
          <col className="w-[12%]" />
          <col className="w-[13%]" />
          <col className="w-[15%]" />
        </colgroup>
        <thead>
          <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
            <th className="pb-2 pr-4 font-medium">
              <SortButton label="Symbol" sortKeyValue="symbol" />
            </th>
            <th className="pb-2 pr-4 font-medium">Name</th>
            <th className="pb-2 pr-4 font-medium">Sector</th>
            <th className="pb-2 pr-4 font-medium">
              <SortButton label="Shares" sortKeyValue="shares" align="right" />
            </th>
            <th className="pb-2 pr-4 font-medium">
              <SortButton label="Price" sortKeyValue="currentPrice" align="right" />
            </th>
            <th className="pb-2 font-medium">
              <SortButton label="Gain/Loss" sortKeyValue="gainLoss" align="right" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedHoldings.map((holding) => {
            const { gainLoss, gainLossPercent } = getGainLoss(holding);
            const isPositive = gainLoss >= 0;

            return (
              <tr
                key={holding.id}
                className="border-b border-gray-50 dark:border-gray-800/50 last:border-0"
              >
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-gray-100 truncate">
                  {holding.symbol}
                </td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 truncate">
                  {holding.name}
                </td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 truncate">
                  {holding.sector}
                </td>
                <td className="py-3 pr-4 text-right text-gray-900 dark:text-gray-100">
                  {holding.shares}
                </td>
                <td className="py-3 pr-4 text-right text-gray-900 dark:text-gray-100">
                  ${holding.currentPrice.toFixed(2)}
                </td>
                <td
                  className={`py-3 text-right font-medium whitespace-nowrap ${
                    isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  ${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(1)}%)
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}