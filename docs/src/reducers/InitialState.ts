import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ScrollableState from './componentState/ScrollableState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ScrollableState,
  ],
};

export default intialState;
