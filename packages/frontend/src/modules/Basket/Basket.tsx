import React from "react";
import { useTrackStore } from "../hooks/useTrackStore";
import { Modal, Upload as AntUpload } from "antd";
import styled from "styled-components";
import { uploadTrackProps } from "./constants";

type Props = {};

const { Dragger } = AntUpload;
const Basket = (props: Props) => {
    const { sourceUrl } = useTrackStore();

    return (
        <Container
            width={425}
            centered
            open={sourceUrl === null}
            footer={null}
            closable={false}
        >
            <Dragger {...uploadTrackProps}>
                <Title>Upload you track</Title>
                <SubTitle>in .mp3 format</SubTitle>
            </Dragger>
        </Container>
    );
};

const Container = styled(Modal)`
    && {
        .ant-modal-content {
            color: #fff;
            border-radius: 0.9375rem;
            background-color: #202020;
        }

        .ant-upload-drag {
            border-color: #cdcdcd;
            :hover {
                border-color: #9e88ca;
            }
        }
    }
`;

const Title = styled.div`
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    color: #cdcdcd;
`;

const SubTitle = styled.div`
    padding-top: 0.2rem;
    text-align: center;
    font-size: 0.85rem;
    font-weight: bold;
    color: #949494;
`;

const Upload = styled(AntUpload)``;

export { Basket };
