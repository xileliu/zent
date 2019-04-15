import * as React from 'react';
import { Omit } from 'utility-types';
import QuarterPicker, {
  IQuarterPickerProps,
  QuarterPickerValue,
} from '../../datetimepicker/QuarterPicker';
import { FormControl } from '../Control';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
  IFormComponentCommonProps,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormQuarterPickerFieldProps
  extends IFormComponentCommonProps<
    QuarterPickerValue,
    Omit<IQuarterPickerProps, 'value'>
  > {}

export const FormQuarterPickerField: React.FunctionComponent<
  IFormQuarterPickerFieldProps & IFormFieldCommonProps<QuarterPickerValue>
> = props => {
  const [childProps, { error }, ref] = useField<
    QuarterPickerValue,
    QuarterPickerValue,
    IQuarterPickerProps
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
      <QuarterPicker {...otherProps} {...childProps} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
