import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
  h1: {
    fontFamily: 'Rubik',
  },
  'ul, ol': {
    marginLeft: '1.75rem',
  },
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  '.anchor': {
    boxShadow: 'none',
  },
})

Wordpress2016.headerFontFamily = ['Rubik']
Wordpress2016.bodyFontFamily = ['Rubik']

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
