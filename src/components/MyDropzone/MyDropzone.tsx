import * as React from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { MYDROPZONE } from '../ThemeIdentifiers';
import * as baseTheme from './MyDropzone.scss';
import { FlexBox, Button, BodyText } from '../';

interface IFile {
  id?: string | number;
  name: string;
  url?: string;
  removable?: boolean;
}

export interface Props {
  onDrop(files: any[]): void;
  onRemove(file: IFile, index: number): void;
  onBrowseClick?(): void;
  maxFiles?: number;
  dragDropLabel?: string;
  // dropzone configuration
  dropzoneConfig?: DropzoneOptions;
  // already uploaded files array
  uploadedFiles?: IFile[];
  // Css class name
  componentClass?: string;
  // Custom css style
  componentStyle?: React.CSSProperties;
  // Theme to be injected via css-themr
  theme?: any;
}

const MyDropzone = ({
  theme,
  componentClass = '',
  componentStyle = {},
  onDrop,
  dropzoneConfig = {},
  maxFiles = 1,
  uploadedFiles = [],
  onRemove,
  onBrowseClick,
  dragDropLabel = 'Drag & drop or'
}: Props) => {

  const handleDrop = React.useCallback((files) => {
    if (files.length > 0) {
      onDrop(files);
    }
  }, [onDrop]);

  const { getRootProps, getInputProps, open: openFileSelection } = useDropzone({
    maxFiles,
    onDrop: handleDrop,
    noClick: true,
    ...dropzoneConfig,
  });

  const className = classNames(
    componentClass,
    theme.MyDropzone
  );

  return (
    <div className={className} style={componentStyle}>
      <div className={theme.dragAndDropWrap} {...getRootProps()}>
        <input {...getInputProps()} />
        <BodyText>
          {dragDropLabel} <Button componentSize="slim" plain onClick={onBrowseClick || openFileSelection}>browse</Button>
        </BodyText>
      </div>
      {uploadedFiles.length > 0 && <div className={theme.uploadedFileList}>
        {uploadedFiles.map((file, index) => {
          const { id, name, url, removable = true } = file;
          return (
            <div onClick={() => {
              if (url) {
                window.open(url, '_blank');
              }
            }}>
              <FlexBox componentClass={theme.fileRow} direction="Row" justify="SpaceBetween" key={id || index}>
                <BodyText componentClass={theme.fileName}>{name}</BodyText>
                {removable && <Button plain icon="cancelSmall" componentSize="slim" onClick={(event) => {
                  event.stopPropagation();
                  onRemove(file, index);
                }} />}
              </FlexBox>
            </div>
          );
        })
        }
      </div>
      }
    </div>
  );
};

export default themr(MYDROPZONE, baseTheme)(MyDropzone) as ThemedComponentClass<
  Props,
  {}
>;
