import * as React from 'react';
import { defaultRenderError, IFormFieldProps } from './shared';
import { FormControl } from './Control';
import { FormNotice } from './Notice';
import { FormDescription } from './Description';

export const FormField = React.forwardRef<HTMLDivElement, IFormFieldProps<any>>(
  (
    {
      className,
      style,
      label,
      required,
      helpDesc,
      notice,
      withoutError,
      before,
      after,
      error,
      children,
      renderError = defaultRenderError,
    },
    ref
  ) => {
    return (
      <FormControl
        ref={ref}
        className={className}
        style={style}
        label={label}
        required={required}
        invalid={!!error}
      >
        <div className="zent-form-control-content-inner">
          {before}
          {children}
          {after}
        </div>
        {!!notice && <FormNotice>{notice}</FormNotice>}
        {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
        {withoutError ? null : renderError(error)}
      </FormControl>
    );
  }
);

FormField.displayName = 'FormField';
