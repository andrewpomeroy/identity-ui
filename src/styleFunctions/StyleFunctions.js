import {
  compose,
  alignContent,
  alignItems,
  justifyItems,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order,
} from "styled-system";

export const flexbox = compose(
  alignContent,
  alignItems,
  justifyItems,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order,
)
