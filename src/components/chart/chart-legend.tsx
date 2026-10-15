import { Legend } from 'recharts'

import type { ChartLegendProps } from './chart.types'

export function ChartLegend({ children, ...props }: ChartLegendProps) {
  return <Legend {...props}>{children}</Legend>
}
