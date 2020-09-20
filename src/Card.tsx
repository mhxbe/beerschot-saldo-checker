import * as React from 'react';
import {
  StyledCard,
  CardBackgroundImage,
  Saldo,
  CashlessNumber,
  ButtonLink,
} from './App.styles';

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
  const [isFlipped, setIsFlipped] = React.useState(false);
  React.useEffect(() => {
    // nothing
  }, [saldo]);

  function submitForm(event: React.FormEvent): void {
    event?.preventDefault();
    formRef.current.dispatchEvent(new Event('submit'));
    setIsFlipped(false);
  }

  console.log('SALDO!', saldo);
  return (
    <StyledCard isFlipped={isFlipped}>
      <CardBackgroundImage className="face" id={id} side="front" jpg={jpg}>
        {!isFlipped && (
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
        {form}
        <button onClick={submitForm}>Check</button>
      </CardBackgroundImage>
    </StyledCard>
  );
};

export default Card;
// export default React.forwardRef((props: CardProps, ref) => (
//   <Card id={props.id} form={props.form} formRef={ref} />
// ));
