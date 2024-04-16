// Necessary Import
import styled from "styled-components";
import React from 'react';

const Footer = () => {

  return (
    <MainContainer>
      <p>Made by the ginger Gabe :{")"}</p>
    </MainContainer>
  )
}

export default Footer

const MainContainer = styled.footer`
  display: flex;
  flex-direction: column;
  min-height: 10.5vh;
  background: linear-gradient(0deg, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%);
  & p {
    margin: auto;
    margin-bottom: 3vh;
    padding: none;
  }
`