import { json } from '@sveltejs/kit';
import { Client } from 'square';
import { randomUUID } from 'crypto';

const { paymentsApi } = new Client({
  accessToken: import.meta.env.VITE_SQUARE_ACCESS_TOKEN,
  environment: 'sandbox' as any,
});

export async function POST({ request }) {
  const { locationId, sourceId, amount} = await request.json();
  try {
    const { result } = await paymentsApi.createPayment({
      locationId,
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount),
        currency: 'USD',
      },
    });
    console.log(result);
    return json(result);
  } catch (error) {
    console.log(error);
  }
}