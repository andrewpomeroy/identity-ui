## from EHAConnect

* abstracted heading in appbrand
* add border-box to base.scss
* add flexbox inherit + style functions to childmarginwrapper
* add default props to SplitWithChildMargin
* add getComputedLineHeight to commonType
* fix flexbox style functions in flexContainer in commonLayout
* extend theme with mappedTheme

### Colors

* add background color to input error styles
* add placeholder red color to theme
* changed darkgreen in theme.js
* added inputColor to themeMapping
* add "error" to thememapping
* darken 'violet' (primary)

### Buttons

* move where border-radius is defined on buttons
* add default type of "button" to Button
* Damn, lots of stuff in Buttons.. iconbutton stuff.. (need to figure out how to pass size prop with or without units)
* make Button position: relative;
* Move away from styled-system stuff in favor of button style composition

## from personal library
### Spotmark

* adopt chevron directional component pattern, include arrow, etc.