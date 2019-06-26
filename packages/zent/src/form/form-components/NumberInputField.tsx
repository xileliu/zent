import * as React from 'react';
import { Omit } from 'utility-types';

import NumberInput, { INumberInputProps } from '../../number-input';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

export interface IFormNumberInputFieldProps
  extends IFormComponentCommonProps<string, Omit<INumberInputProps, 'value'>> {}

export const FormNumberInputField: React.FunctionComponent<
  IFormNumberInputFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [childProps, { error }, ref] = useField<
    string,
    string,
    INumberInputProps
  >(props, '', noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <NumberInput {...props.props} {...childProps} />
  );
};
