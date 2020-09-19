export async function getSaldo(cardNumber: string): Promise<string> {
  const url = 'https://mhx.be/beerschot-saldo-checker/api?cardNo=';
  return await (await fetch(`${url}${cardNumber}`)).json();
}
