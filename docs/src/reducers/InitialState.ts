import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import TextFieldState from './componentState/TextFieldState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    TextFieldState,
  ],
};

export default intialState;
