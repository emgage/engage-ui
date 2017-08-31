import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import StackState from './componentState/StackState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    StackState,
  ],
};

export default intialState;
