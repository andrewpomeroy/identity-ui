import styled from '@emotion/styled/macro';
import { spacing } from '../theme/theme';
import { flexbox } from '../styleFunctions/StyleFunctions';

const centerColumnMaxWidth = 1024;
const centerColumnGutter = spacing.medium;

export const CenterColumnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: ${props => props.gutter != null ? (props.gutter / 2) : (centerColumnGutter / 2)}px;
  margin-right: ${props => props.gutter != null ? (props.gutter / 2) : (centerColumnGutter / 2)}px;
`

export const CenterColumn = styled.div`
  width: 100%;
  max-width: ${props => centerColumnMaxWidth + (props.gutter || 0)}px;
  margin-left: ${props => props.gutter != null ? (props.gutter / 2) : (centerColumnGutter / 2)}px;
  margin-right: ${props => props.gutter != null ? (props.gutter / 2) : (centerColumnGutter / 2)}px;
`

export const SplitWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
`

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: ${props => props.gutter ? (props.gutter / 2) : 0}px;
  margin-right: ${props => props.gutter ? (props.gutter / 2) : 0}px;
`

export const Column = styled.div`
  flex: 1 0 0%;
  display: flex;
  flex-direction: column;
  margin-left: ${props => !props.usePadding
    ? props.gutter != null
      ? (props.gutter / 2)
      : (centerColumnGutter / 2)
    : 0}px;
  margin-right: ${props => !props.usePadding
    ? props.gutter != null
      ? (props.gutter / 2)
      : (centerColumnGutter / 2)
    : 0}px;
  padding-left: ${props => props.usePadding
    ? props.gutter != null
      ? (props.gutter / 2)
      : (centerColumnGutter / 2)
    : 0}px;
  padding-right: ${props => props.usePadding
    ? props.gutter != null
      ? (props.gutter / 2)
      : (centerColumnGutter / 2)
    : 0}px;
`

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  ${flexbox}
` 

export const FlexItem = styled.div`
  flex: ${props => props.auto ? '0 0 auto' : '1 1 0%'};
  ${flexbox}
`
