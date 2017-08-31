import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ConnectedState from './componentState/ConnectedState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ConnectedState,
  ],
};

export default intialState;
