import * as React from 'react';
import { Helmet } from 'react-helmet';
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
          content="Met deze app kan je snel het saldo van je abonnementen raadplegen."
        />
      </Helmet>
      <Title>Beerschot Abo Saldo Checker</Title>
      <Paragraph>
        Geef je cashless-nummer in om je saldo te raadplegen.
      </Paragraph>

      <SubTitle>Abonnement 2019-2020</SubTitle>
      <Card
        id="2019-2020"
        saldo={oldCardSaldo}
        form={
          <Form id="1920" cardNumber={oldCard} changeCardNumber={setOldCard} />
        }
      />

      <SubTitle>Abonnement 2020-2021</SubTitle>
      <Card
        id="2020-2021"
        saldo={newCardSaldo}
        jpg
        form={
          <Form id="2021" cardNumber={newCard} changeCardNumber={setNewCard} />
        }
      />
    </>
  );
};

export default Home;
