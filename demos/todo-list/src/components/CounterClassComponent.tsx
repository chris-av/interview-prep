import { Component } from 'react';

interface Props {
  props: any;
}

interface State {
  value: number;
}

export default class CounterClassComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
    }

    this.increment = this.increment.bind(this);

  }

  increment() {
    this.setState(prev => {
      return {
        ...prev,
        value: prev.value + 1,
      }
    })
  }


  render() {
    console.log({ props: this.props });
    return (
      <div>
        <h1>Demo of Class Component</h1>
        <div>
          counter :
          <span style={{ marginLeft: "5px" }}>{this.state.value}</span>
        </div>
        <button
          onClick={() => this.increment()}
          style={{ marginTop: "1.2rem" }}
        >
          Increment
        </button>
      </div>
    );
  }

}
