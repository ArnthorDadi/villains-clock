import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useHistory } from "react-router";

import CaptainHook from "../assets/images/villains/Captain Hook.png";
import DoctorFacilier from "../assets/images/villains/Doctor Facilier.png";
import Hades from "../assets/images/villains/Hades.png";
import Jafar from "../assets/images/villains/Jafar.png";
import Lotso from "../assets/images/villains/Lotso.png";
import MadamMim from "../assets/images/villains/Madam Mim.png";
import Maleficent from "../assets/images/villains/Maleficent.png";
import PrinceJohn from "../assets/images/villains/Prince John.png";
import QueenOfHearts from "../assets/images/villains/Queen of Hearts.png";
import Ratigan from "../assets/images/villains/Ratigan.png";
import Scar from "../assets/images/villains/Scar.png";
import Syndrome from "../assets/images/villains/Syndrome.png";
import TheEvilQueen from "../assets/images/villains/The Evil Queen.png";
import Ursula from "../assets/images/villains/Ursula.png";
import Yzma from "../assets/images/villains/Yzma.png";
import { Center } from "../components/layout/Center";

export type Villain = {
    id: number;
    name: string;
    imageUrl: string;
};

export type VillainPlayer = Villain & { time: number };

const VILLAINS_LIST: Villain[] = [
    { id: 1, name: "Captain Hook", imageUrl: CaptainHook },
    { id: 2, name: "Doctor Facilier", imageUrl: DoctorFacilier },
    { id: 3, name: "Hades", imageUrl: Hades },
    { id: 4, name: "Jafar", imageUrl: Jafar },
    { id: 5, name: "Lotso", imageUrl: Lotso },
    { id: 6, name: "Madam Mim", imageUrl: MadamMim },
    { id: 7, name: "Maleficent", imageUrl: Maleficent },
    { id: 8, name: "PrinceJohn", imageUrl: PrinceJohn },
    { id: 9, name: "Queen Of Hearts", imageUrl: QueenOfHearts },
    { id: 10, name: "Ratigan", imageUrl: Ratigan },
    { id: 11, name: "Scar", imageUrl: Scar },
    { id: 12, name: "Syndrome", imageUrl: Syndrome },
    { id: 13, name: "The Evil Queen", imageUrl: TheEvilQueen },
    { id: 14, name: "Ursula", imageUrl: Ursula },
    { id: 15, name: "Yzma", imageUrl: Yzma },
];

const MIN_VILLAIN_TIME = 3;
const MAX_VILLAIN_TIME = 59;

const MIN_VILLAIN_REPEATED_TIME = 1;
const MAX_VILLAIN_REPEATED_TIME = MAX_VILLAIN_TIME;

export const MIN_VILLAIN_COUNT = 2;

export const CreateGame: React.FC = () => {
    const history = useHistory();
    const [villains, setVillains] = React.useState<Villain[]>([]);
    const [addVillain, setAddVillain] = React.useState(false);

    const [villainTime, setVillainTime] = React.useState("10:00");
    const [villainRepeatedTime, setVillainRepeatedTime] = React.useState("05:00");
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
        undefined
    );

    const startGame = () => {
        const [villainMin, villainSec] = villainTime.split(":");
        const [villainRepeatedMin, villainRepeatedSec] =
            villainRepeatedTime.split(":");
        setErrorMessage(undefined);

        if (!(villains.length >= MIN_VILLAIN_COUNT))
            setErrorMessage("You will need at least two Villains to play Villanous!");
        else if (
            !(
                MIN_VILLAIN_TIME <= parseInt(villainMin) &&
                parseInt(villainMin) <= MAX_VILLAIN_TIME
            )
        )
            setErrorMessage(
                `Villain time must be between ${MIN_VILLAIN_TIME} and ${MAX_VILLAIN_TIME} minutes`
            );
        else if (
            !(
                MIN_VILLAIN_REPEATED_TIME <= parseInt(villainRepeatedMin) &&
                parseInt(villainRepeatedMin) <= MAX_VILLAIN_REPEATED_TIME
            )
        )
            setErrorMessage(
                `Villain repeated time must be between ${MIN_VILLAIN_REPEATED_TIME} and ${MAX_VILLAIN_REPEATED_TIME} minutes`
            );
        else {
            history.push("/villains-clock/game", {
                villains: villains.map((villain) => {
                    return {
                        ...villain,
                        time: parseInt(villainMin) * 60 + parseInt(villainSec)
                    };
                }) as VillainPlayer[],
                time: parseInt(villainMin) * 60 + parseInt(villainSec),
                repeatedTime:
                    parseInt(villainRepeatedMin) * 60 + parseInt(villainRepeatedSec),
            });
        }
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const first = villains[index];
        const second = villains[index - 1];

        setVillains(villains.map((villain, i) => {
            if (i === index) {
                return second
            } else if (i === index - 1) {
                return first
            } else {
                return villain
            }
        }));
    };
    const moveDown = (index: number) => {
        if (index === villains.length - 1) return;
        const first = villains[index];
        const second = villains[index + 1];

        setVillains(villains.map((villain, i) => {
            if (i === index) {
                return second
            } else if (i === index + 1) {
                return first
            } else {
                return villain
            }
        }));
    };

    return (
        <div className="px-5 pb-5">
            <Form className="mt-3">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Villains Time"
                    className="mb-3"
                >
                    <Form.Control
                        value={villainTime}
                        onChange={(e) => {
                            setErrorMessage(undefined);
                            setVillainTime(e.target.value);
                        }}
                        type="time"
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Villains Repeated Time"
                    className="mb-3"
                >
                    <Form.Control
                        value={villainRepeatedTime}
                        onChange={(e) => {
                            setErrorMessage(undefined);
                            setVillainRepeatedTime(e.target.value);
                        }}
                        type="time"
                    />
                    {!!errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                </FloatingLabel>
                {!!villains && villains.length > 0 && (
                    <div className="mt-3">
                        {villains.map((villain, index) => (
                            <React.Fragment key={villain.id}>
                                <div className="d-flex flex-row d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <p className="m-0" style={{ color: "white" }}>
                                            {index + 1}.
                                        </p>
                                        <img
                                            className="rounded"
                                            style={{
                                                width: 50,
                                                height: 50,
                                                marginLeft: 15,
                                                marginRight: 15,
                                            }}
                                            src={villain.imageUrl}
                                        />
                                        <p className="m-0" style={{ color: "white" }}>
                                            {villain.name}
                                        </p>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div
                                            className="d-flex flex-column"
                                            style={{ marginRight: 5 }}
                                        >
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                onClick={() => moveUp(index)}
                                                style={{ marginBottom: 5 }}
                                            >
                                                Up
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                onClick={() => moveDown(index)}
                                            >
                                                Down
                                            </Button>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                setVillains(
                                                    villains.filter(
                                                        (inListVillain) => inListVillain.id !== villain.id
                                                    )
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                {index !== villains.length - 1 && (
                                    <div
                                        className="my-2"
                                        style={{ height: 0.5, background: "grey" }}
                                    ></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
                <Button
                    onClick={() => setAddVillain(!addVillain)}
                    variant="secondary"
                    className="mt-3"
                >
                    {addVillain ? "Cancel" : "Add Villain"}
                </Button>
                {addVillain && (
                    <Center className="d-flex flex-wrap mt-3 justify-content-center">
                        {VILLAINS_LIST.filter((villain) => !villains.includes(villain)).map(
                            (villain) => (
                                <img
                                    key={villain.id}
                                    onClick={() => {
                                        setErrorMessage(undefined);
                                        !villains.some(
                                            (inListVillain) => inListVillain.id === villain.id
                                        ) && setVillains([...villains, villain]);
                                    }}
                                    className="rounded-3 m-1"
                                    style={{ width: "30.4%", maxHeight: 150, maxWidth: 150, aspectRatio: "1/1" }}
                                    src={villain.imageUrl}
                                />
                            )
                        )}
                    </Center>
                )}
                <hr />
                <div className="d-grid gap-2">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={startGame}
                        disabled={!!errorMessage}
                    >
                        Start Game!
                    </Button>
                </div>
            </Form>
        </div>
    );
};
