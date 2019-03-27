import './App.css';
import * as React from 'react';
import { store, TaskTemplate, TaskToolbar, ToolButtonList } from 'graphlabs.core.template';
import { Matrix } from './Matrix';
import { IEdgeView, IVertexView } from 'graphlabs.core.template/build/models/graph';

class App extends TaskTemplate {

  values: number[][];

  constructor(props: {}) {
    super(props);
    this.calculate = this.calculate.bind(this);
    this.handler = this.handler.bind(this);
  }

  handler(values: number[][]) {
    this.values = values;
  }

  calculate() {
    const graph = store.getState().graph;
    let res = 0;
    graph.vertices.forEach((v: IVertexView, index: number) => {
       graph.vertices.forEach((w: IVertexView, jndex: number) => {
          const e = graph.edges.find((edge: IEdgeView) =>
              edge.vertexTwo === v.name && edge.vertexOne === w.name
                || edge.vertexOne === v.name && edge.vertexTwo === w.name);
          if (index !== jndex && (this.values[index][jndex] === 0 && e !== void 0
            || this.values[index][jndex] !== 0 && e === void 0)) {
              res++;
          } else if (index === jndex && this.values[index][jndex] !== 1) {
              res++;
          }
       });
    });
    // tslint:disable-next-line
    console.log(res);
    return { success: res === 0, fee: res };
  }

  getTaskToolbar() {
      TaskToolbar.prototype.getButtonList = () => {
          function beforeComplete(this: App):  Promise<{ success: boolean; fee: number }> {
              return new Promise((resolve => {
                  resolve(this.calculate());
              }));
          }
          ToolButtonList.prototype.beforeComplete = beforeComplete.bind(this);
          ToolButtonList.prototype.help = () => `В данном задании вы должны заполнить матрицу смежности
в правой части модуля согласно выданному графу.
После заполнения матрицы нажмите кнопку отправки для проверки`;
          return ToolButtonList;
      };
      return TaskToolbar;
  }
  task() {
      const graph = store.getState().graph;
      return () => (
          <Matrix
            rows={graph.vertices.length}
            columns={graph.vertices.length}
            handler={this.handler}
          />);
  }
}

export default App;
