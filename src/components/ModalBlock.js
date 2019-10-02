import styled from '@emotion/styled/macro';
import { spacing } from '../theme/theme';
import { Heading4 } from '../theme/commonType';
import { typeScale } from '../theme/theme';

const paddingH = spacing.large * 1;
const paddingTop = spacing.large * 1.15;
const paddingBottom = spacing.large * .875;

const ModalBlock = styled.div`
  background-color: white;
  padding: ${paddingTop}px ${paddingH}px ${paddingBottom}px;
  max-width: 480px;
  /* max-width: 640px; */
  width: 100%;
`

export const ModalBlockWithRows = styled(ModalBlock)`
  padding-left: 0;
  padding-right: 0;
`

export const ModalBlockRow = styled.div`
  padding-left: ${paddingH}px;
  padding-right: ${paddingH}px;
`

export const modalBlockSpacerHeights = {
  small: 26,
  default: 36,
  large: 48
}
export const ModalBlockSpacer = styled.div`
  height: ${props => modalBlockSpacerHeights[props.size || 'default']}px;
`
export const ModalBlockTitle = styled(Heading4)`
  font-weight: 600;
  strong {
    font-weight: 700;
  }
`
export const ModalBlockTitleSmall = styled(ModalBlockTitle)`
  font-size: ${typeScale.h5}px;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default ModalBlock;
