import styled from "styled-components";

import { Waveform } from "./Waveform";

import { Header } from "./Header";
import { MainTrack } from "./MainTrack";

import { useTrackStore } from "../hooks/useTrackStore";

type Props = {};

const Playground = ({}: Props) => {
    const {
        sourceUrl,
        tracks,
        setPlayingState,
        setVolumeForTrack,
        setCurrentTimeForTrack,
    } = useTrackStore();
    const trackKeys = Object.keys(tracks);

    return !sourceUrl ? null : (
        <Container>
            <Header />
            <ScrollContainer>
                {trackKeys.map((t) => {
                    const { url, currentTime, volume, isPlaying } = tracks[t];
                    return (
                        <Waveform
                            id={t}
                            key={t}
                            audio={url}
                            volume={volume}
                            isPlaying={isPlaying}
                            currentTime={currentTime}
                            setPlayingState={(val) =>
                                setPlayingState({ trackId: t, val })
                            }
                            setVolumeForTrack={(val) =>
                                setVolumeForTrack({ trackId: t, val })
                            }
                            setCurrentTimeForTrack={(val) =>
                                setCurrentTimeForTrack({ trackId: t, val })
                            }
                        />
                    );
                })}
            </ScrollContainer>
            <MainTrack audio={sourceUrl} />
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

const ScrollContainer = styled.div`
    overflow: scroll;
`;

export { Playground };
