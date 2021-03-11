import React from "react";

export const CounterFc: React.FC = () => {
    const [count, setCount] = React.useState(0);

    return (
        <>
            <div>
                {count}
            </div>
            <button onClick={() => setCount(count + 1)}>Increase!</button>
        </>
    )
}

export default class CounterClass extends React.Component<{}, { count: number }> {
    constructor(props: {}) {
        super(props);

        this.state = {
            count: 0,
        }
    }

    render() {
        return (
            <>
                <div>
                    {this.state.count}
                </div>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increase!</button>
            </>
        )
    }
}
