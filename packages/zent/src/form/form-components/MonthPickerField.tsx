import * as React from 'react';
import { Omit } from 'utility-types';
import MonthPicker, {
  IMonthPickerProps,
} from '../../datetimepicker/MonthPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

export interface IFormMonthPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<IMonthPickerProps, 'value'>
  > {}

export const FormMonthPickerField: React.FunctionComponent<
  IFormMonthPickerFieldProps & IFormFieldCommonProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    IMonthPickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <MonthPicker {...props.props} {...childProps} />
  );
};
