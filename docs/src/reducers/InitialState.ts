import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import CheckboxState from './componentState/CheckboxState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    CheckboxState,
    PositionedOverlayState,
  ],
};

export default intialState;
