import { Component, ReactNode } from 'react';
import * as React from 'react';
import { MatrixRow } from './MatrixRow';

interface Props {
    rows: number;
    columns: number;
    handler: (values: number[][]) => void;
}

export class Matrix extends Component<Props> {

    values: number[][] = new Array(this.props.rows)
        .fill(new Array(this.props.columns).fill(0));

    constructor(props: Props) {
        super(props);
        this.props.handler(this.values);
    }

    get(elem: number, column: number, row: number): void {
        const res = [...this.values[row]];
        res[column] = elem;
        this.values[row] = res;
        this.props.handler(this.values);
    }

    render(): ReactNode {
        let flg = -1;
        return (
            <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
                <div>
                    {new Array(this.props.rows).fill(0).map((e, i) => {
                        flg = flg + 1;
                        return (
                            <div className="container" key={i}>
                                <MatrixRow length={this.props.columns} fl={flg} get={(el, c) => this.get(el, c, i)}/>
                            </div>);

                    })}
                </div>
            </div>);
    }
}
