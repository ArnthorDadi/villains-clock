import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { Countdown } from "../components/countdown/Countdown";
import { MIN_VILLAIN_COUNT, VillainPlayer } from "./CreateGame";

export const Game: React.FC<{ history: any }> = (props) => {
    const history = useHistory();
    const [villains, setVillains] = React.useState<VillainPlayer[] | undefined>();
    const [isPlaying, setIsPlaying] = React.useState(true);

    const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0);
    const buttonClock = React.useRef<HTMLButtonElement>(null);

    const countdowns: React.ReactNode = [];

    React.useEffect(() => {
        const state = props.history?.location?.state;
        if (
            !state ||
            (!state?.villains && state?.villains.length >= MIN_VILLAIN_COUNT) ||
            !state?.repeatedTime
        ) {
            history.goBack();
        }

        setVillains(state?.villains);
    }, []);

    const initialTime = props.history?.location?.state?.time;
    const repeatedTime = props.history?.location?.state?.repeatedTime;
    const CurrentVillain = !!villains ? villains[currentPlayerIndex] : undefined;
    let villainRemainingTime = CurrentVillain?.time;

    return (
        <div className="d-flex flex-column justify-content-center" style={{}}>
            {!!CurrentVillain && (
                <div className="d-flex align-items-center justify-content-center mt-5">
                    <img
                        className="rounded"
                        style={{
                            width: 50,
                            height: 50,
                            marginLeft: 15,
                            marginRight: 15,
                        }}
                        src={CurrentVillain.imageUrl}
                    />
                    <p className="m-0" style={{ color: "white" }}>
                        {CurrentVillain.name}
                    </p>
                </div>
            )}
            <button
                className="my-5"
                onClick={() => {
                    setVillains(
                        villains?.map((villain) => {
                            return villain.id === CurrentVillain?.id
                                ? { ...villain, time: villainRemainingTime ?? villain.time }
                                : villain;
                        })
                    );

                    setCurrentPlayerIndex(
                        currentPlayerIndex === (villains?.length ?? 0) - 1
                            ? 0
                            : currentPlayerIndex + 1
                    );
                }}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "none",
                    background: "rgba(0, 0, 0, 0)",
                }}
                ref={buttonClock}
            >
                {!!CurrentVillain && (
                    <Countdown
                        totalTime={initialTime}
                        currentTime={CurrentVillain.time}
                        isPlaying={isPlaying}
                    />
                )}
            </button>

            <Button className="mb-3 mx-5" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? "Stop" : "Resume"}
            </Button>
            <Button
                className="mb-3 mx-5"
                onClick={() =>
                    !!villains &&
                    setCurrentPlayerIndex(
                        currentPlayerIndex === 0
                            ? villains.length - 1
                            : currentPlayerIndex - 1
                    )
                }
            >
                Previous
            </Button>
        </div>
    );
};
