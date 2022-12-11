import { RefObject } from "react";

import styled from "styled-components";

type Props = {
    containerRef: RefObject<HTMLDivElement> | null | undefined;
};

const PlayerTrack = ({ containerRef }: Props) => {
    return (
        <Container>
            <SubContainer>
                <WaveContainer ref={containerRef} />
            </SubContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem;
`;

const SubContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    padding-right: 1rem;
    border-radius: 2rem;
    background: #000;
    border: 1px solid #fff;
`;

const WaveContainer = styled.div`
    width: 90vw;
`;

export { PlayerTrack };
