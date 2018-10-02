import * as React from 'react';
import { Heading, Process } from '../../../../src/components';

const steps = [
  { name: 'StepOne', component: <Heading>test0</Heading> },
  { name: 'StepTwo', component: <Heading>test1</Heading> },
  { name: 'StepThree', component: <Heading>test2</Heading> },
  { name: 'StepFour', component: <Heading>test3</Heading> }
];

class ProcessExampleFirst extends React.Component {
  render() {
    return (
      <div>
        <Process steps={steps}></Process>
      </div>
    );
  }
}

export default ProcessExampleFirst;
