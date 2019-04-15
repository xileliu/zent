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
import DateRangePicker, {
  IDateRangePickerProps,
} from '../../datetimepicker/DateRangePicker';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

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
      <DateRangePicker {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
