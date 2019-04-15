import * as React from 'react';
import { Omit } from 'utility-types';
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
import TimePicker, { ITimePickerProps } from '../../datetimepicker/TimePicker';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormTimePickerField
  extends IFormComponentCommonProps<
    DatePickers.Value,
    Omit<ITimePickerProps, 'value'>
  > {}

export const FormTimePickerField: React.FunctionComponent<
  IFormTimePickerField & IFormFieldCommonProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField<
    DatePickers.Value,
    DatePickers.Value,
    ITimePickerProps
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
      <TimePicker {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
