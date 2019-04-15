import * as React from 'react';
import { Omit } from 'utility-types';
import { FormControl } from '../Control';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import WeekPicker, { IWeekPickerProps } from '../../datetimepicker/WeekPicker';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';
import { DatePickers } from '../../datetimepicker/common/types';

export interface IFormWeekPickerFieldProps
  extends IFormComponentCommonProps<
    DatePickers.RangeValue,
    Omit<IWeekPickerProps, 'value'>
  > {}

export const FormWeekPickerField: React.FunctionComponent<
  IFormWeekPickerFieldProps & IFormFieldCommonProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.RangeValue,
    DatePickers.RangeValue,
    IWeekPickerProps
  >(props, [], noopMapEventToValue);
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
      <WeekPicker {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
