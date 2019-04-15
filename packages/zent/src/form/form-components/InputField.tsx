import * as React from 'react';
import { Omit } from 'utility-types';

import { FormControl } from '../Control';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';
import Input, { IInputProps, IInputChangeEvent } from '../../input';
import {
  useField,
  IFormFieldModelProps,
  IFormComponentCommonProps,
  defaultRenderError,
} from '../shared';

export interface IFormInputFieldProps
  extends IFormComponentCommonProps<
    string,
    Omit<IInputProps, 'value' | 'name' | 'defaultValue'>
  > {}

function mapInputEventToValue(
  e: IInputChangeEvent | React.ChangeEvent<HTMLInputElement>
): string {
  return e.target.value || '';
}

export const FormInputField: React.FunctionComponent<
  IFormInputFieldProps & IFormFieldModelProps<string>
> = props => {
  const [childProps, { error }, ref] = useField(
    props,
    '',
    mapInputEventToValue
  );
  const {
    className,
    style,
    label,
    renderError = defaultRenderError,
    required,
    helpDesc,
    notice,
    props: otherProps,
  } = props;
  return (
    <FormControl
      ref={ref as any}
      className={className}
      style={style}
      label={label}
      required={required}
      invalid={!!error}
    >
      <Input {...otherProps as any} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
