import React from "react";

const wrapperStyle = {
    width: "35.2em",
    height: "35.2em",
    background: "#cccccc",
    display: "flex",
    flexWrap: "wrap",
    position: "relative"
} as React.CSSProperties;

const gameLostStyle = {
    width: "4em",
    height: "1em",
    background: "red",
    fontSize: "3em",
    padding: "1em",
    position: "absolute",
    top: "4em",
    left: "50%",
    transform: "translateX(-50%)",
} as React.CSSProperties;

const cellStyle = (bg?: string) => {
    return {
        width: "2.2em",
        height: "2.2em",
        border: "1px solid rgba(120, 120, 120)",
        boxSizing: "border-box",
        background: bg ? bg : null,
    } as React.CSSProperties
};

export const Cell = (props: { isFood: boolean; isSnake: boolean; isHead: boolean }) => {
    return <>
        <div
            style={{ ...cellStyle(
                props.isFood ? "red" :
                    props.isSnake ?
                        props.isHead ? "blue" : "green"
                : null
            )}}
        />
    </>;
}

// Dans workaround with intervals and hooks
function useInterval(callback: any, delay: number) {
    const savedCallback = React.useRef();

    // Remember the latest callback.
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const ROWS = 16;
const COLS = 16;

enum Direction {
    Up = "up",
    Left = "left",
    Down = "down",
    Right = "right",
}

interface IGrid {
    x: number,
    y: number,
    isFood?: boolean,
    isSnake?: boolean,
    isHead?: boolean,
}

interface ISnake {
    x: number,
    y: number,
    isHead: boolean,
}

interface IFood {
    x: number,
    y: number,
}

export const Snake: React.FC = () => {
    const ref = React.useRef(null);

    const [grid, setGrid] = React.useState<IGrid[]>([]);
    const [isGameLost, setGameLost] = React.useState<boolean>(false);
    const [foodState, setFoodState] = React.useState<IFood>({
        x: Math.floor(Math.random() * ROWS),
        y: Math.floor(Math.random() * COLS),
    });
    const [direction, setDirection] = React.useState<string>(Direction.Right);
    const [snakeState, setSnakeState] = React.useState<ISnake[]>([{
        x: 8,
        y: 8,
        isHead: true,
    }]);

    // fill grid with cells
    const fillGrid = () => {
        const grid: IGrid[] = [];

        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                grid.push({
                    x: x,
                    y: y,
                    isFood: foodState.x === x && foodState.y === y,
                    isSnake: snakeState.some((a) => a.x === x && a.y === y),
                    isHead: snakeState.some((a) => a.x === x && a.y === y && a.isHead)
                })
            }
        }

        setGrid(grid);
    }

    // add grid to ui
    const renderGrid = () => {
        return grid.map((g: IGrid) => {
            return <Cell
                key={g.x.toString() + '-' + g.y.toString()}
                isFood={g.isFood}
                isSnake={g.isSnake}
                isHead={g.isHead}
            />
        })
    }

    // get fruit coordinate
    const fillFood = () => {
        setFoodState({
            x: Math.floor(Math.random() * ROWS),
            y: Math.floor(Math.random() * COLS),
        });
    }

    // make snake
    const fillSnake = () => {
        const newState = [...snakeState];
        const newHead = {
            x: newState[0].x + (direction === Direction.Right ? 1 : direction === Direction.Left ? -1 : 0 ),
            y: newState[0].y + (direction === Direction.Up ? -1 : direction === Direction.Down ? 1 : 0 ),
            isHead: true,
        }

        if (newState[0].x === foodState.x && newState[0].y == foodState.y && newState[0].isHead) {
            newState.unshift({
                x: foodState.x,
                y: foodState.y,
                isHead: true,
            })

            fillFood();
        }

        newState.unshift(newHead);
        newState.pop();

        setSnakeState(newState)
    }

    // if out of grid or snake head hits its tale
    const checkGameStatus = () => {
        const lostByPerimeter = snakeState.filter(s => {
            return s.x < 0 || s.x >= COLS || s.y < 0 || s.y >= ROWS
        });

        const lostByEatingItself = snakeState.filter(s => {
            return snakeState[0].x === s.x && snakeState[0].y === s.y
        });

        setGameLost(lostByPerimeter.length !== 0 || lostByEatingItself.length >= 2);
    }

    // handle key presses
    const keyHandler = (e: any) => {
        if (e.key === "ArrowUp" && direction !== Direction.Down) {
            setDirection(Direction.Up);
        }
        if (e.key === "ArrowRight" && direction !== Direction.Left) {
            setDirection(Direction.Right);
        }
        if (e.key === "ArrowDown" && direction !== Direction.Up) {
            setDirection(Direction.Down);
        }
        if (e.key === "ArrowLeft" && direction !== Direction.Right) {
            setDirection(Direction.Left);
        }
    };

    // on component mount we need to render grid
    React.useEffect(() => {
        fillGrid();

        // and focus div that handles key actions
        ref.current.focus();
    }, []);

    // we stop interval after game is lost
    useInterval(() => {
        fillSnake();
        fillGrid();
        checkGameStatus();
    }, isGameLost ? null : 200);

    return (
        <div style={wrapperStyle} onKeyDown={(e) => keyHandler(e)} tabIndex={1} ref={ref}>
            {isGameLost && <div style={gameLostStyle}>You lost!</div>}
            {renderGrid()}
        </div>
    )
}

