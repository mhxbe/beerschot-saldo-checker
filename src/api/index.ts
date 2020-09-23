export async function getSaldo(cardNumber: string): Promise<string> {
  let url = `/api/?cardNo=`;
  if (
    process.env.NODE_ENV === 'development' ||
    location.hostname === 'localhost'
  ) {
    url = `http://localhost:57888${url}`;
  }
  return await (await fetch(`${url}${cardNumber}`)).json();
}
