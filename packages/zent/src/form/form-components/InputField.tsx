import * as React from 'react';
import { Omit } from 'utility-types';

import Input, { IInputProps, IInputClearEvent } from '../../input';
import {
  useField,
  IFormFieldModelProps,
  IFormComponentCommonProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormInputFieldProps
  extends IFormComponentCommonProps<
    string,
    Omit<IInputProps, 'value' | 'name' | 'defaultValue'>
  > {}

function mapInputEventToValue(
  e: IInputClearEvent | React.ChangeEvent<HTMLInputElement>
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
  return (
    <FormField ref={ref} {...props} error={error}>
      <Input {...props.props as any} {...childProps} />
    </FormField>
  );
};
