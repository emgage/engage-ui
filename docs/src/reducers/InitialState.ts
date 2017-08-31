import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import CheckboxState from './componentState/CheckboxState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    CheckboxState,
  ],
};

export default intialState;
