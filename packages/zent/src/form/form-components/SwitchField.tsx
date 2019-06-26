import * as React from 'react';
import { Omit } from 'utility-types';
import Switch, { ISwitchProps } from '../../switch';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

export interface IFormSwitchFieldProps
  extends IFormComponentCommonProps<boolean, Omit<ISwitchProps, 'checked'>> {}

export const FormSwitchField: React.FunctionComponent<
  IFormSwitchFieldProps & IFormFieldCommonProps<boolean>
> = props => {
  const [{ value, ...childProps }, { error }, ref] = useField<
    boolean,
    boolean,
    ISwitchProps
  >(props, false, noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <Switch {...props.props} {...childProps} checked={value} />
  );
};
