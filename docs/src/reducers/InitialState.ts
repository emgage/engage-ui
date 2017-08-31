import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import HeadingState from './componentState/HeadingState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    HeadingState,
  ],
};

export default intialState;
