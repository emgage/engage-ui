import * as React from 'react';
// tslint:disable-next-line:import-name
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hopscotch } from 'react-syntax-highlighter/dist/styles';

export interface IProps {
  codeString: string;
}

// tslint:disable-next-line:variable-name
const CodeExample = ({ codeString }: IProps) =>
  <SyntaxHighlighter language="javascript" style={hopscotch}>{codeString}</SyntaxHighlighter>;

export default CodeExample;
