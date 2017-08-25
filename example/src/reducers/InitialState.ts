import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ClickableChipState from './componentState/ClickableChipState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ClickableChipState,
  ],
};

export default intialState;
