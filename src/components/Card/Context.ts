import * as React from 'react';
// Used to determine when to prevent event bubbling from card children
const Context = React.createContext({ cardHasOnClick: false });

export default Context;
