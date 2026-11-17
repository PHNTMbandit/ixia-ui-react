import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
  ],
  docs: {
    defaultName: 'Overview',
  },
  framework: '@storybook/react-vite',
  staticDirs: [
    { from: '../llms.txt', to: '/llms.txt' },
    { from: '../docs/llms', to: '/docs/llms' },
  ],
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../tools/figma/fixtures/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
}
export default config
