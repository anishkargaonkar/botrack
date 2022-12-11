import { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";

import { PlayerTrack } from "./PlayerTrack";
import { PlayerControls } from "./PlayerControls";

import { useTrackStore } from "../hooks/useTrackStore";

type Props = {
    audio: string;
};

const MainTrack = ({ audio }: Props) => {
    const containerRef = useRef(null);
    const waveSurferRef = useRef({
        isPlaying: (): boolean => false,
        playPause: (): null => null,
        setVolume: (val: number): null => null,
        pause: (): null => null,
        getCurrentTime: (): number => 0,
        seekTo: (val: number): null => null,
    });
    const {
        setAllPlayingState,
        setVolumeForAllTrack,
        setCurrentTimeForAllTrack,
    } = useTrackStore();

    const intervalRef = useRef(0);
    const audioRef = useRef(new Audio(audio));
    const [isPlaying, toggleIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);

    audioRef.current.onloadeddata = () => {
        setDuration(audioRef.current.duration);
    };

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current!,
            responsive: true,
            cursorWidth: 0,
            barWidth: 1,
            barHeight: 0.5,
            barGap: 2,
            barRadius: 1,
            waveColor: "#fff",
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
        setAllPlayingState({ val });
        waveSurferRef.current.playPause();

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                clearInterval(intervalRef.current);
                toggleIsPlaying(false);
            } else {
                setCurrentTimeForAllTrack({
                    val: waveSurferRef.current.getCurrentTime(),
                });
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
        setVolumeForAllTrack({ val });
        audioRef.current.volume = val / 100;
        waveSurferRef.current.setVolume(val / 100);
    };

    return (
        <div>
            <PlayerTrack containerRef={containerRef} />
            <PlayerControls
                volume={volume}
                duration={duration}
                isPlaying={isPlaying}
                currentTime={currentTime}
                setVolume={onSetTrackVolume}
                toggleIsPlaying={onTogglePlayPause}
            />
        </div>
    );
};

export { MainTrack };
