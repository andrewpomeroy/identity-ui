import React from 'react';
import EntryView from './EntryView';
import styled from '@emotion/styled/macro';

const MainViewWrap = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const MainView = () => {

  return (
    <>
      <MainViewWrap>
        {/* <Header></Header> */}
        <EntryView></EntryView>
      </MainViewWrap>
    </>
  );
}

export default MainView;
