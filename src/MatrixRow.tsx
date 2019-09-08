import { Component, ReactNode } from 'react';
import * as React from 'react';
import { MatrixCell } from './MatrixCell';

interface Props {
  length: number;
  fl: number;
  get: (elem: number, index: number) => void;
}

export class MatrixRow extends Component<Props> {

  get(elem: number, index: number) {
    this.props.get(elem, index);
  }

  render(): ReactNode {
    let index = -3;
    return new Array(this.props.length).fill(0).map((e, i) => {
      if (this.props.fl === 0) {
        if (index === -2) {
          index = -1;
        }
        index += 1;
        return (
            <div key={i} style={{ float: 'left', padding: '2px', cursor: 'pointer' }}>
              <MatrixCell ind={index} jnd={0} get={(el: number) => this.get(el, i)}/>
            </div>);

      } else {
        index += 1;
        if (index === 0) {
          index = -1;
        }
        return (
            <div key={i} style={{ float: 'left', padding: '2px', cursor: 'pointer' }}>
              <MatrixCell ind={index} jnd={this.props.fl} get={(el: number) => this.get(el, i)}/>
            </div>);
      }

    });
  }
}
