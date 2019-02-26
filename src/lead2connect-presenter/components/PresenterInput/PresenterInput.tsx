import * as React from 'react';
import * as classnames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const PresenterInput = (props: Props) => {
  const { hasError, className, ...rest } = props;
  return (
    <input
      {...rest as any}
      className={classnames('input', className, {
        'input-has-errors': hasError
      })}
    />
  );
};
