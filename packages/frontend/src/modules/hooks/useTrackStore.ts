import create from "zustand";

import { Track } from "../../types";

type TrackState = {
    sourceUrl: string | null;
    tracks: Record<string, Track>;
    setSourceUrl(sourceUrl: string): void;
    setTracks(tracks: Record<string, Track>): void;
    setPlayingState(data: { trackId: string; val: boolean }): void;
    setVolumeForTrack(data: { trackId: string; val: number }): void;
    setCurrentTimeForTrack(data: { trackId: string; val: number }): void;

    setAllPlayingState(data: { val: boolean }): void;
    setVolumeForAllTrack(data: { val: number }): void;
    setCurrentTimeForAllTrack(data: { val: number }): void;
};

const useTrackStore = create<TrackState>((set) => ({
    sourceUrl: "https://s172.123apps.com/aconv/d/s172u6vIhYAV_mp3_IYimUtZy.mp3",
    setSourceUrl: (sourceUrl: string) =>
        set((state) => ({ ...state, sourceUrl: sourceUrl })),
    tracks: {
        "1": {
            url: "https://s172.123apps.com/aconv/d/s172u6vIhYAV_mp3_IYimUtZy.mp3",
            volume: 100,
            currentTime: 0,
            isPlaying: false,
        },
        "2": {
            url: "https://s172.123apps.com/aconv/d/s172u6vIhYAV_mp3_IYimUtZy.mp3",
            volume: 100,
            currentTime: 0,
            isPlaying: false,
        },
        "3": {
            url: "https://s172.123apps.com/aconv/d/s172u6vIhYAV_mp3_IYimUtZy.mp3",
            volume: 100,
            currentTime: 0,
            isPlaying: false,
        },
    },
    setTracks: (tracks: Record<string, Track>) =>
        set((state) => ({ ...state, tracks: tracks })),
    setPlayingState: ({ trackId, val }) => {
        set((state) => {
            const tracks = state.tracks;

            tracks[trackId].isPlaying = val;

            return { ...state, tracks };
        });
    },
    setVolumeForTrack: ({ trackId, val }) => {
        set((state) => {
            const tracks = state.tracks;

            tracks[trackId].volume = val;

            return { ...state, tracks };
        });
    },
    setCurrentTimeForTrack: ({ trackId, val }) => {
        set((state) => {
            const tracks = state.tracks;

            tracks[trackId].currentTime = val;

            return { ...state, tracks };
        });
    },
    setAllPlayingState: ({ val }) => {
        set((state) => {
            const tracks = state.tracks;
            const trackIds = Object.keys(state.tracks);

            trackIds.forEach((id) => {
                tracks[id].isPlaying = val;
            });

            return { ...state, tracks };
        });
    },
    setVolumeForAllTrack: ({ val }) => {
        set((state) => {
            const tracks = state.tracks;
            const trackIds = Object.keys(state.tracks);

            trackIds.forEach((id) => {
                tracks[id].volume = val;
            });

            return { ...state, tracks };
        });
    },
    setCurrentTimeForAllTrack: ({ val }) => {
        set((state) => {
            const tracks = state.tracks;
            const trackIds = Object.keys(state.tracks);

            trackIds.forEach((id) => {
                tracks[id].currentTime = val;
            });

            return { ...state, tracks };
        });
    },
}));

export { useTrackStore };
