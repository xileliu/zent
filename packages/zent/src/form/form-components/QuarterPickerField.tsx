import * as React from 'react';
import { Omit } from 'utility-types';
import QuarterPicker, {
  IQuarterPickerProps,
  QuarterPickerValue,
} from '../../datetimepicker/QuarterPicker';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

export interface IFormQuarterPickerFieldProps
  extends IFormComponentCommonProps<
    QuarterPickerValue,
    Omit<IQuarterPickerProps, 'value'>
  > {}

export const FormQuarterPickerField: React.FunctionComponent<
  IFormQuarterPickerFieldProps & IFormFieldCommonProps<QuarterPickerValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    QuarterPickerValue,
    QuarterPickerValue,
    IQuarterPickerProps
  >(props, [], noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <QuarterPicker {...props.props} {...childProps} />
  );
};
