import './App.css';
import * as React from 'react';
import { store, TaskTemplate, TaskToolbar, ToolButtonList } from 'graphlabs.core.template';
import { Matrix } from './Matrix';
import { IEdgeView } from 'graphlabs.core.template/build/models/graph';

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
          for (let index = 1; index < graph.vertices.length + 1; index++) {
              for (let jndex = 1; jndex < graph.vertices.length + 1; jndex++) {
                  const e = graph.edges.find((edge: IEdgeView) =>
                                             edge.vertexTwo === (index - 1).toString() && edge.vertexOne === (jndex - 1).toString()
                                             || edge.vertexOne === (index - 1).toString() && edge.vertexTwo === (jndex - 1).toString());
                  // console.log('IN = ', index - 1, 'JN = ', jndex - 1, 'A = ', this.values[index][jndex], 'Edg = ', e);
                  if (index !== jndex && (this.values[index][jndex] === 0 && e !== void 0
                      || this.values[index][jndex] !== 0 && e === void 0)) {
                      res += 5;
                  }

              }
          }
          // tslint:disable-next-line
          // console.log(res);
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
После заполнения матрицы нажмите галочку для проверки задания.`;
          return ToolButtonList;
      };
      return TaskToolbar;
  }
  task() {
      const graph = store.getState().graph;
      return () => (
          <Matrix
            rows={graph.vertices.length + 1}
            columns={graph.vertices.length + 1}
            handler={this.handler}
          />);
  }
}

export default App;
