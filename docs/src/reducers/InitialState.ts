import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import RadioButtonState from './componentState/RadioButtonState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    RadioButtonState,
  ],
};

export default intialState;
