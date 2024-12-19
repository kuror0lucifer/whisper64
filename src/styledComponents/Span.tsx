import { FC } from "react";
import styled from "styled-components";

interface SpanProps {
  display?: string;
  width?: string;
  height?: string;
  $size?: string;
  color?: string;
  children: React.ReactNode;
}

const StyledSpan = styled.span<SpanProps>`
  display: ${(props) => props.display || "inline"};
  font-size: ${(props) => props.$size};
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const Span: FC<SpanProps> = (props) => {
  return <StyledSpan {...props}>{props.children}</StyledSpan>;
};