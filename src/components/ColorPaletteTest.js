import React, { useState } from 'react';
import { systemColors } from '../theme/theme';
import { FlexContainer } from './commonLayout';
import styled from '@emotion/styled/macro'

const Square = (props) => <SquareStyle onMouseEnter={() => props.setName(props.colorKey + " " + props.bg)} onMouseLeave={() => props.setName(null)} title={props.colorKey} {...props}>{props.children}</SquareStyle>;
const SquareStyle = styled.div`
  height: 16px;
  width: 16px;
  background-color: ${props => props.bg};
`

const ColorPaletteTest = () => {
  const [hoverName, setHoverName] = useState();
  return (
    <>
      <div>{hoverName || 'none'}</div>
      <FlexContainer horizontal>
        <>{Object.keys(systemColors).map(colorKey => {
          if (!systemColors[colorKey][500] || !systemColors[colorKey][500].hex) return null;
          return (
            <Square
              key={colorKey}
              colorKey={colorKey}
              setName={setHoverName}
              bg={systemColors[colorKey][500].hex}></Square>
          )
        })}</>
      </FlexContainer>
    </>
  )
}

export default ColorPaletteTest;