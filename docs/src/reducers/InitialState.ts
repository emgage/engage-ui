import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import PopoverState from './componentState/PopoverState';
import LabelledState from './componentState/LabelledState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    PopoverState,
    LabelledState,
    PositionedOverlayState,
  ],
};

export default intialState;
