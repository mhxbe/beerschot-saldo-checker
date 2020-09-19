export async function getSaldo(cardNumber: string): Promise<string> {
  // const url = 'http://localhost:63218/?cardNo=';
  const url = 'https://mhx.be/beerschot-saldo-checker/api?cardNo=';
  return await (await fetch(`${url}${cardNumber}`)).json();
}
