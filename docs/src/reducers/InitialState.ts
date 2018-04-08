import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ChipState from './componentState/ChipState';
import ValidatedTextFieldState from './componentState/ValidatedTextFieldState';
import ValidatedFormState from './componentState/ValidatedFormState';
import ChoiceState from './componentState/ChoiceState';
import IconState from './componentState/IconState';
import RadioButtonState from './componentState/RadioButtonState';
import HeadingState from './componentState/HeadingState';
import SubheadingState from './componentState/SubheadingState';
import StackState from './componentState/StackState';
import TooltipState from './componentState/TooltipState';
import ClickableChipState from './componentState/ClickableChipState';
import VideoState from './componentState/VideoState';
import VisuallyHiddenState from './componentState/VisuallyHiddenState';
import PopoverState from './componentState/PopoverState';
import ImageState from './componentState/ImageState';
import ScrollableState from './componentState/ScrollableState';
import LinkState from './componentState/LinkState';
import TextFieldState from './componentState/TextFieldState';
import FlexBoxState from './componentState/FlexBoxState';
import FormLayoutState from './componentState/FormLayoutState';
import ButtonGroupState from './componentState/ButtonGroupState';
import TagState from './componentState/TagState';
import ButtonState from './componentState/ButtonState';
import UnstyledLinkState from './componentState/UnstyledLinkState';
import AvatarState from './componentState/AvatarState';
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
import PositionedOverlayState from './componentState/PositionedOverlayState';
import ModalState from './componentState/ModalState';
import PickerState from './componentState/PickerState';
import CaptionState from './componentState/CaptionState';
import SpinnerState from './componentState/SpinnerState';
import DrawerState from './componentState/DrawerState';

const intialState: IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ChipState,
    ValidatedFormState,
    ValidatedTextFieldState,
    ChoiceState,
    IconState,
    RadioButtonState,
    HeadingState,
    SubheadingState,
    StackState,
    TooltipState,
    ClickableChipState,
    VideoState,
    VisuallyHiddenState,
    PopoverState,
    ImageState,
    ScrollableState,
    TextFieldState,
    FlexBoxState,
    FormLayoutState,
    ButtonGroupState,
    TagState,
    ButtonState,
    UnstyledLinkState,
    AvatarState,
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
    ModalState,
    LinkState,
    PickerState,
    CaptionState,
    SpinnerState,
    DrawerState,
  ],
};

export default intialState;
