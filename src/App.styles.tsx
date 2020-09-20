import * as React from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/core';
import { BREAKPOINT_DESKTOP, HEADER_HEIGHT } from './constants';

export const Main = styled.main`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;

  @media (min-width: ${BREAKPOINT_DESKTOP}px) {
    margin: 0 auto;
    max-width: ${BREAKPOINT_DESKTOP}px;
  }
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1;
  border-bottom: 2px solid #5d3281;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 440px) {
    font-size: 2rem;
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  padding-bottom: 0.75rem;

  &:first-of-type {
    padding-top: 0;
  }

  @media (min-width: 440px) {
    font-size: 1.5rem;
    padding-bottom: 0.75rem;
    padding-top: 1rem;
  }
`;

export const Content = styled.section`
  margin: 0 auto;
  padding: 1rem;
  z-index: 1;
  width: 100%;

  @media (min-width: 440px) {
    padding: 24px;
    max-width: 800px;
  }
  @media (min-width: ${BREAKPOINT_DESKTOP}px) {
    width: 960px;
  }
`;

export const Paragraph = styled.p`
  color: black;
  line-height: 1.5;
  margin: 0 0 1.25rem 0;

  @media (min-width: 440px) {
    font-size: 1.25rem;
    line-height: 1.75;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
interface StyledCardProps {
  isFlipped: boolean;
}
export const StyledCard = styled.div<StyledCardProps>`
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
  transform: ${(props) =>
    props.isFlipped && 'translateX(-100%) rotateY(-180deg)'};
  width: 300px;
  height: 189px;

  @media (min-width: 769px) {
    width: 350;
    height: 221;
  }

  &:first-of-type {
    margin-bottom: 12px;
    margin-right: 12px;
  }

  .face {
    position: absolute;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    box-shadow: 0px 0px 2px 1px #b4b4b4;
  }
  .face--back {
    transform: rotateY(180deg);
  }
`;

interface CardBackgroundImageProps {
  id: string;
  side: string;
  jpg?: boolean;
}
export const CardBackgroundImage = styled.div<CardBackgroundImageProps>`
  ${({ id, side, jpg }) => css`
    background-image: url(./images/${id}-${side}.${jpg ? 'jpg' : 'png'});
    background-size: cover;
  `}
`;

export const Saldo = styled.span`
  bottom: 32px;
  font-size: 32px;
  font-weight: bold;
  left: 24px;
  position: absolute;
  color: #5d3281;

  &:before {
    content: '\\20AC';
    margin-right: 6px;
  }
`;

export const CashlessNumber = styled.span`
  bottom: 12px;
  color: #5d3281;
  font-family: monospace;
  font-size: 12px;
  font-size: 1rem;
  font-weight: bold;
  left: 24px;
  letter-spacing: 2px;
  position: absolute;
`;

export const ButtonLink = styled.button`
  -webkit-appearance: none;
  background-color: transparent;
  border-radius: 0;
  border: 0;
  color: blue;
  cursor: pointer;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 12px;
  right: 12px;
`;

export const ButtonStyle = css`
  border-radius: 0;
  border: 0;
  box-shadow: none;
  color: #5d3281;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  height: 32px;
  margin: 0 0 0 6px;
  padding: 0 6px;
  text-transform: uppercase;
  width: 100%;
`;

export const NoCardNumberButton = styled.button`
  ${ButtonStyle}
  background-color: #25651A;
  color: #ffffff;
  position: absolute;
  bottom: 24px;
  left: 18px;
  margin: 0;
  width: auto;
  box-shadow: 4px 3px 7px 0px rgba(212, 212, 212, 1);
`;

export const Anchor = styled.a`
  &:link,
  &:visited {
    color: #015b6d;
  }
  &:hover {
    color: #060060;
  }
`;

export const List = styled.ul`
  padding: 0;
  padding-left: 18px;

  li {
    line-height: 2.5rem;
  }
`;

const reset = css`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Open Sans Regular'), local('OpenSans-Regular'),
      url(./fonts/OpenSans-Regular.woff2) format('woff2');
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: local('Open Sans ExtraBold'), local('OpenSans-ExtraBold'),
      url(./fonts/OpenSans-ExtraBold.woff2) format('woff2');
  }

  html {
    background-color: #5d3281; /* iOS topbar background color when black-translucent */
    height: 100%;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    background-color: white;
    margin: 0rem;
    min-height: 100%;
    overflow-y: auto;
    padding-top: ${HEADER_HEIGHT}px;
    -webkit-tap-highlight-color: transparent;
  }
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  /* :focus-visible polyfill: https://github.com/WICG/focus-visible */
  .js-focus-visible :focus:not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }

  /* Opiniated selection from https://csstools.github.io/sanitize.css/11.0.0/sanitize.css */
  * {
    box-sizing: border-box;
  }
  ::before,
  ::after {
    box-sizing: border-box;
  }
  *:focus {
    box-shadow: 0 0 0 2px #015b6d;
    outline: 0;
    border-radius: 0px;

    &:focus:not(:focus-visible) {
      box-shadow: none;
      outline: none;
    }
  }
  ul {
    margin: 0;
  }
  main {
    display: block;
  }
  a {
    background-color: transparent;
  }
  button {
    overflow: visible;
    text-transform: none;
  }
  button,
  input,
  select {
    margin: 0;
  }
  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    -webkit-appearance: button;
  }
  input {
    overflow: visible;
  }
`;

export const ResetCss: React.FC = () => <Global styles={reset} />;
