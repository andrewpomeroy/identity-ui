import createTheme from "@windsor/ui-kit-theme";
import Color from 'color';

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
  7: 40,
  
}
typeScale.h1 = typeScale[7];
typeScale.h2 = typeScale[6];
typeScale.h3 = typeScale[5];
typeScale.h4 = typeScale[3];
typeScale.h5 = typeScale[1];
typeScale.h6 = typeScale[0];
typeScale.cardHeading = 18;
typeScale.cardBody = 14;
typeScale.listSearchHeadings = typeScale[1];

export const lineHeights = {
  h1: 1.35,
  h2: 1.35,
  h3: 1.35,
  h4: 1.35,
  h5: 1.35,
  h6: 1.35,
}

export const colors = {
  yellow: '#f6f9d0',
  electricBlue: '#2b88fe',
  blue: '#2b88fe',
  turquoise: '#5df0f6',
  green: '#2be689',
  darkGreen: '#1f5c66',
  // darkGreen: '#0c4f5a',
  darkBlue: '#3364a3',
  darkBlueGray: '#515f71',
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

colors.primary = colors.blue;
colors.danger = colors.red;
colors.neutral = colors.darkBlueGray;
colors.success = colors.green;

colors.error = colors.red;

colors.normalText = colors.veryDarkBlue;
colors.highlightText = colors.turquoise;
colors.boldText = colors.darkGreen;
colors.diminishedText = colors.mediumGray;
colors.heading = colors.darkGreen;
colors.subduedHeading = colors.fadedBlue;
colors.activeHighlight = colors.electricBlue;
colors.link = colors.electricBlue;
colors.linkHover = Color(colors.electricBlue).lighten(.2).string();
colors.inputBorder = colors.violet;
colors.inputText = colors.darkBlue;
colors.labelText = colors.darkGreen;
colors.cardBorder = 'transparent';
colors.cardBgColor = 'white';
colors.cardHighlight = colors.electricBlue;
colors.cardText = colors.darkBlue;
colors.listBackground = colors.nearWhite;
colors.transparentHighlight = Color(colors.electricBlue).saturationl(100).lightness(98).string();
colors.lightSeparator = 'gainsboro';
export const buttonVariants = {
  // primary: {
  //   backgroundColor: "blue",
  //   borderColor: "blue",
  //   color: "white"
  // },
  // neutral: {
  //   backgroundColor: "mediumGray",
  //   borderColor: "mediumGray",
  //   color: "white"
  // },
  // hollow: {
  //   backgroundColor: "transparent",
  //   borderColor: "primary",
  //   color: "primary",
  //   fontWeight: 600
  // },
  // danger: {
  //   backgroundColor: "danger",
  //   borderColor: "danger",
  //   color: "white",
  //   }
}

export const themeObject = createTheme({
  colors: colors,
});

export const extendedTheme = {
  ...themeObject,
  buttonVariants,
}

console.log("extendedTheme", extendedTheme);

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
spacing.screenEdgeMarginH = spacing[20];
spacing.listPaddingH = 18;
spacing.listPaddingV = 32;
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
  buttonVariants,
}

export default theme;