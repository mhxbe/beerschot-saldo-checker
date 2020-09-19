import * as React from 'react';
import { Helmet } from 'react-helmet';
import * as queryString from 'query-string';
import { Paragraph, Title, SubTitle } from './App.styles';
import Form from './common/Form';
import { getSaldo } from './api/index';

export const isValidCardNumber = (cardNumber: string): boolean => {
  return new RegExp(/^\d+$/).test(cardNumber);
};

const Home: React.FC = () => {
  const qs = queryString.parse(location.hash);
  const oldCardNumber = qs['1920'] as string;
  const newCardNumber = qs['2021'] as string;

  const [oldCard, setOldCard] = React.useState(oldCardNumber);
  const [newCard, setNewCard] = React.useState(newCardNumber);
  const [oldCardSaldo, setOldCardSaldo] = React.useState('');
  const [newCardSaldo, setNewCardSaldo] = React.useState('');

  React.useEffect(() => {
    if (!oldCard || !isValidCardNumber(oldCard)) {
      console.warn('Invalid card number provided for old card.');
      return;
    }
    async function fetchSaldo(): Promise<void> {
      const saldo = await getSaldo(oldCard);
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
      return setNewCardSaldo(saldo);
    }
    fetchSaldo();
  }, [newCard]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Met deze app kan je op snelle manier het saldo van je abonnementen raadplegen."
        />
      </Helmet>
      <Title>Check uw saldo</Title>
      <Paragraph>
        Voeg een abonnement toe om vervolgens het saldo te checken.
      </Paragraph>

      <SubTitle>Abonnement 2019-2020</SubTitle>
      <pre>{oldCardSaldo}</pre>
      <Form id="1920" cardNumber={oldCard} changeCardNumber={setOldCard} />

      <SubTitle>Abonnement 2020-2021</SubTitle>
      <Form id="2021" cardNumber={newCard} changeCardNumber={setNewCard} />
      <pre>{newCardSaldo}</pre>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id quaerat
        debitis recusandae quae sed natus dolores, quo ipsum quibusdam maiores
        amet. Voluptatum odio ab fugit nulla cupiditate excepturi necessitatibus
        distinctio?
      </Paragraph>
    </>
  );
};

export default Home;
