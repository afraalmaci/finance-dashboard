import {
  Holding,
  PortfolioHistoryPoint,
  PortfolioSummary,
  SectorAllocation,
  DashboardData,
} from "@/src/types/portfolio";

// Mock stock holdings with realistic-looking values
export const mockHoldings: Holding[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 25,
    avgBuyPrice: 168.5,
    currentPrice: 194.3,
    sector: "Technology",
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    shares: 15,
    avgBuyPrice: 320.1,
    currentPrice: 342.8,
    sector: "Technology",
  },
  {
    id: "3",
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 10,
    avgBuyPrice: 210.0,
    currentPrice: 178.4,
    sector: "Consumer Discretionary",
  },
  {
    id: "4",
    symbol: "JNJ",
    name: "Johnson & Johnson",
    shares: 20,
    avgBuyPrice: 155.2,
    currentPrice: 162.7,
    sector: "Healthcare",
  },
  {
    id: "5",
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    shares: 12,
    avgBuyPrice: 145.0,
    currentPrice: 168.9,
    sector: "Financials",
  },
  {
    id: "6",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    shares: 8,
    avgBuyPrice: 410.0,
    currentPrice: 495.6,
    sector: "Technology",
  },
  {
    id: "7",
    symbol: "PG",
    name: "Procter & Gamble",
    shares: 18,
    avgBuyPrice: 142.3,
    currentPrice: 148.9,
    sector: "Consumer Staples",
  },
];

// Generates a mock history of total portfolio value for the past N days,
// walking backwards from today's real value so the data stays consistent
function generateHistory(days: number, endValue: number): PortfolioHistoryPoint[] {
  const today = new Date();
  const values: number[] = [endValue];

  // Walk backwards from today's value, applying small reverse fluctuations
  let value = endValue;
  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * 300;
    value -= change;
    values.unshift(value);
  }

  const history: PortfolioHistoryPoint[] = [];
  for (let i = 0; i <= days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - i));

    history.push({
      date: date.toISOString().split("T")[0],
      totalValue: Math.round(values[i] * 100) / 100,
    });
  }

  return history;
}
// Calculate today's real total value from holdings first,
// so the history array can end at a consistent value
const currentTotalValue = mockHoldings.reduce(
  (sum, h) => sum + h.shares * h.currentPrice,
  0
);

export const mockHistory: PortfolioHistoryPoint[] = generateHistory(365, currentTotalValue);

// Calculates sector allocation percentages based on holdings
function calculateSectorAllocation(holdings: Holding[]): SectorAllocation[] {
  const sectorTotals: Record<string, number> = {};
  let grandTotal = 0;

  holdings.forEach((h) => {
    const value = h.shares * h.currentPrice;
    sectorTotals[h.sector] = (sectorTotals[h.sector] || 0) + value;
    grandTotal += value;
  });

  return Object.entries(sectorTotals).map(([sector, value]) => ({
    sector,
    value: Math.round(value * 100) / 100,
    percentage: Math.round((value / grandTotal) * 1000) / 10,
  }));
}

export const mockSectorAllocation: SectorAllocation[] =
  calculateSectorAllocation(mockHoldings);

// Calculates overall portfolio summary from holdings and history
function calculateSummary(
  holdings: Holding[],
  history: PortfolioHistoryPoint[]
): PortfolioSummary {
  const totalValue = holdings.reduce(
    (sum, h) => sum + h.shares * h.currentPrice,
    0
  );
  const totalCost = holdings.reduce(
    (sum, h) => sum + h.shares * h.avgBuyPrice,
    0
  );

  const yesterday = history[history.length - 2]?.totalValue ?? totalValue;
  const dailyChange = totalValue - yesterday;
  const dailyChangePercent = (dailyChange / yesterday) * 100;

  const totalGainLoss = totalValue - totalCost;
  const totalGainLossPercent = (totalGainLoss / totalCost) * 100;

  return {
    totalValue: Math.round(totalValue * 100) / 100,
    dailyChange: Math.round(dailyChange * 100) / 100,
    dailyChangePercent: Math.round(dailyChangePercent * 100) / 100,
    totalGainLoss: Math.round(totalGainLoss * 100) / 100,
    totalGainLossPercent: Math.round(totalGainLossPercent * 100) / 100,
  };
}

export const mockSummary: PortfolioSummary = calculateSummary(
  mockHoldings,
  mockHistory
);

// Full mock dashboard data object, matching the DashboardData shape
export const mockDashboardData: DashboardData = {
  summary: mockSummary,
  holdings: mockHoldings,
  history: mockHistory,
  sectorAllocation: mockSectorAllocation,
};