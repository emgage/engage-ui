import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import CheckboxState from './componentState/CheckboxState';
import DisplayTextState from './componentState/DisplayTextState';
import ListState from './componentState/ListState';
import MessageState from './componentState/MessageState';
import ColumnState from './componentState/ColumnState';
import ConnectedState from './componentState/ConnectedState';
import BadgeState from './componentState/BadgeState';
import LoadingState from './componentState/LoadingState';
import SelectState from './componentState/SelectState';
import CardState from './componentState/CardState';
import BannerState from './componentState/BannerState';
import LabelledState from './componentState/LabelledState';
import LabelState from './componentState/LabelState';
import PositionedOverlayState  from './componentState/PositionedOverlayState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    CheckboxState,
    DisplayTextState,
    ListState,
    MessageState,
    ColumnState,
    ConnectedState,
    BadgeState,
    LoadingState,
    SelectState,
    CardState,
    BannerState,
    LabelledState,
    LabelState,
    PositionedOverlayState,
  ],
};

export default intialState;
