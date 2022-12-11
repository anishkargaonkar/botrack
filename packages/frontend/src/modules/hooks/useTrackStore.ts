import create from "zustand";

type TrackState = {
    sourceUrl: string | null;
    setSourceUrl: (sourceUrl: string) => void
}

const useTrackStore = create<TrackState>((set) => ({
    sourceUrl: null,
    setSourceUrl: (sourceUrl: string) => set(state => ({ ...state, sourceUrl: sourceUrl }))
}));

export { useTrackStore };