import { rhythm } from './typography'
import { media } from 'glamor'

const base = { vertical: 2, horizontal: 1.5 }

export const horizontalPadding = rhythm(base.vertical)
export const verticalPadding = rhythm(base.vertical)
export const mobileHorizontalPadding = rhythm(base.horizontal / 4)
export const mobileVerticalPadding = rhythm(base.vertical / 4)

export const pagePadding = [
  {
    padding: `${rhythm(base.vertical / 4)} ${rhythm(base.horizontal / 4)}`,
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },
  media('(min-width: 426px)', {
    padding: `${rhythm(base.vertical)} ${rhythm(base.horizontal)}`,
  }),
]
export const headerMargin = [
  {
    margin: `-${rhythm(base.vertical / 4)} -${rhythm(base.horizontal / 4)}`,
  },
  media('(min-width: 426px)', {
    margin: `-${rhythm(base.vertical)} -${rhythm(base.horizontal)}`,
  }),
]
