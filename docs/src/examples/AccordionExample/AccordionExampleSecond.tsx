import * as React from 'react';
import {
  Accordion,
  AccordionItemProps,
  DisplayText,
  Label
} from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

class AccordionExampleSecond extends React.Component<never, never> {
  render() {
    const items: AccordionItemProps[] = [
      {
        children: <DisplayText children="This is item 1" />,
        header: <Label componentId="1" required={false} focused={false} hasValue={false} hidden={false}>Item1</Label>
      },
      {
        children: <DisplayText children="This is item 2" />,
        header: <Label componentId="2" required={false} focused={false} hasValue={false} hidden={false}>Item2</Label>
      },
      {
        children: <DisplayText children="This is item 3" />,
        header: <Label componentId="3" required={false} focused={false} hasValue={false} hidden={false}>Item3</Label>
      }
    ];

    return (
      <div className={styles.example}>
        <Accordion items={items} mode="collapsible" />
      </div>
    );
  }
}

export default AccordionExampleSecond;
