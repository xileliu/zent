import * as React from 'react';
import { Omit } from 'utility-types';

import NumberInput, { INumberInputProps } from '../../number-input';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormNumberInputFieldProps
  extends IFormComponentCommonProps<string, Omit<INumberInputProps, 'value'>> {}

export const FormNumberInputField: React.FunctionComponent<
  IFormNumberInputFieldProps & IFormFieldModelProps<string>
> = props => {
  const [childProps, { error }, ref] = useField<
    string,
    string,
    INumberInputProps
  >(props, '', noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <NumberInput {...props.props} {...childProps} />
    </FormField>
  );
};
