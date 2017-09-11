import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import CardState from './componentState/CardState';
import LabelledState from './componentState/LabelledState';
import LabelState from './componentState/LabelState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    CardState,
    LabelledState,
    LabelState,
    PositionedOverlayState,
  ],
};

export default intialState;
