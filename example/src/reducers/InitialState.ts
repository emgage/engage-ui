import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import TooltipState from './componentState/TooltipState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    TooltipState,
  ],
};

export default intialState;
