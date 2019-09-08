import { Component, ReactNode } from 'react';
import * as React from 'react';

export interface State {
  value: number;
}

export interface Props {
    ind: number;
    jnd: number;
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
      if (this.props.ind === -2 || this.props.ind === -1) {
          if (this.props.ind === -2) {
              if (this.props.jnd === 0) {
                  return (
                      <div style={{border: '0px double black', textAlign: 'center', width: '40px', minHeight: '10px', background: ' ', padding: '6px' }} >
                          {' '}
                      </div>);
              } else {
                  return (
                  <div style={{border: '0px double black', textAlign: 'center', width: '40px', minHeight: '10px', background: 'white', padding: '6px' }} >
                      {this.props.jnd - 1}
                  </div>);
              }
          } else {
              return (
                  <div style={{border: '1px double black', textAlign: 'center', width: '40px', minHeight: '10px', background: 'white', padding: '6px' }} onClick={this.handler}>
                      {this.state.value}
                  </div>);
          }
      } else {
          if (this.props.ind === -2) {
              return (
                  <div style={{border: '0px double black', textAlign: 'center', width: '40px', minHeight: '10px', background: '', padding: '6px' }} >
                      {' '}
                  </div>);
          } else {
              return (
              <div style={{border: '0px double black', textAlign: 'center', width: '40px', minHeight: '10px', background: 'white', padding: '6px'  }} >
                  {this.props.ind}
              </div>);
          }}
  }
}
