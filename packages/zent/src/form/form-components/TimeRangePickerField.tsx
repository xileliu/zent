import * as React from 'react';
import { Omit } from 'utility-types';
import { FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import TimeRangePicker, {
  ITimeRangePickerProps,
} from '../../datetimepicker/TimeRangePicker';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

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
      <TimeRangePicker {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
