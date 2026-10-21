import { TrendDownIcon, TrendUpIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, LabelList, AreaChart, Area } from 'recharts'

import { TabsTab } from '@/index'

import { Tabs, TabsIndicator, TabsList } from '../tabs'
import type { TabsTabValue } from '../tabs/tabs.types'
import { ChartContainer } from './chart-container'
import { ChartLegend } from './chart-legend'
import { ChartLegendContent } from './chart-legend-content'
import { ChartLinearGradient } from './chart-linear-gradient'
import { ChartTooltip } from './chart-tooltip'
import { ChartTooltipContent } from './chart-tooltip-content'
import { ChartTooltipIcon } from './chart-tooltip-icon'
import { ChartTooltipIndicator } from './chart-tooltip-indicator'
import { ChartTooltipLabel } from './chart-tooltip-label'
import { ChartTooltipName } from './chart-tooltip-name'
import { ChartTooltipPayload } from './chart-tooltip-payload'
import { ChartTooltipValue } from './chart-tooltip-value'
import type { ChartConfig } from './chart.types'

type MyData = {
  month: string
  desktop: number
  mobile: number
}

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
] satisfies MyData[]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--ixia-brand-default)',
    icon: TrendUpIcon,
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--ixia-accent-default)',
    icon: TrendDownIcon,
  },
} satisfies ChartConfig

export default {
  title: 'Components/Chart',
  component: ChartContainer,
  args: {
    config: chartConfig,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      subtitle: 'A chart component that displays data in a visual format.',
      description: {
        component: 'A chart component that displays data in a visual format.',
      },
    },
  },
} as Meta<typeof ChartContainer>

type Story = StoryObj<typeof ChartContainer>

export const AreaChartStory: Story = {
  name: 'Area / Default',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Area
          radius={8}
          stackId="a"
          type="natural"
          dataKey="desktop"
          fill={chartConfig.desktop.color}
          stroke={chartConfig.desktop.color}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  ),
}

export const AreaChartLinearStory: Story = {
  name: 'Area / Linear',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Area
          radius={8}
          stackId="a"
          type="linear"
          dataKey="desktop"
          fill={chartConfig.desktop.color}
          stroke={chartConfig.desktop.color}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  ),
}

export const AreaChartStepStory: Story = {
  name: 'Area / Step',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Area
          radius={8}
          stackId="a"
          type="step"
          dataKey="desktop"
          fill={chartConfig.desktop.color}
          stroke={chartConfig.desktop.color}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  ),
}

export const AreaChartStackedStory: Story = {
  name: 'Area / Stacked',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Area
          radius={8}
          stackId="a"
          type="natural"
          dataKey="desktop"
          fill={chartConfig.desktop.color}
          stroke={chartConfig.desktop.color}
          strokeWidth={2}
        />
        <Area<MyData, number>
          radius={8}
          stackId="a"
          type="natural"
          dataKey="mobile"
          fill={chartConfig.mobile.color}
          stroke={chartConfig.mobile.color}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  ),
}

export const AreaChartStackedExpandedStory: Story = {
  name: 'Area / Stacked Expanded',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <AreaChart data={chartData} stackOffset="expand">
        <CartesianGrid vertical={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Area
          radius={8}
          stackId="a"
          type="natural"
          dataKey="desktop"
          fill={chartConfig.desktop.color}
          stroke={chartConfig.desktop.color}
          strokeWidth={2}
        />
        <Area<MyData, number>
          radius={8}
          stackId="a"
          type="natural"
          dataKey="mobile"
          fill={chartConfig.mobile.color}
          stroke={chartConfig.mobile.color}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  ),
}

export const AreaChartGradientStory: Story = {
  name: 'Area / Gradient',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <YAxis axisLine={false} tickLine={false} tickMargin={10} type="number" />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Area<MyData, number>
          radius={8}
          stackId="a"
          type="natural"
          dataKey="mobile"
          fill="url(#fillMobile)"
          stroke={chartConfig.mobile.color}
          strokeWidth={2}
        />
        <Area
          radius={8}
          stackId="a"
          type="natural"
          dataKey="desktop"
          fill="url(#fillDesktop)"
          stroke={chartConfig.desktop.color}
          strokeWidth={2}
        />
        <ChartLinearGradient
          gradients={[
            { id: 'fillDesktop', stopColor: chartConfig.desktop.color },
            { id: 'fillMobile', stopColor: chartConfig.mobile.color },
          ]}
        />
      </AreaChart>
    </ChartContainer>
  ),
}

export const AreaChartIconsStory: Story = {
  name: 'Area / Icons',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <AreaChart data={chartData}>
        <CartesianGrid vertical={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <YAxis axisLine={false} tickLine={false} tickMargin={10} type="number" />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIcon />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Area<MyData, number>
          radius={8}
          stackId="a"
          type="natural"
          dataKey="mobile"
          fill="url(#fillMobile)"
          stroke={chartConfig.mobile.color}
          strokeWidth={2}
        />
        <Area
          radius={8}
          stackId="a"
          type="natural"
          dataKey="desktop"
          fill="url(#fillDesktop)"
          stroke={chartConfig.desktop.color}
          strokeWidth={2}
        />
        <ChartLinearGradient
          gradients={[
            { id: 'fillDesktop', stopColor: chartConfig.desktop.color },
            { id: 'fillMobile', stopColor: chartConfig.mobile.color },
          ]}
        />
      </AreaChart>
    </ChartContainer>
  ),
}

export const BarChartStory: Story = {
  name: 'Bar / Default',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray={'6'} />
        <ChartLegend content={<ChartLegendContent />} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Bar radius={8} dataKey="desktop" fill={chartConfig.desktop.color} />
      </BarChart>
    </ChartContainer>
  ),
}

export const BarChartMultipleStory: Story = {
  name: 'Bar / Multiple',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <BarChart data={chartData} barGap={8} barCategoryGap={'20%'}>
        <CartesianGrid vertical={false} />
        <ChartLegend content={<ChartLegendContent />} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Bar radius={99} dataKey="desktop" fill={chartConfig.desktop.color} />
        <Bar radius={99} dataKey="mobile" fill={chartConfig.mobile.color} />
      </BarChart>
    </ChartContainer>
  ),
}

export const BarChartHorizontalStory: Story = {
  name: 'Bar / Horizontal',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <BarChart data={chartData} layout="vertical" barGap={8} barCategoryGap={'20%'}>
        <ChartLegend content={<ChartLegendContent />} />
        <CartesianGrid horizontal={false} strokeDasharray={'6'} />
        <XAxis axisLine={false} tickLine={false} type="number" dataKey="desktop" />
        <YAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Bar radius={4} dataKey="desktop" fill={chartConfig.desktop.color} />
        <Bar radius={4} dataKey="mobile" fill={chartConfig.mobile.color} />
      </BarChart>
    </ChartContainer>
  ),
}

export const BarChartStackedStory: Story = {
  name: 'Bar / Stacked',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Bar
          radius={[0, 0, 4, 4]}
          stackId={'a'}
          dataKey="desktop"
          fill={chartConfig.desktop.color}
        />
        <Bar radius={[4, 4, 0, 0]} stackId={'a'} dataKey="mobile" fill={chartConfig.mobile.color} />
      </BarChart>
    </ChartContainer>
  ),
}

export const BarChartLabelStory: Story = {
  name: 'Bar / Label',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Bar radius={8} dataKey="desktop" fill={chartConfig.desktop.color}>
          <LabelList position="top" offset={12} fontSize={12} />
        </Bar>
      </BarChart>
    </ChartContainer>
  ),
}

export const BarChartCustomLabelStory: Story = {
  name: 'Bar / Custom Label',
  render: (args) => (
    <ChartContainer {...args} className="min-h-[400px] w-full">
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid horizontal={false} />
        <YAxis<MyData, string>
          axisLine={false}
          dataKey={'month'}
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
          type="category"
          hide
        />
        <XAxis dataKey="desktop" type="number" hide />
        <ChartTooltip
          content={
            <ChartTooltipContent>
              <ChartTooltipLabel />
              <ChartTooltipPayload>
                <ChartTooltipIndicator />
                <ChartTooltipName />
                <ChartTooltipValue />
              </ChartTooltipPayload>
            </ChartTooltipContent>
          }
        />
        <Bar radius={8} dataKey="desktop" fill={chartConfig.desktop.color}>
          <LabelList
            dataKey="month"
            position="insideLeft"
            offset={8}
            fontSize={12}
            className="fill-on-surface-inverse font-bold"
          />
          <LabelList dataKey="desktop" position="right" offset={8} fontSize={12} />
        </Bar>
      </BarChart>
    </ChartContainer>
  ),
}

export const BarChartDataSwitch: Story = {
  name: 'Bar / Data Switch',
  render: (args) => {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('desktop')

    const handleTabChange = (value: TabsTabValue) => {
      setActiveChart(value)
    }

    return (
      <div className="space-y-xl">
        <Tabs fill={false} size="small" value={activeChart} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTab value="desktop">Desktop</TabsTab>
            <TabsTab value="mobile">Mobile</TabsTab>
            <TabsIndicator />
          </TabsList>
        </Tabs>
        <ChartContainer {...args} className="min-h-[400px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey={'month'}
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={10}
              type="category"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent>
                  <ChartTooltipLabel />
                  <ChartTooltipPayload>
                    <ChartTooltipIndicator />
                    <ChartTooltipName />
                    <ChartTooltipValue />
                  </ChartTooltipPayload>
                </ChartTooltipContent>
              }
            />
            <Bar radius={8} dataKey={activeChart} fill={chartConfig[activeChart].color}>
              <LabelList position="top" offset={12} fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    )
  },
}
