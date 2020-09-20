import * as React from 'react';
import * as queryString from 'query-string';

import { Input } from './Form.styles';

interface FormProps {
  id: string;
  cardNumber: string;
  changeCardNumber: React.Dispatch<React.SetStateAction<string>>;
  ref: any;
}

const Form: React.FC<FormProps> = React.forwardRef(function FormElement(
  { id, cardNumber = '', changeCardNumber },
  ref: any
) {
  function handleSubmit(
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
  ): void {
    event.preventDefault();
    const input = document.getElementById(
      `cardNumberInput-${id}`
    ) as HTMLInputElement;
    changeCardNumber(input.value);

    const parsedHash = queryString.parse(location.hash);
    const newHash = { ...parsedHash, [id]: input.value };
    if (!input.value) {
      delete newHash[id];
    }
    location.hash = queryString.stringify(newHash);
  }

  return (
    <form onSubmit={handleSubmit} id={id} ref={ref}>
      <Input
        defaultValue={cardNumber.toString()}
        type="number"
        id={`cardNumberInput-${id}`}
        placeholder="cashless-nummer"
        min="0"
      />
    </form>
  );
});

export default Form;
