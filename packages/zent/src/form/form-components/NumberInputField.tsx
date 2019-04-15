import * as React from 'react';
import { Omit } from 'utility-types';

import NumberInput, { INumberInputProps } from '../../number-input';
import { FormControl } from '../Control';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormNumberInputFieldProps
  extends IFormComponentCommonProps<
    string,
    Omit<INumberInputProps, 'value' | 'name'>
  > {}

export const FormNumberInputField: React.FunctionComponent<
  IFormNumberInputFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [childProps, { error }, ref] = useField<
    string,
    string,
    INumberInputProps
  >(props, '', noopMapEventToValue);
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
      <NumberInput {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
