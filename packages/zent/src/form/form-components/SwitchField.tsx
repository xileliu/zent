import * as React from 'react';
import { Omit } from 'utility-types';
import Switch, { ISwitchProps } from '../../switch';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormField } from '../Field';

export interface IFormSwitchFieldProps
  extends IFormComponentCommonProps<boolean, Omit<ISwitchProps, 'checked'>> {}

export const FormSwitchField: React.FunctionComponent<
  IFormSwitchFieldProps & IFormFieldModelProps<boolean>
> = props => {
  const [{ value, ...childProps }, { error }, ref] = useField<
    boolean,
    boolean,
    ISwitchProps
  >(props, false, noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <Switch {...props.props} {...childProps} checked={value} />
    </FormField>
  );
};
