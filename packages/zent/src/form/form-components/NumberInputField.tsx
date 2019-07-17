import * as React from 'react';
import { Omit } from 'utility-types';

import NumberInput, { INumberInputProps } from '../../number-input';
import { IFormComponentProps } from '../shared';
import { FormField } from '../Field';

export type IFormNumberInputFieldProps = IFormComponentProps<
  number | string,
  Omit<INumberInputProps, 'value'>
>;

export const FormNumberInputField: React.FunctionComponent<
  IFormNumberInputFieldProps
> = props => {
  return (
    <FormField {...props} defaultValue={props.defaultValue || ''}>
      {childProps => <NumberInput {...props.props} {...childProps} />}
    </FormField>
  );
};
