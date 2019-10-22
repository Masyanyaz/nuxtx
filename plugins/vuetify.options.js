import { mdiCheckboxBlankOutline, mdiCheckboxMarked, mdiMenu, mdiChevronRight, mdiChevronLeft, mdiPlus, mdiMinus } from '@mdi/js'


export default {
  breakpoint: {},
  icons: {
    values: {
      checkboxOff: mdiCheckboxBlankOutline,
      checkboxOn: mdiCheckboxMarked,
      menu: mdiMenu,
      next: mdiPlus,
      prev: mdiMinus
    }
  },
  lang: {},
  rtl: false,
  theme: {
    options: {
      minifyTheme: function (css) {
        return process.env.NODE_ENV === 'production'
          ? css.replace(/[\r\n|\r|\n]/g, '')
          : css
      },
    },
    themes: {
      dark: false,
      light: {
      }
    }
  }
}