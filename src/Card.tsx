import * as React from 'react';
import {
  StyledCard,
  CardBackgroundImage,
  Saldo,
  CashlessNumber,
  ButtonLink,
  NoCardNumberButton,
  NoInternet,
} from './App.styles';
import {
  ClearButton,
  FormWrapper,
  SubmitButton,
  Wrap,
  Label,
} from './common/Form.styles';

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
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);
  const [onLine, setOnLine] = React.useState(navigator.onLine);

  React.useEffect(() => {
    function updateOnlineStatus(): void {
      setOnLine(navigator.onLine);
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return function unsubscribe(): void {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  function submitForm(event: React.FormEvent): void {
    event.preventDefault();
    // Check if clear-form button is clicked
    if (event.currentTarget.classList.contains('clear-form')) {
      const input = document.getElementById(
        `cardNumberInput-${id}`
      ) as HTMLInputElement;
      input.value = '';
      // Clear localStorage saldo
      id === '1920'
        ? (localStorage.oldSaldo = '')
        : (localStorage.newSaldo = '');
    }
    formRef.current.dispatchEvent(new Event('submit'));
    const flipTimeout = setTimeout(() => {
      setIsFlipped(false);
      clearTimeout(flipTimeout);
    }, 125);
  }

  function flipAndFocus(): void {
    setIsFlipped(!isFlipped);
    document?.getElementById(`cardNumberInput-${id}`)?.focus();
  }

  return (
    <StyledCard isFlipped={isFlipped}>
      <CardBackgroundImage className="face" id={id} side="front" jpg={jpg}>
        {!isFlipped && number && (
          <>
            {saldo && <Saldo>{saldo}</Saldo>}
            <CashlessNumber>{number}</CashlessNumber>
            {onLine ? (
              <ButtonLink onClick={flipAndFocus}>
                wijzig cashless-nummer
              </ButtonLink>
            ) : (
              <NoInternet>Geen internet.</NoInternet>
            )}
          </>
        )}
        {onLine && !isFlipped && !number ? (
          <NoCardNumberButton onClick={flipAndFocus}>
            Cashless-nummer ingeven
          </NoCardNumberButton>
        ) : (
          <NoInternet>Gelieve verbinding te maken met internet.</NoInternet>
        )}
      </CardBackgroundImage>
      <CardBackgroundImage className="face face--back" id={id} side="back">
        <FormWrapper>
          <Label htmlFor={`cardNumberInput-${id}`}>Cashless nummer:</Label>
          <Wrap>
            {form}
            <SubmitButton onClick={submitForm}>Check</SubmitButton>
            <ClearButton className="clear-form" onClick={submitForm}>
              X
            </ClearButton>
          </Wrap>
        </FormWrapper>
      </CardBackgroundImage>
    </StyledCard>
  );
};

export default Card;
