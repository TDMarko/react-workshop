import * as React from "react";

import CounterClass, { CounterFc } from "./tasks/counter/Counter";
import { Pokemon } from "./tasks/data/Pokemon";
import { Snake } from "./tasks/games/Snake/Snake";

export const App = () => (
    <>
        <h1>Counter functional way:</h1>
        <CounterFc />
        <br/>
        <br/>
        <h1>Counter class way:</h1>
        <CounterClass />
        <br/>
        <br/>
        <h1>Pokemon API:</h1>
        <Pokemon />
        <br/>
        <br/>
        <h1>Snake game:</h1>
        <Snake />
    </>
);
