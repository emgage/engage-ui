import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ChoiceState from './componentState/ChoiceState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ChoiceState,
  ],
};

export default intialState;
