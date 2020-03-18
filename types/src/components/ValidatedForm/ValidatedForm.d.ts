import * as React from 'react';
export interface Props {
    form: {
        getFieldProps: any;
        getFieldError: any;
        validateFieldsAndScroll: any;
        validateFields(error?: any, values?: [React.FormEvent<any>]): any;
    };
    formId?: string;
    componentStyle?: React.CSSProperties;
    formFields: string[];
    onSubmit: (values: [React.FormEvent<any>]) => void;
    onSubmitError: (values: [React.FormEvent<any>], error: Error) => void;
    showError: boolean;
}
declare const _default: any;
export default _default;
