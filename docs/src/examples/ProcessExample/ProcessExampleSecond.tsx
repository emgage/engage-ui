import * as React from 'react';
import { Heading, Process } from '../../../../src/components';

const steps = [
  { name: 'StepOne', component: <Heading>test0</Heading> },
  { name: 'StepTwo', component: <Heading>test1</Heading> },
  { name: 'StepThree', component: <Heading>test2</Heading> },
  { name: 'StepFour', component: <Heading>test3</Heading> }
];

class ProcessExampleSecond extends React.Component {
  render() {
    return (
      <div>
        <Process steps={steps} allowBackStepping></Process>
      </div>
    );
  }
}

export default ProcessExampleSecond;
