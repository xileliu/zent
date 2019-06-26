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
import TimeRangePicker, {
  ITimeRangePickerProps,
} from '../../datetimepicker/TimeRangePicker';

export interface IFormTimeRangePickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.RangeValue,
    Omit<ITimeRangePickerProps, 'value'>
  > {}

function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export const FormTimeRangePickerField: React.FunctionComponent<
  IFormTimeRangePickerFieldProps & IFormFieldCommonProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    ITimeRangePickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return renderField(
    props,
    error,
    ref,
    <TimeRangePicker {...props.props} {...childProps} />
  );
};
