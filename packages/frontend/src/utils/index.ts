export const convertTime = (time: number) => {
    let mins = `${Math.floor(time / 60)}`;
    if (+mins < 10) {
        mins = "0" + String(mins);
    }
    let secs = `${Math.floor(time % 60)}`;
    if (+secs < 10) {
        secs = "0" + String(secs);
    }

    return "00:" + mins + ":" + secs;
};

export const getRandomHexColor = () => {
    return (
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
};
