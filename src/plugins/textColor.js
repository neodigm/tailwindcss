import _ from 'lodash'
import flattenColorPalette from '../util/flattenColorPalette'
import withAlphaVariable from '../util/withAlphaVariable'

export default function() {
  return function({ addUtilities, e, theme, variants, target }) {
    if (target('textColor') === 'ie11') {
      const utilities = _.fromPairs(
        _.map(flattenColorPalette(theme('textColor')), (value, modifier) => {
          return [`.${e(`text-${modifier}`)}`, { color: value }]
        })
      )

      addUtilities(utilities, variants('textColor'))

      return
    }

    const utilities = _.fromPairs(
      _.map(flattenColorPalette(theme('textColor')), (value, modifier) => {
        return [
          `.${e(`text-${modifier}`)}`,
          withAlphaVariable({ color: value, property: 'color', variable: '--text-opacity' }),
        ]
      })
    )

    addUtilities(utilities, variants('textColor'))
  }
}
