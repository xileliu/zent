import * as React from 'react';
import { Omit } from 'utility-types';

import { IRadioGroupProps, RadioGroup, IRadioEvent } from '../../radio';
import {
  IFormFieldCommonProps,
  useField,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import { FormControl } from '../Control';
import { FormNotice } from '../Notice';
import { FormDescription } from '../Description';

export interface IFormRadioGroupFieldProps<T>
  extends IFormComponentCommonProps<T, Omit<IRadioGroupProps, 'value'>> {
  children?: React.ReactNode;
}

function mapRadioEvent(e: IRadioEvent) {
  return e.target.value;
}

export function FormRadioGroupField<T>(
  props: IFormRadioGroupFieldProps<T> & IFormFieldCommonProps<T>
) {
  const [childProps, { error }, ref] = useField(props, '', mapRadioEvent);
  const {
    className,
    style,
    label,
    renderError = defaultRenderError,
    required,
    helpDesc,
    notice,
    children,
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
      <RadioGroup {...otherProps} {...childProps}>
        {children}
      </RadioGroup>
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
}
