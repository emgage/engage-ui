import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ListState from './componentState/ListState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ListState,
  ],
};

export default intialState;
