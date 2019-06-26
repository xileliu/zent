import * as React from 'react';
import { Omit } from 'utility-types';

import { IRadioGroupProps, RadioGroup, IRadioEvent } from '../../radio';
import {
  IFormFieldCommonProps,
  useField,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

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
  return renderField(
    props,
    error,
    ref,
    <RadioGroup {...props.props} {...childProps}>
      {props.children}
    </RadioGroup>
  );
}
