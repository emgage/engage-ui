import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import SubheadingState from './componentState/SubheadingState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    SubheadingState,
  ],
};

export default intialState;
