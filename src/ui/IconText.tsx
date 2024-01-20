import React from "react";
import styled from "styled-components";

interface IconTextProps {
  imgSrc: string;
  textContent: string;
  margin?: string;
  fontSize?: string;
  fontFamily?: string;
}
interface ContainerProps {
  $margin?: string;
}
interface TextProps {
  $fontSize?: string;
  $fontFamily?: string;
}

export const IconText: React.FC<IconTextProps> = (props) => {
  return (
    <Container $margin={props.margin}>
      <Icon src={props.imgSrc} />
      <Text $fontSize={props.fontSize} $fontFamily={props.fontFamily}>
        {props.textContent}
      </Text>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  margin: ${(props) => props.$margin};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const Text = styled.h1<TextProps>`
  font-size: ${(props) => props.$fontSize};
  font-family: ${(props) => props.$fontFamily};
  font-weight: 300;
`;
