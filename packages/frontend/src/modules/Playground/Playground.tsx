import React from "react";
import styled from "styled-components";

type Props = {};

const Playground = (props: Props) => {
  return (
    <Container>
      <div>Header</div>
      <div>Tracks</div>
      <div>
        <div>Main Track</div>
        <div>Player Track</div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export { Playground };
