import { Component, ReactNode } from 'react';
import * as React from 'react';
import { MatrixCell } from './MatrixCell';

interface Props {
  length: number;
  get: (elem: number, index: number) => void;
}

export class MatrixRow extends Component<Props> {

  get(elem: number, index: number) {
    this.props.get(elem, index);
  }

  render(): ReactNode {
    return new Array(this.props.length).fill(0).map((e, i) => {
      return (
          <div key={i} style={{ float: 'left', padding: '2px', cursor: 'pointer' }}>
            <MatrixCell get={(el: number) => this.get(el, i)}/>
          </div>);
    });
  }
}
