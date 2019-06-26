import * as React from 'react';
import { Omit } from 'utility-types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  IFormComponentCommonProps,
  renderField,
} from '../shared';
import YearPicker, { IYearPickerProps } from '../../datetimepicker/YearPicker';
import { DatePickers } from '../../datetimepicker/common/types';

export interface IFormYearPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<IYearPickerProps, 'value'>
  > {}

export const FormYearPickerField: React.FunctionComponent<
  IFormYearPickerFieldProps & IFormFieldCommonProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    IYearPickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <YearPicker {...props.props} {...childProps} />
  );
};
