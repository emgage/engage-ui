import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import PopoverState from './componentState/PopoverState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    PopoverState,
  ],
};

export default intialState;
