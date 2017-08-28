import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import MessageState from './componentState/MessageState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    MessageState,
  ],
};

export default intialState;
