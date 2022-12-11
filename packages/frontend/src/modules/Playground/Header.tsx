import styled from "styled-components";

const Header = () => {
    return <Container>BOTrack</Container>;
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    height: 4rem;
    padding: 1rem;

    font-size: 1.5rem;
    font-weight: 800;
    background: #000;
`;

export { Header };
