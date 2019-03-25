import { Component, ReactNode } from 'react';
import * as React from 'react';

export interface State {
  value: number;
}

export interface Props {
  get: (e: number) => void;
}

export class MatrixCell extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handler = this.handler.bind(this);
  }

  handler() {
    this.setState(
        {
            value: this.state.value ? 0 : 1,
        },
        () => {
          this.props.get(this.state.value);
        });
  }
  render(): ReactNode {
    return (
        <div style={{ border: '1px double black', background: 'white', padding: '5px' }} onClick={this.handler}>
          {this.state.value}
        </div>);
  }
}
