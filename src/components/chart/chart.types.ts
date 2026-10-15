import React from 'react'
import type {
  TooltipProps as RechartsTooltipProps,
  TooltipContentProps as RechartsTooltipContentProps,
  LegendProps as RechartsLegendProps,
  DefaultLegendContentProps as RechartsDefaultLegendContentProps,
} from 'recharts'

const THEMES = { dark: '.dark', light: '' } as const,
  ChartContainerContext = React.createContext<ChartContainerContextProps | undefined>(undefined),
  ChartLegendPayloadContext = React.createContext<
    | {
        label?: string
        color?: string
        icon?: React.ComponentType
      }
    | undefined
  >(undefined)

type ChartConfig = Record<
  string,
  {
    label?: string
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

interface ChartContainerContextProps {
  config: ChartConfig
}

type ChartContainerProps = React.ComponentProps<'div'> & {
  config: ChartConfig
  initialDimension?: { width: number; height: number }
}

type ChartTooltipProps = RechartsTooltipProps
type ChartTooltipContentProps = React.ComponentProps<'div'> & Partial<RechartsTooltipContentProps>
type ChartLegendProps = RechartsLegendProps
type ChartLegendContentProps = React.ComponentProps<'div'> & RechartsDefaultLegendContentProps
type ChartTooltipLabelProps = React.ComponentProps<'p'>
type ChartTooltipNameProps = React.ComponentProps<'p'>
type ChartTooltipPayloadProps = React.ComponentProps<'div'>
type ChartLegendPayloadProps = React.ComponentProps<'div'>
type ChartTooltipIndicatorProps = React.ComponentProps<'div'> & {
  shape?: 'circle' | 'square' | 'diamond' | 'triangle' | 'wye' | 'line'
}
type ChartLinearGradientProps = React.ComponentProps<'defs'> & {
  gradients: {
    id: string
    stopColor: string
  }[]
}
type ChartTooltipIconProps = React.ComponentProps<'div'>
type ChartLegendIconProps = React.ComponentProps<'div'>
type ChartLegendLabelProps = React.ComponentProps<'p'>
type ChartLegendIndicatorProps = React.ComponentProps<'div'> & {
  shape?: 'circle' | 'square' | 'diamond' | 'triangle' | 'wye' | 'line'
}
type ChartTooltipValueProps = React.ComponentProps<'p'>

export type {
  ChartConfig,
  ChartContainerContextProps,
  ChartContainerProps,
  ChartTooltipProps,
  ChartTooltipContentProps,
  ChartLegendProps,
  ChartLegendContentProps,
  ChartTooltipLabelProps,
  ChartTooltipNameProps,
  ChartTooltipPayloadProps,
  ChartLegendPayloadProps,
  ChartTooltipIndicatorProps,
  ChartLinearGradientProps,
  ChartTooltipIconProps,
  ChartLegendIconProps,
  ChartLegendLabelProps,
  ChartLegendIndicatorProps,
  ChartTooltipValueProps,
}
export { ChartContainerContext, ChartLegendPayloadContext }
