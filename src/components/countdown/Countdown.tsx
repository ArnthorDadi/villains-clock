import React from "react";
import { useElapsedTime } from "use-elapsed-time";

export const Countdown: React.FC<{
    totalTime: number;
    currentTime: number;
    isPlaying: boolean;
}> = ({ totalTime, currentTime, isPlaying }) => {
    const { elapsedTime } = useElapsedTime({
        duration: currentTime,
        isPlaying,
        updateInterval: 1,
        onUpdate: undefined, //(time) => console.log(`${time} seconds elapsed`)
    });
    const remainingTime = totalTime - elapsedTime;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = `${remainingTime % 60}`.padStart(2, "0");

    console.log({ remainingTime, totalTime, currentTime, isPlaying });

    return (
        <div
            className="pb-0 py-2 mx-5"
            style={{
                width: `${(remainingTime / totalTime) * 100}%`,
                backgroundColor: "green",
            }}
        >
            <p style={{ color: "white" }}>
                {minutes}:{seconds}
            </p>
        </div>
    );
};
