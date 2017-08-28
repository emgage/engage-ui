import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import DisplayTextState from './componentState/DisplayTextState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    DisplayTextState,
  ],
};

export default intialState;
