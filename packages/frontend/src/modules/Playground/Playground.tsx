import styled from "styled-components";

import { Waveform } from "./Waveform";

import { Header } from "./Header";
import { MainTrack } from "./MainTrack";

type Props = {};

const Playground = ({}: Props) => {
    return (
        <Container>
            <Header />
            <div>
                <Waveform audio="https://s172.123apps.com/aconv/d/s172u6vIhYAV_mp3_IYimUtZy.mp3" />
                <MainTrack audio="https://s172.123apps.com/aconv/d/s172u6vIhYAV_mp3_IYimUtZy.mp3" />
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
