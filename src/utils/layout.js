import { rhythm } from './typography'
import { media } from 'glamor'

const base = { x: 1.5, y: 2 }

export const pagePadding = [
  {
    padding: `${rhythm(base.x / 4)} ${rhythm(base.y / 4)}`,
  },
  media('(min-width: 426px)', {
    padding: `${rhythm(base.x)} ${rhythm(base.y)}`,
  }),
]
export const headerMargin = [
  {
    margin: `-${rhythm(base.x / 4)} -${rhythm(base.y / 4)}`,
  },
  media('(min-width: 426px)', {
    margin: `-${rhythm(base.x)} -${rhythm(base.y)}`,
  }),
]
