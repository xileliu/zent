import * as React from 'react';
import { Omit } from 'utility-types';
import Switch, { ISwitchProps } from '../../switch';
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
      <Switch {...otherProps} {...childProps} checked={value} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
