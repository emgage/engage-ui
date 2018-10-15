import * as React from 'react';
import { Heading, Process } from '../../../../src/components';

const steps = [
  { name: 'Completed', component: <Heading>test0</Heading>, style: { borderBottom : '4px solid green' } },
  { name: 'Active', component: <Heading>test1</Heading>, style: { borderBottom : '4px solid red' } },
  { name: 'Upcoming', component: <Heading>test2</Heading> }
];


class ProcessExampleFirst extends React.Component {

  state = {
    processComponentState: 0,
  };

  updateProcessState(processLength: number, processComponentState: number,) {
    this.setState({ processLength, processComponentState });
  }

  updateProcessStateonClick(processComponentState: number,) {
    this.setState({ processComponentState });
  }

  render() {
    return (
      <div>
        <Process steps={steps} onClick={(processComponentState: number) => this.updateProcessStateonClick(processComponentState)} onComponentStateUpdate={(currentState: number, processComponentState: number) => this.updateProcessState(currentState, processComponentState) }  processComponentState = {this.state.processComponentState}></Process>
      </div>
    );
  }
}

export default ProcessExampleFirst;
