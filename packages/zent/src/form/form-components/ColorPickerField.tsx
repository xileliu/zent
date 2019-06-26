import * as React from 'react';
import { Omit } from 'utility-types';
import ColorPicker, { IColorPickerProps } from '../../colorpicker';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  IFormComponentCommonProps,
  renderField,
} from '../shared';

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
  return renderField(
    props,
    error,
    ref,
    <ColorPicker {...props.props} {...passedProps} color={value} />
  );
};
