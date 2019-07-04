import { useMemo, useReducer } from 'react';
import * as Events from 'eventemitter3';
import {
  IForm,
  ValidateStrategy,
  FieldSetValue,
  useForm as superUseForm,
  FormStrategy,
  FormModel,
} from 'formulr';

export interface IFormEventMap {
  submit: React.SyntheticEvent | undefined;
  'submit-start': void;
  'submit-stop': void;
}

export type IFormAction =
  | {
      type: 'SUBMIT_START';
    }
  | {
      type: 'SUBMIT_STOP';
    };

export interface IFormState {
  submitting: boolean;
}

const initialState: IFormState = {
  submitting: false,
};

function formReducer(state: IFormState, action: IFormAction): IFormState {
  switch (action.type) {
    case 'SUBMIT_START':
      return {
        ...state,
        submitting: true,
      };
    case 'SUBMIT_STOP':
      return {
        ...state,
        submitting: false,
      };
    default:
      return state;
  }
}

export interface IFormEvents {
  emit<Type extends keyof IFormEventMap>(
    name: Type,
    arg: IFormEventMap[Type]
  ): void;
  on<Type extends keyof IFormEventMap>(
    name: Type,
    listener: (arg: IFormEventMap[Type]) => void
  ): void;
  off<Type extends keyof IFormEventMap>(
    name: Type,
    listener: (arg: IFormEventMap[Type]) => void
  ): void;
  once<Type extends keyof IFormEventMap>(
    name: Type,
    listener: (arg: IFormEventMap[Type]) => void
  ): void;
  removeAllListeners<Type extends keyof IFormEventMap>(name: Type): void;
}

export class ZentForm<T> implements IForm<T> {
  events: IFormEvents = new Events();

  /** @internal */
  constructor(
    readonly inner: IForm<T>,
    /** @internal */
    public state: IFormState,
    /** @internal */
    private dispatch: (action: IFormAction) => void
  ) {}

  get isSubmitting() {
    return this.state.submitting;
  }

  get ctx() {
    return this.inner.ctx;
  }

  get model() {
    return this.inner.model;
  }

  /**
   * ```jsx
   *  <button onClick={form.submit}>submit</button>
   * ```
   */
  submit = (e?: React.SyntheticEvent) => {
    this.events.emit('submit', e);
  };

  validate(strategy: ValidateStrategy = ValidateStrategy.IgnoreAsync) {
    this.inner.model.validate(strategy);
  }

  isValid() {
    return this.inner.model.valid();
  }

  isValidating() {
    return this.inner.model.isValidating$.getValue();
  }

  getValue() {
    return this.inner.model.getRawValue();
  }

  initialize(value: FieldSetValue<T>) {
    this.inner.model.initialize(value);
  }

  patchValue(value: FieldSetValue<T>) {
    this.inner.model.patchValue(value);
  }

  resetValue() {
    this.inner.model.reset();
  }

  submitStart() {
    this.dispatch({
      type: 'SUBMIT_START',
    });
  }

  submitStop() {
    this.dispatch({
      type: 'SUBMIT_STOP',
    });
  }

  // prepareSubmit(scrollToError = true): boolean {
  //   if (this.isValidating()) {
  //     return false;
  //   }
  //   this.validate(
  //     ValidateStrategy.IgnoreAsync | ValidateStrategy.IncludeUntouched
  //   );
  //   const isValid = this.isValid();
  //   if (isValid) {
  //     return true;
  //   }
  //   if (scrollToError) {
  //     for (let i = 0; i < this.children.length; i += 1) {
  //       const child = this.children[i];
  //       if (!child.valid()) {
  //         // child.scrollTo();
  //       }
  //     }
  //   }
  //   return false;
  // }
}

export function useForm<T>(arg: FormStrategy.View | (() => FormModel<T>)) {
  const inner = superUseForm(arg);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const form = useMemo(() => new ZentForm(inner, state, dispatch), [inner]);
  form.state = state;
  return form;
}
