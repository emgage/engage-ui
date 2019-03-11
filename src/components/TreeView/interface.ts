import { ReactElement } from 'react';

export interface SourceData {
  id: number;
  key?: number;
  label?: string;
  component?(): ReactElement<any>;
  active: boolean;
  disable?: boolean;
  onToggle?(status?: boolean): void;
  children?: SourceData[];
}
