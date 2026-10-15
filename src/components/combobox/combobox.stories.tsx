import { SpinnerGapIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Virtualizer } from '@tanstack/react-virtual'
import React from 'react'

import { useFilter } from './combobox.types'
import { Combobox } from './index'

interface Fruit {
  label: string
  value: string
}

const fruits: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Blackberry', value: 'blackberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Guava', value: 'guava' },
  { label: 'Lychee', value: 'lychee' },
  { label: 'Pomegranate', value: 'pomegranate' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Grapefruit', value: 'grapefruit' },
  { label: 'Passionfruit', value: 'passionfruit' },
]

interface ProgrammingLanguage {
  id: string
  value: string
}

const langs: ProgrammingLanguage[] = [
  { id: 'js', value: 'JavaScript' },
  { id: 'ts', value: 'TypeScript' },
  { id: 'py', value: 'Python' },
  { id: 'java', value: 'Java' },
  { id: 'cpp', value: 'C++' },
  { id: 'cs', value: 'C#' },
  { id: 'php', value: 'PHP' },
  { id: 'ruby', value: 'Ruby' },
  { id: 'go', value: 'Go' },
  { id: 'rust', value: 'Rust' },
  { id: 'swift', value: 'Swift' },
]

interface Country {
  code: string
  value: string
  continent: string
  label: string
}

const countries: Country[] = [
  { code: 'af', continent: 'Asia', label: 'Afghanistan', value: 'afghanistan' },
  { code: 'al', continent: 'Europe', label: 'Albania', value: 'albania' },
  { code: 'dz', continent: 'Africa', label: 'Algeria', value: 'algeria' },
  { code: 'ad', continent: 'Europe', label: 'Andorra', value: 'andorra' },
  { code: 'ao', continent: 'Africa', label: 'Angola', value: 'angola' },
  {
    code: 'ar',
    continent: 'South America',
    label: 'Argentina',
    value: 'argentina',
  },
  { code: 'am', continent: 'Asia', label: 'Armenia', value: 'armenia' },
  { code: 'au', continent: 'Oceania', label: 'Australia', value: 'australia' },
  { code: 'at', continent: 'Europe', label: 'Austria', value: 'austria' },
  { code: 'az', continent: 'Asia', label: 'Azerbaijan', value: 'azerbaijan' },
  {
    code: 'bs',
    continent: 'North America',
    label: 'Bahamas',
    value: 'bahamas',
  },
  { code: 'bh', continent: 'Asia', label: 'Bahrain', value: 'bahrain' },
  { code: 'bd', continent: 'Asia', label: 'Bangladesh', value: 'bangladesh' },
  {
    code: 'bb',
    continent: 'North America',
    label: 'Barbados',
    value: 'barbados',
  },
  { code: 'by', continent: 'Europe', label: 'Belarus', value: 'belarus' },
  { code: 'be', continent: 'Europe', label: 'Belgium', value: 'belgium' },
  { code: 'bz', continent: 'North America', label: 'Belize', value: 'belize' },
  { code: 'bj', continent: 'Africa', label: 'Benin', value: 'benin' },
  { code: 'bt', continent: 'Asia', label: 'Bhutan', value: 'bhutan' },
  {
    code: 'bo',
    continent: 'South America',
    label: 'Bolivia',
    value: 'bolivia',
  },
  {
    code: 'ba',
    continent: 'Europe',
    label: 'Bosnia and Herzegovina',
    value: 'bosnia-and-herzegovina',
  },
  { code: 'bw', continent: 'Africa', label: 'Botswana', value: 'botswana' },
  { code: 'br', continent: 'South America', label: 'Brazil', value: 'brazil' },
  { code: 'bn', continent: 'Asia', label: 'Brunei', value: 'brunei' },
  { code: 'bg', continent: 'Europe', label: 'Bulgaria', value: 'bulgaria' },
  {
    code: 'bf',
    continent: 'Africa',
    label: 'Burkina Faso',
    value: 'burkina-faso',
  },
  { code: 'bi', continent: 'Africa', label: 'Burundi', value: 'burundi' },
  { code: 'kh', continent: 'Asia', label: 'Cambodia', value: 'cambodia' },
  { code: 'cm', continent: 'Africa', label: 'Cameroon', value: 'cameroon' },
  { code: 'ca', continent: 'North America', label: 'Canada', value: 'canada' },
  { code: 'cv', continent: 'Africa', label: 'Cape Verde', value: 'cape-verde' },
  {
    code: 'cf',
    continent: 'Africa',
    label: 'Central African Republic',
    value: 'central-african-republic',
  },
  { code: 'td', continent: 'Africa', label: 'Chad', value: 'chad' },
  { code: 'cl', continent: 'South America', label: 'Chile', value: 'chile' },
  { code: 'cn', continent: 'Asia', label: 'China', value: 'china' },
  {
    code: 'co',
    continent: 'South America',
    label: 'Colombia',
    value: 'colombia',
  },
  { code: 'km', continent: 'Africa', label: 'Comoros', value: 'comoros' },
  { code: 'cg', continent: 'Africa', label: 'Congo', value: 'congo' },
  {
    code: 'cr',
    continent: 'North America',
    label: 'Costa Rica',
    value: 'costa-rica',
  },
  { code: 'hr', continent: 'Europe', label: 'Croatia', value: 'croatia' },
  { code: 'cu', continent: 'North America', label: 'Cuba', value: 'cuba' },
  { code: 'cy', continent: 'Asia', label: 'Cyprus', value: 'cyprus' },
  {
    code: 'cz',
    continent: 'Europe',
    label: 'Czech Republic',
    value: 'czech-republic',
  },
  { code: 'dk', continent: 'Europe', label: 'Denmark', value: 'denmark' },
  { code: 'dj', continent: 'Africa', label: 'Djibouti', value: 'djibouti' },
  {
    code: 'dm',
    continent: 'North America',
    label: 'Dominica',
    value: 'dominica',
  },
  {
    code: 'do',
    continent: 'North America',
    label: 'Dominican Republic',
    value: 'dominican-republic',
  },
  {
    code: 'ec',
    continent: 'South America',
    label: 'Ecuador',
    value: 'ecuador',
  },
  { code: 'eg', continent: 'Africa', label: 'Egypt', value: 'egypt' },
  {
    code: 'sv',
    continent: 'North America',
    label: 'El Salvador',
    value: 'el-salvador',
  },
  {
    code: 'gq',
    continent: 'Africa',
    label: 'Equatorial Guinea',
    value: 'equatorial-guinea',
  },
  { code: 'er', continent: 'Africa', label: 'Eritrea', value: 'eritrea' },
  { code: 'ee', continent: 'Europe', label: 'Estonia', value: 'estonia' },
  { code: 'et', continent: 'Africa', label: 'Ethiopia', value: 'ethiopia' },
  { code: 'fj', continent: 'Oceania', label: 'Fiji', value: 'fiji' },
  { code: 'fi', continent: 'Europe', label: 'Finland', value: 'finland' },
  { code: 'fr', continent: 'Europe', label: 'France', value: 'france' },
  { code: 'ga', continent: 'Africa', label: 'Gabon', value: 'gabon' },
  { code: 'gm', continent: 'Africa', label: 'Gambia', value: 'gambia' },
  { code: 'ge', continent: 'Asia', label: 'Georgia', value: 'georgia' },
  { code: 'de', continent: 'Europe', label: 'Germany', value: 'germany' },
  { code: 'gh', continent: 'Africa', label: 'Ghana', value: 'ghana' },
  { code: 'gr', continent: 'Europe', label: 'Greece', value: 'greece' },
  {
    code: 'gd',
    continent: 'North America',
    label: 'Grenada',
    value: 'grenada',
  },
  {
    code: 'gt',
    continent: 'North America',
    label: 'Guatemala',
    value: 'guatemala',
  },
  { code: 'gn', continent: 'Africa', label: 'Guinea', value: 'guinea' },
  {
    code: 'gw',
    continent: 'Africa',
    label: 'Guinea-Bissau',
    value: 'guinea-bissau',
  },
  { code: 'gy', continent: 'South America', label: 'Guyana', value: 'guyana' },
  { code: 'ht', continent: 'North America', label: 'Haiti', value: 'haiti' },
  {
    code: 'hn',
    continent: 'North America',
    label: 'Honduras',
    value: 'honduras',
  },
  { code: 'hu', continent: 'Europe', label: 'Hungary', value: 'hungary' },
  { code: 'is', continent: 'Europe', label: 'Iceland', value: 'iceland' },
  { code: 'in', continent: 'Asia', label: 'India', value: 'india' },
  { code: 'id', continent: 'Asia', label: 'Indonesia', value: 'indonesia' },
  { code: 'ir', continent: 'Asia', label: 'Iran', value: 'iran' },
  { code: 'iq', continent: 'Asia', label: 'Iraq', value: 'iraq' },
  { code: 'ie', continent: 'Europe', label: 'Ireland', value: 'ireland' },
  { code: 'il', continent: 'Asia', label: 'Israel', value: 'israel' },
  { code: 'it', continent: 'Europe', label: 'Italy', value: 'italy' },
  {
    code: 'jm',
    continent: 'North America',
    label: 'Jamaica',
    value: 'jamaica',
  },
  { code: 'jp', continent: 'Asia', label: 'Japan', value: 'japan' },
  { code: 'jo', continent: 'Asia', label: 'Jordan', value: 'jordan' },
  { code: 'kz', continent: 'Asia', label: 'Kazakhstan', value: 'kazakhstan' },
  { code: 'ke', continent: 'Africa', label: 'Kenya', value: 'kenya' },
  { code: 'kw', continent: 'Asia', label: 'Kuwait', value: 'kuwait' },
  { code: 'kg', continent: 'Asia', label: 'Kyrgyzstan', value: 'kyrgyzstan' },
  { code: 'la', continent: 'Asia', label: 'Laos', value: 'laos' },
  { code: 'lv', continent: 'Europe', label: 'Latvia', value: 'latvia' },
  { code: 'lb', continent: 'Asia', label: 'Lebanon', value: 'lebanon' },
  { code: 'ls', continent: 'Africa', label: 'Lesotho', value: 'lesotho' },
  { code: 'lr', continent: 'Africa', label: 'Liberia', value: 'liberia' },
  { code: 'ly', continent: 'Africa', label: 'Libya', value: 'libya' },
  {
    code: 'li',
    continent: 'Europe',
    label: 'Liechtenstein',
    value: 'liechtenstein',
  },
  { code: 'lt', continent: 'Europe', label: 'Lithuania', value: 'lithuania' },
  { code: 'lu', continent: 'Europe', label: 'Luxembourg', value: 'luxembourg' },
  { code: 'mg', continent: 'Africa', label: 'Madagascar', value: 'madagascar' },
  { code: 'mw', continent: 'Africa', label: 'Malawi', value: 'malawi' },
  { code: 'my', continent: 'Asia', label: 'Malaysia', value: 'malaysia' },
  { code: 'mv', continent: 'Asia', label: 'Maldives', value: 'maldives' },
  { code: 'ml', continent: 'Africa', label: 'Mali', value: 'mali' },
  { code: 'mt', continent: 'Europe', label: 'Malta', value: 'malta' },
  {
    code: 'mh',
    continent: 'Oceania',
    label: 'Marshall Islands',
    value: 'marshall-islands',
  },
  { code: 'mr', continent: 'Africa', label: 'Mauritania', value: 'mauritania' },
  { code: 'mu', continent: 'Africa', label: 'Mauritius', value: 'mauritius' },
  { code: 'mx', continent: 'North America', label: 'Mexico', value: 'mexico' },
  {
    code: 'fm',
    continent: 'Oceania',
    label: 'Micronesia',
    value: 'micronesia',
  },
  { code: 'md', continent: 'Europe', label: 'Moldova', value: 'moldova' },
  { code: 'mc', continent: 'Europe', label: 'Monaco', value: 'monaco' },
  { code: 'mn', continent: 'Asia', label: 'Mongolia', value: 'mongolia' },
  { code: 'me', continent: 'Europe', label: 'Montenegro', value: 'montenegro' },
  { code: 'ma', continent: 'Africa', label: 'Morocco', value: 'morocco' },
  { code: 'mz', continent: 'Africa', label: 'Mozambique', value: 'mozambique' },
  { code: 'mm', continent: 'Asia', label: 'Myanmar', value: 'myanmar' },
  { code: 'na', continent: 'Africa', label: 'Namibia', value: 'namibia' },
  { code: 'nr', continent: 'Oceania', label: 'Nauru', value: 'nauru' },
  { code: 'np', continent: 'Asia', label: 'Nepal', value: 'nepal' },
  {
    code: 'nl',
    continent: 'Europe',
    label: 'Netherlands',
    value: 'netherlands',
  },
  {
    code: 'nz',
    continent: 'Oceania',
    label: 'New Zealand',
    value: 'new-zealand',
  },
  {
    code: 'ni',
    continent: 'North America',
    label: 'Nicaragua',
    value: 'nicaragua',
  },
  { code: 'ne', continent: 'Africa', label: 'Niger', value: 'niger' },
  { code: 'ng', continent: 'Africa', label: 'Nigeria', value: 'nigeria' },
  { code: 'kp', continent: 'Asia', label: 'North Korea', value: 'north-korea' },
  {
    code: 'mk',
    continent: 'Europe',
    label: 'North Macedonia',
    value: 'north-macedonia',
  },
  { code: 'no', continent: 'Europe', label: 'Norway', value: 'norway' },
  { code: 'om', continent: 'Asia', label: 'Oman', value: 'oman' },
  { code: 'pk', continent: 'Asia', label: 'Pakistan', value: 'pakistan' },
  { code: 'pw', continent: 'Oceania', label: 'Palau', value: 'palau' },
  { code: 'ps', continent: 'Asia', label: 'Palestine', value: 'palestine' },
  { code: 'pa', continent: 'North America', label: 'Panama', value: 'panama' },
  {
    code: 'pg',
    continent: 'Oceania',
    label: 'Papua New Guinea',
    value: 'papua-new-guinea',
  },
  {
    code: 'py',
    continent: 'South America',
    label: 'Paraguay',
    value: 'paraguay',
  },
  { code: 'pe', continent: 'South America', label: 'Peru', value: 'peru' },
  { code: 'ph', continent: 'Asia', label: 'Philippines', value: 'philippines' },
  { code: 'pl', continent: 'Europe', label: 'Poland', value: 'poland' },
  { code: 'pt', continent: 'Europe', label: 'Portugal', value: 'portugal' },
  { code: 'qa', continent: 'Asia', label: 'Qatar', value: 'qatar' },
  { code: 'ro', continent: 'Europe', label: 'Romania', value: 'romania' },
  { code: 'ru', continent: 'Europe', label: 'Russia', value: 'russia' },
  { code: 'rw', continent: 'Africa', label: 'Rwanda', value: 'rwanda' },
  { code: 'ws', continent: 'Oceania', label: 'Samoa', value: 'samoa' },
  { code: 'sm', continent: 'Europe', label: 'San Marino', value: 'san-marino' },
  {
    code: 'sa',
    continent: 'Asia',
    label: 'Saudi Arabia',
    value: 'saudi-arabia',
  },
  { code: 'sn', continent: 'Africa', label: 'Senegal', value: 'senegal' },
  { code: 'rs', continent: 'Europe', label: 'Serbia', value: 'serbia' },
  { code: 'sc', continent: 'Africa', label: 'Seychelles', value: 'seychelles' },
  {
    code: 'sl',
    continent: 'Africa',
    label: 'Sierra Leone',
    value: 'sierra-leone',
  },
  { code: 'sg', continent: 'Asia', label: 'Singapore', value: 'singapore' },
  { code: 'sk', continent: 'Europe', label: 'Slovakia', value: 'slovakia' },
  { code: 'si', continent: 'Europe', label: 'Slovenia', value: 'slovenia' },
  {
    code: 'sb',
    continent: 'Oceania',
    label: 'Solomon Islands',
    value: 'solomon-islands',
  },
  { code: 'so', continent: 'Africa', label: 'Somalia', value: 'somalia' },
  {
    code: 'za',
    continent: 'Africa',
    label: 'South Africa',
    value: 'south-africa',
  },
  { code: 'kr', continent: 'Asia', label: 'South Korea', value: 'south-korea' },
  {
    code: 'ss',
    continent: 'Africa',
    label: 'South Sudan',
    value: 'south-sudan',
  },
  { code: 'es', continent: 'Europe', label: 'Spain', value: 'spain' },
  { code: 'lk', continent: 'Asia', label: 'Sri Lanka', value: 'sri-lanka' },
  { code: 'sd', continent: 'Africa', label: 'Sudan', value: 'sudan' },
  {
    code: 'sr',
    continent: 'South America',
    label: 'Suriname',
    value: 'suriname',
  },
  { code: 'se', continent: 'Europe', label: 'Sweden', value: 'sweden' },
  {
    code: 'ch',
    continent: 'Europe',
    label: 'Switzerland',
    value: 'switzerland',
  },
  { code: 'sy', continent: 'Asia', label: 'Syria', value: 'syria' },
  { code: 'tw', continent: 'Asia', label: 'Taiwan', value: 'taiwan' },
  { code: 'tj', continent: 'Asia', label: 'Tajikistan', value: 'tajikistan' },
  { code: 'tz', continent: 'Africa', label: 'Tanzania', value: 'tanzania' },
  { code: 'th', continent: 'Asia', label: 'Thailand', value: 'thailand' },
  { code: 'tl', continent: 'Asia', label: 'Timor-Leste', value: 'timor-leste' },
  { code: 'tg', continent: 'Africa', label: 'Togo', value: 'togo' },
  { code: 'to', continent: 'Oceania', label: 'Tonga', value: 'tonga' },
  {
    code: 'tt',
    continent: 'North America',
    label: 'Trinidad and Tobago',
    value: 'trinidad-and-tobago',
  },
  { code: 'tn', continent: 'Africa', label: 'Tunisia', value: 'tunisia' },
  { code: 'tr', continent: 'Asia', label: 'Turkey', value: 'turkey' },
  {
    code: 'tm',
    continent: 'Asia',
    label: 'Turkmenistan',
    value: 'turkmenistan',
  },
  { code: 'tv', continent: 'Oceania', label: 'Tuvalu', value: 'tuvalu' },
  { code: 'ug', continent: 'Africa', label: 'Uganda', value: 'uganda' },
  { code: 'ua', continent: 'Europe', label: 'Ukraine', value: 'ukraine' },
  {
    code: 'ae',
    continent: 'Asia',
    label: 'United Arab Emirates',
    value: 'united-arab-emirates',
  },
  {
    code: 'gb',
    continent: 'Europe',
    label: 'United Kingdom',
    value: 'united-kingdom',
  },
  {
    code: 'us',
    continent: 'North America',
    label: 'United States',
    value: 'united-states',
  },
  {
    code: 'uy',
    continent: 'South America',
    label: 'Uruguay',
    value: 'uruguay',
  },
  { code: 'uz', continent: 'Asia', label: 'Uzbekistan', value: 'uzbekistan' },
  { code: 'vu', continent: 'Oceania', label: 'Vanuatu', value: 'vanuatu' },
  {
    code: 'va',
    continent: 'Europe',
    label: 'Vatican City',
    value: 'vatican-city',
  },
  {
    code: 've',
    continent: 'South America',
    label: 'Venezuela',
    value: 'venezuela',
  },
  { code: 'vn', continent: 'Asia', label: 'Vietnam', value: 'vietnam' },
  { code: 'ye', continent: 'Asia', label: 'Yemen', value: 'yemen' },
  { code: 'zm', continent: 'Africa', label: 'Zambia', value: 'zambia' },
  { code: 'zw', continent: 'Africa', label: 'Zimbabwe', value: 'zimbabwe' },
]

export default {
  args: {
    items: fruits,
  },
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component:
          'The Combobox component allows users to select an option from a dropdown list. It provides a user-friendly interface for selecting options, with support for keyboard navigation and accessibility features. The Combobox can be used in various contexts, such as forms, filters, and search inputs.',
      },
      subtitle: 'A Combobox component for selecting options from a dropdown list.',
    },
  },
  render: (args) => (
    <Combobox {...args}>
      <Combobox.Input placeholder="Select an option" />
      <Combobox.Popup>
        <Combobox.Empty>No options found</Combobox.Empty>
        <Combobox.List>
          {(item: Fruit) => (
            <Combobox.Item key={item.value} value={item}>
              {item.label}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox>
  ),
  subcomponents: {
    Empty: Combobox.Empty,
    Input: Combobox.Input,
    Item: Combobox.Item,
    List: Combobox.List,
    Popup: Combobox.Popup,
  },
  title: 'Components/Combobox',
} as Meta<typeof Combobox>

type Story = StoryObj<typeof Combobox>

export const Default: Story = {}

export const MultipleSelection: Story = {
  args: {
    items: langs,
    multiple: true,
  },
  render: (args) => (
    <Combobox {...args}>
      <Combobox.Input className="max-w-[300px]" placeholder="e.g. Typescript">
        <Combobox.Chips>
          <Combobox.Value>
            {(value: ProgrammingLanguage[]) => (
              <>
                {value.map((lang) => (
                  <Combobox.Chip aria-label={lang.value} key={lang.id}>
                    {lang.value}
                  </Combobox.Chip>
                ))}
              </>
            )}
          </Combobox.Value>
        </Combobox.Chips>
      </Combobox.Input>
      <Combobox.Popup>
        <Combobox.Empty>No options found</Combobox.Empty>
        <Combobox.List>
          {(lang: ProgrammingLanguage) => (
            <Combobox.Item key={lang.id} value={lang}>
              {lang.value}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox>
  ),
}

export const InputInsidePopup: Story = {
  args: {
    items: countries,
  },
  render: (args) => (
    <Combobox {...args}>
      <Combobox.Trigger placeholder="Select a country" />
      <Combobox.Popup align="start" sideOffset={4}>
        <Combobox.Input inline />
        <Combobox.Empty>No options found</Combobox.Empty>
        <Combobox.List>
          {(country: Country) => (
            <Combobox.Item key={country.code} value={country}>
              {country.label}
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox>
  ),
}

interface Produce {
  id: string
  label: string
  group: 'Fruits' | 'Vegetables'
}

interface ProduceGroup {
  value: string
  items: Produce[]
}

const produceData: Produce[] = [
  { group: 'Fruits', id: 'fruit-apple', label: 'Apple' },
  { group: 'Fruits', id: 'fruit-banana', label: 'Banana' },
  { group: 'Fruits', id: 'fruit-mango', label: 'Mango' },
  { group: 'Fruits', id: 'fruit-kiwi', label: 'Kiwi' },
  { group: 'Fruits', id: 'fruit-grape', label: 'Grape' },
  { group: 'Fruits', id: 'fruit-orange', label: 'Orange' },
  { group: 'Fruits', id: 'fruit-strawberry', label: 'Strawberry' },
  { group: 'Fruits', id: 'fruit-watermelon', label: 'Watermelon' },
  { group: 'Vegetables', id: 'veg-broccoli', label: 'Broccoli' },
  { group: 'Vegetables', id: 'veg-carrot', label: 'Carrot' },
  { group: 'Vegetables', id: 'veg-cauliflower', label: 'Cauliflower' },
  { group: 'Vegetables', id: 'veg-cucumber', label: 'Cucumber' },
  { group: 'Vegetables', id: 'veg-kale', label: 'Kale' },
  { group: 'Vegetables', id: 'veg-pepper', label: 'Bell pepper' },
  { group: 'Vegetables', id: 'veg-spinach', label: 'Spinach' },
  { group: 'Vegetables', id: 'veg-zucchini', label: 'Zucchini' },
]

function groupProduce(items: Produce[]): ProduceGroup[] {
  const groups: Record<string, Produce[]> = {}
  items.forEach((item) => {
    if (!groups[item.group]) {
      groups[item.group] = []
    }
    groups[item.group].push(item)
  })
  const order = ['Fruits', 'Vegetables']
  return order.map((value) => ({ items: groups[value] ?? [], value }))
}

const groupedProduce: ProduceGroup[] = groupProduce(produceData)

export const GroupedOptions: Story = {
  args: {
    items: groupedProduce,
  },
  render: (args) => (
    <Combobox {...args}>
      <Combobox.Input placeholder="Select a produce" />
      <Combobox.Popup>
        <Combobox.Empty>No options found</Combobox.Empty>
        <Combobox.List>
          {(group: ProduceGroup) => (
            <Combobox.Group items={group.items} key={group.value}>
              <Combobox.GroupLabel>{group.value}</Combobox.GroupLabel>
              <Combobox.Collection>
                {(item: Produce) => (
                  <Combobox.Item key={item.id} value={item}>
                    {item.label}
                  </Combobox.Item>
                )}
              </Combobox.Collection>
            </Combobox.Group>
          )}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox>
  ),
}

interface DirectoryUser {
  id: string
  name: string
  username: string
  email: string
  title: string
}

const allUsers: DirectoryUser[] = [
  {
    email: 'leslie.alexander@example.com',
    id: 'leslie-alexander',
    name: 'Leslie Alexander',
    title: 'Product Manager',
    username: 'leslie',
  },
  {
    email: 'kathryn.murphy@example.com',
    id: 'kathryn-murphy',
    name: 'Kathryn Murphy',
    title: 'Marketing Lead',
    username: 'kathryn',
  },
  {
    email: 'courtney.henry@example.com',
    id: 'courtney-henry',
    name: 'Courtney Henry',
    title: 'Design Systems',
    username: 'courtney',
  },
  {
    email: 'michael.foster@example.com',
    id: 'michael-foster',
    name: 'Michael Foster',
    title: 'Engineering Manager',
    username: 'michael',
  },
  {
    email: 'lindsay.walton@example.com',
    id: 'lindsay-walton',
    name: 'Lindsay Walton',
    title: 'Product Designer',
    username: 'lindsay',
  },
  {
    email: 'tom.cook@example.com',
    id: 'tom-cook',
    name: 'Tom Cook',
    title: 'Frontend Engineer',
    username: 'tom',
  },
  {
    email: 'whitney.francis@example.com',
    id: 'whitney-francis',
    name: 'Whitney Francis',
    title: 'Customer Success',
    username: 'whitney',
  },
  {
    email: 'jacob.jones@example.com',
    id: 'jacob-jones',
    name: 'Jacob Jones',
    title: 'Security Engineer',
    username: 'jacob',
  },
  {
    email: 'arlene.mccoy@example.com',
    id: 'arlene-mccoy',
    name: 'Arlene McCoy',
    title: 'Data Analyst',
    username: 'arlene',
  },
  {
    email: 'marvin.mckinney@example.com',
    id: 'marvin-mckinney',
    name: 'Marvin McKinney',
    title: 'QA Specialist',
    username: 'marvin',
  },
  {
    email: 'eleanor.pena@example.com',
    id: 'eleanor-pena',
    name: 'Eleanor Pena',
    title: 'Operations',
    username: 'eleanor',
  },
  {
    email: 'jerome.bell@example.com',
    id: 'jerome-bell',
    name: 'Jerome Bell',
    title: 'DevOps Engineer',
    username: 'jerome',
  },
]

async function searchUsers(
  query: string,
  filter: (item: string, query: string) => boolean,
): Promise<{ users: DirectoryUser[]; error: string | null }> {
  // Simulate network delay
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 500 + 100)
  })

  // Simulate occasional network errors (1% chance)
  if (Math.random() < 0.01 || query === 'will_error') {
    return {
      error: 'Failed to fetch people. Please try again.',
      users: [],
    }
  }

  const users = allUsers.filter(
    (user) =>
      filter(user.name, query) ||
      filter(user.username, query) ||
      filter(user.email, query) ||
      filter(user.title, query),
  )

  return {
    error: null,
    users,
  }
}

export const AsyncLoading: Story = {
  render: (args) => {
    const [searchResults, setSearchResults] = React.useState<DirectoryUser[]>([]),
      [selectedValue, setSelectedValue] = React.useState<DirectoryUser | null>(null),
      [searchValue, setSearchValue] = React.useState(''),
      [error, setError] = React.useState<string | null>(null),
      [isPending, startTransition] = React.useTransition(),
      { contains } = useFilter(),
      abortControllerRef = React.useRef<AbortController | null>(null),
      trimmedSearchValue = searchValue.trim(),
      items = React.useMemo(() => {
        if (!selectedValue || searchResults.some((user) => user.id === selectedValue.id)) {
          return searchResults
        }

        return [...searchResults, selectedValue]
      }, [searchResults, selectedValue])

    function getStatus() {
      if (isPending) {
        return (
          <div className="flex items-center gap-3xs">
            <SpinnerGapIcon aria-hidden className="size-xs animate-spin" weight="bold" />
            Searching…
          </div>
        )
      }

      if (error) {
        return error
      }

      if (trimmedSearchValue === '') {
        return selectedValue ? null : 'Start typing to search people…'
      }

      if (searchResults.length === 0) {
        return `No matches for "${trimmedSearchValue}".`
      }

      return null
    }

    function getEmptyMessage() {
      if (trimmedSearchValue === '' || isPending || searchResults.length > 0 || error) {
        return null
      }
      return 'Try a different search term.'
    }

    return (
      <Combobox
        {...args}
        filter={null}
        items={items}
        itemToStringLabel={(user) => (user as DirectoryUser).name}
        onInputValueChange={(nextSearchValue, { reason }) => {
          setSearchValue(nextSearchValue)

          if (nextSearchValue === '') {
            setSearchResults([])
            setError(null)
            return
          }

          if (reason === 'item-press') {
            return
          }

          const controller = new AbortController()
          abortControllerRef.current?.abort()
          abortControllerRef.current = controller

          startTransition(async () => {
            setError(null)

            const result = await searchUsers(nextSearchValue, contains)

            if (controller.signal.aborted) {
              return
            }

            startTransition(() => {
              setSearchResults(result.users)
              setError(result.error)
            })
          })
        }}
        onOpenChangeComplete={(open) => {
          if (!open && selectedValue) {
            setSearchResults([selectedValue])
          }
        }}
        onValueChange={(nextSelectedValue) => {
          setSelectedValue(nextSelectedValue as DirectoryUser | null)
          setSearchValue('')
          setError(null)
        }}
      >
        <Combobox.Input placeholder="e.g. Michael" />
        <Combobox.Popup>
          <Combobox.Status>{getStatus()}</Combobox.Status>
          <Combobox.Empty>{getEmptyMessage()}</Combobox.Empty>
          <Combobox.List>
            {(user: DirectoryUser) => (
              <Combobox.Item key={user.id} value={user}>
                <div className="flex flex-col gap-3xs">
                  <div className="text-[0.95rem] font-medium">{user.name}</div>
                  <div className="flex flex-wrap gap-2xs text-[0.8125rem] text-on-surface-variant">
                    <span className="opacity-80">@{user.username}</span>
                    <span>{user.title}</span>
                  </div>
                  <div className="text-xs opacity-80">{user.email}</div>
                </div>
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Popup>
      </Combobox>
    )
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-xs">
      <Combobox {...args}>
        <Combobox.Input placeholder="Small size" size="small" />
        <Combobox.Popup>
          <Combobox.Empty>No options found</Combobox.Empty>
          <Combobox.List>
            {(item: Fruit) => (
              <Combobox.Item key={item.value} value={item}>
                {item.label}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Popup>
      </Combobox>
      <Combobox {...args}>
        <Combobox.Input placeholder="Medium size (default)" size="medium" />
        <Combobox.Popup>
          <Combobox.Empty>No options found</Combobox.Empty>
          <Combobox.List>
            {(item: Fruit) => (
              <Combobox.Item key={item.value} value={item}>
                {item.label}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Popup>
      </Combobox>
      <Combobox {...args}>
        <Combobox.Input placeholder="Large size" size="large" />
        <Combobox.Popup>
          <Combobox.Empty>No options found</Combobox.Empty>
          <Combobox.List>
            {(item: Fruit) => (
              <Combobox.Item key={item.value} value={item}>
                {item.label}
              </Combobox.Item>
            )}
          </Combobox.List>
        </Combobox.Popup>
      </Combobox>
    </div>
  ),
}

export const Virtualized: Story = {
  args: {
    items: countries,
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false),
      virtualizerRef = React.useRef<Virtualizer<HTMLDivElement, HTMLDivElement> | null>(null)

    return (
      <Combobox
        {...args}
        virtualized
        items={countries}
        open={open}
        onOpenChange={setOpen}
        onItemHighlighted={(item, { reason, index }) => {
          const virtualizer = virtualizerRef.current

          if (!item || !virtualizer) {
            return
          }

          const isStart = index === 0,
            isEnd = index === virtualizer.options.count - 1,
            shouldScroll = reason === 'none' || (reason === 'keyboard' && (isStart || isEnd))

          if (shouldScroll) {
            queueMicrotask(() => {
              virtualizer.scrollToIndex(index, { align: isEnd ? 'start' : 'end' })
            })
          }
        }}
      >
        <Combobox.Input placeholder="Select a country" />
        <Combobox.Popup align="start" sideOffset={16}>
          <Combobox.Empty>No options found</Combobox.Empty>
          <Combobox.VirtualizedList estimateSize={195} open={open} virtualizerRef={virtualizerRef}>
            {(country: Country) => <>{country.label}</>}
          </Combobox.VirtualizedList>
        </Combobox.Popup>
      </Combobox>
    )
  },
}
