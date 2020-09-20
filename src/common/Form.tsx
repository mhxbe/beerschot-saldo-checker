import * as React from 'react';
import * as queryString from 'query-string';

interface FormProps {
  id: string;
  cardNumber: string;
  changeCardNumber: React.Dispatch<React.SetStateAction<string>>;
  ref: any;
}

const Form: React.FC<FormProps> = React.forwardRef(
  ({ id, cardNumber = '', changeCardNumber }, ref: any) => {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();
      const input = document.getElementById(
        `cardNumberInput-${id}`
      ) as HTMLInputElement;
      changeCardNumber(input.value);
      const parsedHash = queryString.parse(location.hash);
      location.hash = queryString.stringify({
        ...parsedHash,
        [id]: input.value,
      });
    }

    return (
      <form onSubmit={handleSubmit} id={id} ref={ref}>
        <input
          defaultValue={cardNumber.toString()}
          type="number"
          id={`cardNumberInput-${id}`}
          placeholder="8-cijferige code"
          min="0"
        />
      </form>
    );
  }
);

export default Form;
