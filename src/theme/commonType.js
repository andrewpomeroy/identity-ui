import styled from '@emotion/styled/macro';
import { typeScale, lineHeights, colors } from './theme';


export const HeadingBase = styled.div`
  margin: 0;
  line-height: 1.35em;
  color: ${colors.heading};
`

export const Heading1 = styled(HeadingBase)`
  font-size: ${typeScale.h1}px;
`
export const Heading2 = styled(HeadingBase)`
  font-size: ${typeScale.h2}px;
`
export const Heading3 = styled(HeadingBase)`
  font-size: ${typeScale.h3}px;
`
export const Heading4 = styled(HeadingBase)`
  font-size: ${typeScale.h4}px;
`
export const Heading5 = styled(HeadingBase)`
  font-size: ${typeScale.h5}px;
`
export const Heading6 = styled(HeadingBase)`
  font-size: ${typeScale.h6}px;
`

export const UnstyledHeading = styled.css`
  font-size: 1em;
  font-weight: inherit;
  margin: 0;
`

export const getLineHeight = (level) => {
  return lineHeights[level];
}
export const getComputedLineHeight = (level) => {
  return lineHeights[level] * typeScale[level];
}

export const CutoffText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const DiminishedText = styled.span`
  color: ${colors.diminishedText};
`
