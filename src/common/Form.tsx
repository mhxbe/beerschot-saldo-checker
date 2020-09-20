import * as React from 'react';
import * as queryString from 'query-string';

interface FormInterface {
  id: string;
  cardNumber: string;
  changeCardNumber: React.Dispatch<React.SetStateAction<string>>;
}

const Form: React.FC<FormInterface> = ({
  id,
  cardNumber = '',
  changeCardNumber,
}) => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const input = document.getElementById(
      `cardNumberInput-${id}`
    ) as HTMLInputElement;
    changeCardNumber(input.value);
    const parsedHash = queryString.parse(location.hash);
    location.hash = queryString.stringify({ ...parsedHash, [id]: input.value });
  }

  return (
    <form onSubmit={handleSubmit} id={id}>
      <input
        defaultValue={cardNumber.toString()}
        type="number"
        id={`cardNumberInput-${id}`}
        placeholder="8-cijferige code"
        min="0"
      />
      <button type="submit">Check</button>
    </form>
  );
};

export default Form;
