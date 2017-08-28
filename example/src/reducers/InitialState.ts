import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ChipState from './componentState/ChipState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ChipState,
  ],
};

export default intialState;
