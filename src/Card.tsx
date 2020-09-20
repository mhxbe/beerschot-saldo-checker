import * as React from 'react';
import { StyledCard, CardBackgroundImage, Saldo } from './App.styles';

interface CardProps {
  id: string;
  form: React.ReactElement;
  saldo?: string;
  jpg?: boolean;
}

const Card: React.FC<CardProps> = ({ id, form, saldo, jpg }) => {
  const [isFlipped /* setIsFlipped */] = React.useState(false);
  //   React.useEffect(() => {
  //     setInterval(() => {
  //       setIsFlipped(!isFlipped);
  //     }, 5000);
  //   });

  console.log('SALDO!', saldo);
  return (
    <StyledCard isFlipped={isFlipped}>
      <CardBackgroundImage className="face" id={id} side="front" jpg={jpg}>
        {!isFlipped && (
          <>
            {saldo && <Saldo saldo={saldo}>{saldo}</Saldo>}
            <span>Cashless number: xxxxxxxxx</span>
          </>
        )}
      </CardBackgroundImage>
      <CardBackgroundImage className="face face--back" id={id} side="back">
        {form}
      </CardBackgroundImage>
    </StyledCard>
  );
};

export default Card;
