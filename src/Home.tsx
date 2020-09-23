import * as React from 'react';
import * as queryString from 'query-string';
import { Paragraph, Title, SubTitle } from './App.styles';
import Form from './common/Form';
import { getSaldo } from './api/index';
import Card from './Card';

export const isValidCardNumber = (cardNumber: string): boolean => {
  return new RegExp(/^\d+$/).test(cardNumber);
};

const Home: React.FC = () => {
  const qs = queryString.parse(location.hash);
  const oldCardNumber = (qs['1920'] || localStorage.oldCard || '') as string;
  const newCardNumber = (qs['2021'] || localStorage.newCard || '') as string;

  const [oldCard, setOldCard] = React.useState(oldCardNumber);
  const [newCard, setNewCard] = React.useState(newCardNumber);
  const [oldCardSaldo, setOldCardSaldo] = React.useState(
    localStorage.oldSaldo || ''
  );
  const [newCardSaldo, setNewCardSaldo] = React.useState(
    localStorage.newSaldo || ''
  );

  React.useEffect(() => {
    if (!oldCard || !isValidCardNumber(oldCard)) {
      console.warn('Invalid card number provided for old card.');
      return;
    }
    async function fetchSaldo(): Promise<void> {
      const saldo = await getSaldo(oldCard);
      localStorage.oldSaldo = saldo;
      return setOldCardSaldo(saldo);
    }
    fetchSaldo();
  }, [oldCard]);

  React.useEffect(() => {
    if (!newCard || !isValidCardNumber(newCard)) {
      console.warn('Invalid card number provided for new card.');
      return;
    }
    async function fetchSaldo(): Promise<void> {
      const saldo = await getSaldo(newCard);
      localStorage.newSaldo = saldo;
      return setNewCardSaldo(saldo);
    }
    fetchSaldo();
  }, [newCard]);

  const formRef1 = React.useRef(null);
  const formRef2 = React.useRef(null);

  return (
    <>
      <Title>Beerschot Abo Saldo Checker</Title>
      <Paragraph>
        Geef je cashless-nummer in om je saldo te raadplegen.
      </Paragraph>

      <SubTitle>Abonnement 2019-2020</SubTitle>
      <Card
        id="1920"
        number={oldCard}
        saldo={oldCardSaldo}
        formRef={formRef1}
        form={
          <Form
            ref={formRef1}
            id="1920"
            cardNumber={oldCard}
            changeCardNumber={setOldCard}
          />
        }
      />

      <SubTitle>Abonnement 2020-2021</SubTitle>
      <Card
        id="2021"
        number={newCard}
        saldo={newCardSaldo}
        jpg
        formRef={formRef2}
        form={
          <Form
            ref={formRef2}
            id="2021"
            cardNumber={newCard}
            changeCardNumber={setNewCard}
          />
        }
      />
    </>
  );
};

export default Home;
