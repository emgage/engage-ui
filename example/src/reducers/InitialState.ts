import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import LoadingState from './componentState/LoadingState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    LoadingState,
  ],
};

export default intialState;
