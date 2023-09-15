import { TagTypeIndustrial, TagTypeKeywords, TagTypeMarkets, TagTypeObjectives } from 'components'

export const requiredTagTypes = ['OperatingSector', 'OperatingMarket', 'DesiredObjective']

export const typeLabel = {
  OperatingSector: 'Current Sectors',
  OperatingMarket: 'Current Markets',
  DesiredObjective: 'Strategic Objectives',
}

export const setupSteps = [
  {
    step: 0,
    label: 'Which industrial sectors do you participate in now or see an opportunity to in the future?',
    component: TagTypeIndustrial,
    types: ['OperatingSector', 'DesiredSector'],
  },
  {
    step: 1,
    label: 'Where do you currently do business or would like to do business in the future?',
    component: TagTypeMarkets,
    types: ['OperatingMarket', 'DesiredMarket'],
  },
  {
    step: 2,
    label: 'What do you want to achieve with better data, resources, and community?',
    component: TagTypeObjectives,
    types: ['DesiredObjective'],
  },
  {
    step: 3,
    label:
      ' Thinking about keywords that people search for to find companies like yours, what are some that you would want to match on?',
    component: TagTypeKeywords,
    types: ['Keyword'],
  },
]
