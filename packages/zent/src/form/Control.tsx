import * as React from 'react';
import cx from 'classnames';

import { Label } from './Label';

export interface IFormControlProps {
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  children?: React.ReactNode;
  required?: boolean;
  invalid?: boolean;
}

export const FormControl = React.forwardRef<HTMLDivElement, IFormControlProps>(
  ({ className, style, label, children, required, invalid }, ref) => {
    return (
      <div
        ref={ref}
        className={cx(
          'zent-form-control',
          {
            'has-error': invalid,
          },
          className
        )}
        style={style}
      >
        <Label required={required}>{label}</Label>
        <div className="zent-form-control-content">{children}</div>
      </div>
    );
  }
);

FormControl.displayName = 'ZentFormControl';
