// Represents a single stock/asset holding in the portfolio
export interface Holding {
  id: string;
  symbol: string;        // e.g. "AAPL", "TSLA"
  name: string;           // e.g. "Apple Inc."
  shares: number;         // number of shares held
  avgBuyPrice: number;    // average purchase price per share
  currentPrice: number;   // current market price per share
  sector: string;         // e.g. "Technology", "Healthcare"
}

// Represents a single day's portfolio value (for line/area charts)
export interface PortfolioHistoryPoint {
  date: string;           // ISO date string, e.g. "2026-07-01"
  totalValue: number;     // total portfolio value on that date
}

// Represents overall portfolio summary metrics (for KPI cards)
export interface PortfolioSummary {
  totalValue: number;         // current total portfolio value
  dailyChange: number;        // absolute change since yesterday
  dailyChangePercent: number; // percentage change since yesterday
  totalGainLoss: number;      // absolute gain/loss since purchase
  totalGainLossPercent: number; // percentage gain/loss since purchase
}

// Represents sector allocation breakdown (for pie chart)
export interface SectorAllocation {
  sector: string;
  value: number;           // total value invested in this sector
  percentage: number;      // percentage of total portfolio
}

// Full response shape returned by the mock API endpoint
export interface DashboardData {
  summary: PortfolioSummary;
  holdings: Holding[];
  history: PortfolioHistoryPoint[];
  sectorAllocation: SectorAllocation[];
}

// Supported time range filters for the dashboard
export type TimeRange = "7D" | "1M" | "3M" | "1Y" | "ALL";