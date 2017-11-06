import * as React from 'react';
import { Icon, FormLayout, Label } from '../../../../src/components/';
import Group from '../../../../src/components/FormLayout/Group';
import * as styles from '../../styles/components-page.scss';

const IconExampleFirst = () => (
  <div className={styles.example}>
  <FormLayout>
      <Group condensed>
      <Icon source="add" /><Label id="add">add</Label>
      <Icon source="alert" /><Label id="alert">alert</Label>
      <Icon source="arrowDown" /><Label id="arrowDown">arrowDown</Label>
      <Icon source="arrowLeft" /><Label id="arrowLeft">arrowLeft</Label>
      <Icon source="arrowRight" /><Label id="arrowRight">arrowRight</Label>
      <Icon source="arrowUp" /><Label id="arrowUp">arrowUp</Label>
      <Icon source="calendar" /><Label id="calendar">calendar</Label>
      <Icon source="cancel" /><Label id="cancel">cancel</Label>
      <Icon source="cancelSmall" /><Label id="cancelSmall">cancelSmall</Label>
      <Icon source="caretDown" /><Label id="caretDown">caretDown</Label>
      <Icon source="caretUp" /><Label id="caretUp">caretUp</Label>
      <Icon source="chevronDown" /><Label id="chevronDown">chevronDown</Label>
      <Icon source="chevronLeft" /><Label id="chevronLeft">chevronLeft</Label>
      <Icon source="chevronRight" /><Label id="chevronRight">chevronRight</Label>
      <Icon source="chevronUp" /><Label id="chevronUp">chevronUp</Label>
      <Icon source="circleCancel" /><Label id="circleCancel">circleCancel</Label>
      <Icon source="circleChevronDown" /><Label id="circleChevronDown">circleChevronDown</Label>
      <Icon source="circleChevronLeft" /><Label id="circleChevronLeft">circleChevronLeft</Label>
      <Icon source="circleChevronRight" /><Label id="circleChevronRight">circleChevronRight</Label>
      <Icon source="circleChevronUp" /><Label id="circleChevronUp">circleChevronUp</Label>
      <Icon source="circlePlus" /><Label id="circlePlus">circlePlus</Label>
      <Icon source="conversation" /><Label id="conversation">conversation</Label>
      <Icon source="disable" /><Label id="disable">disable</Label>
      <Icon source="dispute" /><Label id="dispute">dispute</Label>
      <Icon source="duplicate" /><Label id="duplicate">duplicate</Label>
      <Icon source="embed" /><Label id="embed">embed</Label>
      <Icon source="external" /><Label id="external">external</Label>
      <Icon source="horizontalDots" /><Label id="horizontalDots">horizontalDots</Label>
      <Icon source="notes" /><Label id="notes">notes</Label>
      <Icon source="print" /><Label id="print">print</Label>
      <Icon source="refresh" /><Label id="refresh">refresh</Label>
      <Icon source="risk" /><Label id="risk">risk</Label>
      <Icon source="search" /><Label id="search">search</Label>
      <Icon source="view" /><Label id="view">view</Label>
      <Icon source="delete" /><Label id="delete">delete</Label>
      <Icon source="placeholder" /><Label id="placeholder">placeholder</Label>
      </Group>
      </FormLayout>
  </div>
);

export default IconExampleFirst;
