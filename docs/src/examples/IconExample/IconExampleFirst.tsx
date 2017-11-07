import * as React from 'react';
import { Icon, Stack } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const IconExampleFirst = () => (
  <div className={styles.example}>
  <Stack spacing="extraLoose">
      <div><Icon source="add" /> add</div>
      <div><Icon source="alert" /> alert</div>
      <div><Icon source="arrowDown" /> arrowDown</div>
      <div><Icon source="arrowLeft" /> arrowLeft</div>
      <div><Icon source="arrowRight" /> arrowRight</div>
      <div><Icon source="arrowUp" /> arrowUp</div>
      <div><Icon source="calendar" /> calendar</div>
      <div><Icon source="cancel" /> cancel</div>
      <div><Icon source="cancelSmall" /> cancelSmall</div>
      <div><Icon source="caretDown" /> caretDown</div>
      <div><Icon source="caretUp" /> caretUp</div>
      <div><Icon source="chevronDown" /> chevronDown</div>
      <div><Icon source="chevronLeft" /> chevronLeft</div>
      <div><Icon source="chevronRight" /> chevronRight</div>
      <div><Icon source="chevronUp" /> chevronUp</div>
      <div><Icon source="circleCancel" /> circleCancel</div>
      <div><Icon source="circleChevronDown" /> circleChevronDown</div>
      <div><Icon source="circleChevronLeft" /> circleChevronLeft</div>
      <div><Icon source="circleChevronRight" /> circleChevronRight</div>
      <div><Icon source="circleChevronUp" /> circleChevronUp</div>
      <div><Icon source="circlePlus" /> circlePlus</div>
      <div><Icon source="conversation" /> conversation</div>
      <div><Icon source="disable" /> disable</div>
      <div><Icon source="dispute" /> dispute</div>
      <div><Icon source="duplicate" /> duplicate</div>
      <div><Icon source="embed" /> embed</div>
      <div><Icon source="external" /> external</div>
      <div><Icon source="horizontalDots" /> horizontalDots</div>
      <div><Icon source="notes" /> notes</div>
      <div><Icon source="print" /> print</div>
      <div><Icon source="refresh" /> refresh</div>
      <div><Icon source="risk" /> risk</div>
      <div><Icon source="search" /> search</div>
      <div><Icon source="spinner" /> spinner</div>
      <div><Icon source="view" /> view</div>
      <div><Icon source="delete" /> delete</div>
      <div><Icon source="placeholder" /> placeholder</div>
  </Stack>
  </div>
);

export default IconExampleFirst;
