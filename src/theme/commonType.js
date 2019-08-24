import React from "react";
import styled from '@emotion/styled/macro';
import { typeScale } from "./theme";
import { typeScaleMap, lineHeightMap, colorMap } from "./themeMapping";

export const HeadingBase = styled.div`
  margin: 0;
  line-height: 1.35em;
  color: ${colorMap.heading};
`

export const Heading1 = styled(HeadingBase)`
  font-size: ${typeScaleMap.h1}px;
`
export const Heading2 = styled(HeadingBase)`
  font-size: ${typeScaleMap.h2}px;
`
export const Heading3 = styled(HeadingBase)`
  font-size: ${typeScaleMap.h3}px;
`
export const Heading4 = styled(HeadingBase)`
  font-size: ${typeScaleMap.h4}px;
`
export const Heading5 = styled(HeadingBase)`
  font-size: ${typeScaleMap.h5}px;
`
export const Heading6 = styled(HeadingBase)`
  font-size: ${typeScaleMap.h6}px;
`

export const getLineHeight = (level) => {
  return lineHeightMap[level];
}

export const CutoffText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const DiminishedText = styled.span`
  color: ${colorMap.diminishedText};
`
