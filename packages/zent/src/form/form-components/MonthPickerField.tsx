import * as React from 'react';
import { Omit } from 'utility-types';
import MonthPicker, {
  IMonthPickerProps,
} from '../../datetimepicker/MonthPicker';
import { FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

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
      <MonthPicker {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
