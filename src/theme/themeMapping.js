import theme, { colors, typeScale, spacing } from './theme';
import Color from 'color';

export const colorMap = {
  normalText: colors.veryDarkBlue,
  highlightText: colors.turquoise,
  boldText: colors.darkGreen,
  diminishedText: colors.mediumGray,
  heading: colors.darkGreen,
  subduedHeading: colors.fadedBlue,
  activeHighlight: colors.electricBlue,
  link: colors.electricBlue,
  linkHover: Color(colors.electricBlue).lighten(.2).string(),
  inputBorder: colors.violet,
  inputText: colors.darkBlue,
  labelText: colors.darkGreen,
  error: colors.red,
  cardBorder: 'transparent',
  cardBgColor: 'white',
  cardHighlight: colors.electricBlue,
  cardText: colors.darkBlue,
  listBackground: colors.nearWhite,
  transparentHighlight: Color(colors.electricBlue).saturationl(100).lightness(98).string(),
  lightSeparator: 'gainsboro',
  primary: colors.violet
}
export const typeScaleMap = {
  h1: typeScale[7],
  h2: typeScale[6],
  h3: typeScale[5],
  h4: typeScale[3],
  h5: typeScale[1],
  h6: typeScale[0],
  cardHeading: 18,
  cardBody: 14,
  listSearchHeadings: typeScale[1],
}
export const lineHeightMap = {
  h1: 1.35,
  h2: 1.35,
  h3: 1.35,
  h4: 1.35,
  h5: 1.35,
  h6: 1.35,
}
export const layoutSpacing = {
  screenEdgeMarginH: spacing[20],
  listPaddingH: 18,
  listPaddingV: 32,
}

const mappedTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    ...colorMap,
  },
  typeScale: {
    ...theme.typeScale,
    ...typeScaleMap
  },
  spacing: {
    ...theme.spacing,
    ...layoutSpacing
  }
}

export default mappedTheme;