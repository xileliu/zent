import * as React from 'react';
import cx from 'classnames';
import {
  IForm,
  FormProvider,
  ValidateStrategy,
  useForm as superUseForm,
  FormStrategy,
  FormModel,
  useField,
  useFieldArray,
  useFieldSet,
  field,
  set,
  array,
  form,
} from 'formulr';
import { IZentFormContext, FormContext } from './context';

export interface IFormProps<T extends object = any>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  type: 'horizontal' | 'vertical';
  form: ZentForm<T>;
  scrollerRef?: React.RefObject<HTMLElement>;
}

function preventDefault(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

export class ZentForm<T extends object> implements IForm {
  constructor(
    readonly inner: IForm,
    readonly zentFormContext: IZentFormContext
  ) {}

  get ctx() {
    return this.inner.ctx;
  }

  get model() {
    return this.inner.model;
  }

  validate(strategy: ValidateStrategy = ValidateStrategy.IgnoreAsync) {
    this.inner.model.validate(strategy);
  }

  isValid() {
    return this.inner.model.isValid();
  }

  isValidating() {
    return this.inner.model.isValidating$.getValue();
  }

  getValue() {
    return this.inner.model.getRawValue();
  }

  initialize(value: T) {
    this.inner.model.initialize(value);
  }

  patchValue(value: T) {
    this.inner.model.patchValue(value);
  }

  resetValue() {
    this.inner.model.resetValue();
  }

  prepareSubmit(scrollToError = true): boolean {
    if (this.isValidating()) {
      return false;
    }
    this.validate(
      ValidateStrategy.IgnoreAsync | ValidateStrategy.IncludeUntouched
    );
    const isValid = this.isValid();
    if (isValid) {
      return true;
    }
    if (scrollToError) {
      const { children } = this.zentFormContext;
      for (let i = 0; i < children.length; i += 1) {
        const child = children[i];
        if (!child.isValid()) {
          child.scrollTo();
        }
      }
    }
    return false;
  }
}

export function useForm<T extends object = any>(
  arg: FormStrategy.View | (() => FormModel<T>)
) {
  const inner = superUseForm(arg);
  const zentFormContext = React.useMemo<IZentFormContext>(
    () => ({
      children: [],
    }),
    [inner]
  );
  return React.useMemo(() => new ZentForm(inner, zentFormContext), [inner]);
}

export interface IFormApi {
  useForm: typeof useForm;
  useField: typeof useField;
  useFieldArray: typeof useFieldArray;
  useFieldSet: typeof useFieldSet;
  field: typeof field;
  set: typeof set;
  array: typeof array;
  form: typeof form;
}

export const Form: React.ForwardRefExoticComponent<
  IFormProps & React.RefAttributes<HTMLFormElement>
> &
  IFormApi = React.forwardRef<HTMLFormElement, IFormProps>(
  (
    {
      children,
      className,
      form,
      type = 'vertical',
      onSubmit = preventDefault,
      scrollerRef,
      ...props
    },
    ref
  ) => {
    form.zentFormContext.scrollerRef = scrollerRef;
    return (
      <FormContext.Provider value={form.zentFormContext}>
        <FormProvider value={form.ctx}>
          <form
            ref={ref}
            {...props}
            className={cx(
              'zent-form',
              {
                'zent-form-vertical': type === 'vertical',
                'zent-form-horizontal': type === 'horizontal',
              },
              className
            )}
            onSubmit={onSubmit}
          >
            {children}
          </form>
        </FormProvider>
      </FormContext.Provider>
    );
  }
) as any;

Form.useForm = useForm;
Form.useField = useField;
Form.useFieldArray = useFieldArray;
Form.useFieldSet = useFieldSet;
Form.displayName = 'ZentForm';
Form.field = field;
Form.set = set;
Form.array = array;
Form.form = form;
