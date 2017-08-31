import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ButtonState from './componentState/ButtonState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ButtonState,
  ],
};

export default intialState;
