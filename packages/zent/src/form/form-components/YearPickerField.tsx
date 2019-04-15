import * as React from 'react';
import { Omit } from 'utility-types';
import { FormControl } from '../Control';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import YearPicker, { IYearPickerProps } from '../../datetimepicker/YearPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

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
      <YearPicker {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
