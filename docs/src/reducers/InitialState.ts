import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import LinkState from './componentState/LinkState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    LinkState,
  ],
};

export default intialState;
