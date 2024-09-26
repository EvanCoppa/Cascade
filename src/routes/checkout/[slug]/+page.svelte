<script lang="ts">
    export let data;
    const appId = 'sandbox-sq0idb-7a4C47FOKIzSfRk2SVInPQ';
    const locationId = 'LNSZV1TWFF8YH';
    const plan = data.servicePlan;

    console.log(data);
 
    let card;
  
     async function initializePaymentForm() {
      // @ts-ignore
      if (!Square) {
        throw new Error('Square.js failed to load properly');
      }
      // @ts-ignore
      const payments = Square.payments(appId, locationId);
      try {
        card = await payments.card();
        await card.attach('#card-container');
      } catch (e) {
        console.error('Initializing Card failed', e);
        return;
      }
    }
 
async function tokenize(paymentMethod) {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === 'OK') {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }
    throw new Error(errorMessage);
  }
}


async function handlePaymentMethodSubmission() {
  try {
    const token = await tokenize(card)
    const paymentResponse = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        sourceId: token,
        amount: 100,
      }),
    })
  } catch (e) {
    const error = e as Error;
     console.error(error.message)
  }
}
  </script>
<form on:submit|preventDefault={handlePaymentMethodSubmission} class="md:max-w-md  md:mx-auto mt-10">
    {#await initializePaymentForm()}
      <p>Loading...</p>
    {:catch error}
      <p>{error}</p>
    {/await}
    <h1>{plan.plan_name}</h1>
    <p>{plan.description}</p>
    <p>${plan.price}</p>
    <div id="card-container" />
    <button class="w-full bg-blue-500 text-white p-2 rounded-md">Pay $1.00</button>
  </form>

  <style>
    #payment-status-container {
  width: fit-content;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background: #1a1a1a;
  display: flex;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 36px;
}
  </style>