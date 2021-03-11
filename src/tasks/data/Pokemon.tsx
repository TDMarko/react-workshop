import React from "react";

interface IPokemonData {
    name: string;
    sprites: {
        back_default: string;
    };
}

const TOTAL_AMOUNT_OF_POKEMONS = 248;

export const Pokemon: React.FC = () => {
    const [data, setData] = React.useState<IPokemonData>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        getPokemon();
    }, []);

    const getRandomPokemon = () => Math.floor(Math.random() * TOTAL_AMOUNT_OF_POKEMONS);
    const getPokemon = async () => {
        setIsLoading(true);

        return await fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemon()}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
    }

    return (
        <div>
            {
                isLoading
                    ? "Loading..."
                    : <>
                        <img src={data.sprites.back_default} />
                        <div>{data.name}</div>
                    </>
            }
            <button onClick={() => getPokemon()}>Get random Pokemon!</button>
        </div>
    )
};

