import React from "react";
import styled from "styled-components";

export const IconText = (props) => {
  return (
    <Container>
      <Icon src={props.imgSrc} />
      <Text>{props.textContent}</Text>
    </Container>
  );
};

const Container = styled.div`
  margin: ${(props) => props.margin};
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
const Text = styled.h1`
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontFamily};
  font-weight: 300;
`;
