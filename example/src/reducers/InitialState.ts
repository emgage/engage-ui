import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ButtonGroupState from './componentState/ButtonGroupState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ButtonGroupState,
  ],
};

export default intialState;
