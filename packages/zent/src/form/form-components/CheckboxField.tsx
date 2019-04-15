import * as React from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import { FormControl } from '../Control';
import {
  useField,
  defaultRenderError,
  IFormComponentCommonProps,
  IFormFieldModelProps,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormCheckboxFieldProps
  extends IFormComponentCommonProps<boolean, Omit<ICheckboxProps, 'checked'>> {}

function mapCheckboxEventToValue(e: ICheckboxEvent): boolean {
  return e.target.checked;
}

export const FormCheckboxField = (
  props: IFormCheckboxFieldProps & IFormFieldModelProps<boolean>
) => {
  const [{ value, ...passedProps }, { error }, ref] = useField(
    props,
    false,
    mapCheckboxEventToValue
  );
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
      className={cx(className)}
      style={style}
      label={label}
      invalid={!!error}
      required={required}
    >
      <Checkbox {...otherProps} {...passedProps} checked={value} />
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {renderError(error)}
    </FormControl>
  );
};
