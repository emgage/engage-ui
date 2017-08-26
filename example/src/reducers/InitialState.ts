import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
  ],
};

export default intialState;
