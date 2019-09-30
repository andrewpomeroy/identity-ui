import createTheme from "@windsor/ui-kit-theme";
import deepmerge from 'deepmerge';
import defaultBaseColors from '@windsor/ui-kit-theme/res/colors';
import validateColorSystem from '@windsor/ui-kit-theme/src/colors/internal/validateColorSystem';
import colorGen from '@windsor/ui-kit-color-system-generator/src/colors';

const createColors = ({ options }) => {
  const colors = deepmerge(defaultBaseColors, options.colors || {});
  const colorsOut = Object.keys(colors).reduce((obj, color) => {
    obj[color] = colorGen.shades(colors[color]);
    return obj;
  }, {});
  validateColorSystem(colorsOut);

  return {
    ...colorsOut,
  };
};

export const typeScale = {
  '-2': 11,
  '-1': 13,
  0: 15,
  1: 17,
  2: 19,
  3: 21,
  4: 24,
  5: 28,
  6: 32,
  7: 40
}
export const colors = {
  yellow: '#f6f9d0',
  electricBlue: '#2b88fe',
  blue: '#2b88fe',
  turquoise: '#5df0f6',
  darkGreen: '#1f5c66',
  // darkGreen: '#0c4f5a',
  darkBlue: '#3364a3',
  fadedBlue: '#5b86b0',
  veryDarkBlue: '#16427d',
  // violet: '#719dff',
  // violet: '#6fa1ff',
  violet: 'hsl(219.2, 100%, 64.6%)',
  red: '#fa5252',
  nearWhite: '#f8f9fa',
  nearWhite2: '#f0f5fc',
  mediumGray: '#929292',
  white: '#ffffff'
}

const newColors = createColors({ options: {colors: colors} });

const newTheme = createTheme({
  colors: newColors
});
export const systemColors = newTheme.colors;

export const gradients = {
  hero: `linear-gradient(135deg, ${colors.turquoise}, 31.3%, ${colors.yellow})`
}
export const transitions = {
  listItemBg: '70ms linear background-color'
}
export const spacing = [
  4,
  8,
  12,
  16,
  20,
  24,
  32,
  40
]
spacing.small = 12;
spacing.medium = 20;
spacing.large = 40;
spacing.extraLarge = 60;
spacing.screenEdgeMarginH = 20;
export const buttonSpacingH = [12, 12, 18, 24];
export const buttonSpacingV = [4, 6, 10, 14];

const theme = {
  typeScale,
  fontSizes: typeScale, // for styled-system
  colors,
  transitions,
  spacing,
  buttonSpacingH,
  buttonSpacingV,
}

export default theme;