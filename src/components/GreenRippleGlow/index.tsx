import styled, { keyframes } from "styled-components";

const ripple = keyframes`
  0% {
    transform: scale(.8);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const GreenDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: lightgreen;
  border-radius: 50%;
  position: relative;
  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: lightgreen;
    border-radius: 50%;
    position: absolute;
    animation: ${ripple} 2s infinite;
  }
`;

export default function GreenRippleGlow() {
  return <GreenDot data-testid="green-ripple-glow" />;
}
