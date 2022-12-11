import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import WaveSurfer from "wavesurfer.js";

import { TrackControls } from "./TrackControls";

import { getRandomHexColor } from "../../utils";


type Props = {
    audio: string;
};

const Waveform = ({ audio }: Props) => {
    const containerRef = useRef(null);
    const waveSurferRef = useRef({
        isPlaying: (): boolean => false,
        playPause: (): null => null,
        setVolume: (val: number): null => null,
        pause: (): null => null,
        getCurrentTime: (): number => 0,
        seekTo: (val: number): null => null,
    });
    const intervalRef = useRef(0);
    const audioRef = useRef(new Audio(audio));

    const [isPlaying, toggleIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);
    const [waveColor] = useState(getRandomHexColor());

    audioRef.current.onloadeddata = () => {
        setDuration(audioRef.current.duration);
    };

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current!,
            responsive: true,
            cursorWidth: 0,
            barWidth: 4,
            barHeight: 1.5,
            barGap: 5,
            barRadius: 5,
            waveColor,
        });
        waveSurfer.load(audio);
        waveSurfer.on("ready", () => {
            waveSurferRef.current = waveSurfer as any;
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [audio]);

    const onTogglePlayPause = (val: boolean) => {
        toggleIsPlaying(val);
        waveSurferRef.current.playPause();

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                clearInterval(intervalRef.current);
                toggleIsPlaying(false);
            } else {
                setCurrentTime(waveSurferRef.current.getCurrentTime());
                waveSurferRef.current.seekTo(
                    waveSurferRef.current.getCurrentTime() /
                        audioRef.current.duration
                );
            }
        }, 1000);
    };

    const onSetTrackVolume = (val: number) => {
        setVolume(val);
        audioRef.current.volume = val / 100;
        waveSurferRef.current.setVolume(val / 100);
    };

    return (
        <Container>
            <SubContainer borderColor={waveColor}>
                <Controls>
                    <TrackControls
                        waveColor={waveColor}
                        volume={volume}
                        setVolume={onSetTrackVolume}
                        currentTime={currentTime}
                        duration={duration}
                        isPlaying={isPlaying}
                        toggleIsPlaying={onTogglePlayPause}
                    />
                </Controls>
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

const SubContainer = styled.div<{ borderColor: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    padding-right: 1rem;
    border-radius: 2rem;
    background: #000;
    border: ${({ borderColor }) => `1px solid ${borderColor}`};
`;

const Controls = styled.div``;
const WaveContainer = styled.div`
    width: 70vw;
`;

export { Waveform };
