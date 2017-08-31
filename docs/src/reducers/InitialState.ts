import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ColumnState from './componentState/ColumnState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ColumnState,
  ],
};

export default intialState;
