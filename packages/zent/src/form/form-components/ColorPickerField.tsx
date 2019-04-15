import * as React from 'react';
import { Omit } from 'utility-types';
import ColorPicker, { IColorPickerProps } from '../../colorpicker';
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

export interface IFormColorPickerFieldProps
  extends IFormComponentCommonProps<string, Omit<IColorPickerProps, 'color'>> {}

export const FormColorPickerField: React.FunctionComponent<
  IFormColorPickerFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [{ value, ...passedProps }, { error }, ref] = useField<
    string,
    string,
    IColorPickerProps
  >(props, '', noopMapEventToValue);
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
      <ColorPicker {...otherProps} {...passedProps} color={value} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
