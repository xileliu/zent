import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormComponentCommonProps,
  renderField,
} from '../shared';
import DateRangePicker, {
  IDateRangePickerProps,
} from '../../datetimepicker/DateRangePicker';

export interface IFormDateRangePickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.RangeValue,
    Omit<IDateRangePickerProps, 'value'>
  > {}

function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export const FormDateRangePickerField: React.FunctionComponent<
  IFormDateRangePickerFieldProps & IFormFieldCommonProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    IDateRangePickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <DateRangePicker {...props.props} {...childProps} />
  );
};
