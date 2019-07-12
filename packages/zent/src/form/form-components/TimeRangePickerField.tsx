import * as React from 'react';
import { Omit } from 'utility-types';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  noopMapEventToValue,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import TimeRangePicker, {
  ITimeRangePickerProps,
} from '../../datetimepicker/TimeRangePicker';
import { FormField } from '../Field';

export interface IFormTimeRangePickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.RangeValue,
    Omit<ITimeRangePickerProps, 'value'>
  > {}

function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export const FormTimeRangePickerField: React.FunctionComponent<
  IFormTimeRangePickerFieldProps & IFormFieldModelProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    ITimeRangePickerProps
  >(props, dateDefaultValueFactory, noopMapEventToValue);
  return (
    <FormField ref={ref} {...props} error={error}>
      <TimeRangePicker {...props.props} {...childProps} />
    </FormField>
  );
};
