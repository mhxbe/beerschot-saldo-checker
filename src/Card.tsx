import * as React from 'react';
import {
  StyledCard,
  CardBackgroundImage,
  Saldo,
  CashlessNumber,
  ButtonLink,
} from './App.styles';
import { ClearButton, FormWrapper, SubmitButton } from './common/Form.styles';

interface CardProps {
  id: string;
  form: React.ReactElement;
  saldo?: string;
  number?: string;
  jpg?: boolean;
  formRef?: any;
}

const Card: React.FC<CardProps> = ({
  id,
  form,
  formRef,
  number,
  saldo,
  jpg,
}) => {
  const [isFlipped, setIsFlipped] = React.useState(!number);

  function submitForm(event: React.FormEvent): void {
    event.preventDefault();
    // Check if clear-form button is clicked
    if (event.currentTarget.classList.contains('clear-form')) {
      const input = document.getElementById(
        `cardNumberInput-${id}`
      ) as HTMLInputElement;
      input.value = '';
    }
    formRef.current.dispatchEvent(new Event('submit'));
    const flipTimeout = setTimeout(() => {
      setIsFlipped(false);
      clearTimeout(flipTimeout);
    }, 125);
  }

  return (
    <StyledCard isFlipped={isFlipped}>
      <CardBackgroundImage className="face" id={id} side="front" jpg={jpg}>
        {!isFlipped && number && (
          <>
            {saldo && <Saldo>{saldo}</Saldo>}
            <CashlessNumber>{number}</CashlessNumber>
            <ButtonLink onClick={() => setIsFlipped(true)}>
              wijzig cashless-nummer
            </ButtonLink>
          </>
        )}
      </CardBackgroundImage>
      <CardBackgroundImage className="face face--back" id={id} side="back">
        <FormWrapper>
          {form}
          <SubmitButton onClick={submitForm}>Check</SubmitButton>
          <ClearButton className="clear-form" onClick={submitForm}>
            X
          </ClearButton>
        </FormWrapper>
      </CardBackgroundImage>
    </StyledCard>
  );
};

export default Card;
// export default React.forwardRef((props: CardProps, ref) => (
//   <Card id={props.id} form={props.form} formRef={ref} />
// ));
