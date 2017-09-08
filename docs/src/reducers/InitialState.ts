import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import FormLayoutState from './componentState/FormLayoutState';
import LabelledState from './componentState/LabelledState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    FormLayoutState,
    LabelledState,
    PositionedOverlayState,
  ],
};

export default intialState;
