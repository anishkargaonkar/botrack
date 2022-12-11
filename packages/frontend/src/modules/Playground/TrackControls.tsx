import styled from "styled-components";
import { Button as AntButton, Slider } from "antd";
import {
    CaretRightOutlined,
    MinusOutlined,
    PauseOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import { convertTime } from "../../utils";

type Props = {
    volume: number;
    duration: number;
    waveColor: string;
    isPlaying: boolean;
    currentTime: number;

    setVolume(val: number): void;
    toggleIsPlaying(val: boolean): void;
};

const TrackControls = ({
    volume,
    duration,
    waveColor,
    isPlaying,
    setVolume,
    currentTime,
    toggleIsPlaying,
}: Props) => {
    const onClickHandler = () => {
        toggleIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (val: "up" | "down") => {
        if (val === "up") {
            if (10 + volume >= 100) {
                setVolume(100);
            } else {
                setVolume(volume + 10);
            }
        } else {
            if (volume - 10 <= 0) {
                setVolume(0);
            } else {
                setVolume(volume - 10);
            }
        }
    };

    return (
        <Container borderColor={waveColor}>
            <PrimaryButton
                isActive={isPlaying}
                icon={isPlaying ? <PauseOutlined /> : <CaretRightOutlined />}
                shape="circle"
                onClick={onClickHandler}
            />
            <Time>
                <CurrentTime>{convertTime(currentTime)}</CurrentTime> /{" "}
                <TotalTime>{convertTime(duration)}</TotalTime>
            </Time>
            <VolumeControls>
                <SecondaryButton
                    icon={<MinusOutlined />}
                    onClick={() => handleVolumeChange("down")}
                />
                <VolumeSlider
                    min={0}
                    max={100}
                    onChange={setVolume}
                    value={volume}
                />
                <SecondaryButton
                    icon={<PlusOutlined />}
                    onClick={() => handleVolumeChange("up")}
                />
            </VolumeControls>
        </Container>
    );
};

const Container = styled.div<{ borderColor: string }>`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    padding: 2rem;
    border-right: ${({ borderColor }) => `1px solid ${borderColor}`};
`;

const Time = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    color: #949494;

    font-size: 0.875rem;
    padding-top: 1.5rem;
    border-radius: 3rem;
    gap: 0.25rem;
`;

const CurrentTime = styled.div`
    color: #fff;
    font-weight: 500;
`;

const TotalTime = styled.div``;

const PrimaryButton = styled(AntButton)<{ isActive: boolean }>`
    && {
        background: ${({ isActive }) => (isActive ? "#000" : "#fff")};
        color: ${({ isActive }) => (isActive ? "#fff" : "#000")};

        border: 1px solid #fff;

        :hover {
            background: ${({ isActive }) => (isActive ? "#fff" : "#000")};
            color: ${({ isActive }) => (isActive ? "#000" : "#fff")};
            border: 1px solid #fff;
        }
    }
`;

const SecondaryButton = styled(AntButton)`
    && {
        background: #000;
        color: #949494;
        border: none;

        :hover {
            color: #fff;
            border: none;
        }
    }
`;

const VolumeControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    color: #949494;

    font-size: 0.875rem;
    border-radius: 3rem;
    gap: 0.5rem;
`;

const VolumeSlider = styled(Slider)`
    && {
        width: 5rem;
        height: 0;

        .ant-slider-rail {
            height: 0.125rem;
            background: #949494;
        }

        .ant-slider-track {
            height: 0.125rem;
            background: #fff;
        }

        .ant-slider-handle {
            width: 0.5rem;
            height: 0.5rem;

            :after {
                width: 0.5rem;
                height: 0.5rem;

                box-shadow: none;
                inset-inline-start: 0;
                inset-block-start: 0;
            }

            :hover {
                width: 0.5rem;
                height: 0.5rem;
            }
        }
    }
`;

export { TrackControls };
