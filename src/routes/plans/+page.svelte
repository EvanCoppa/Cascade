<script>
  export let data;

  // first check if a user is signed in, if not all the button sshould you to the login page to create an account first

  // we have to check if the user already had a subscription and then modify the plans accordingly
</script>




<div class="flex"> 

<div class="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:mx-auto w-full lg:py-16">
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
    

     {#each data.servicePlans as plan}
     <div class="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm">
      <div class="p-6 sm:px-8">
        <h2 class="text-lg font-medium text-gray-900">
          {plan.plan_name}
          <span class="sr-only">Plan</span>
        </h2>

        <p class="mt-2 text-gray-700">{plan.description}</p>

        <p class="mt-2 sm:mt-4">
          <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> 20$ </strong>

          <span class="text-sm font-medium text-gray-700">/month</span>
        </p>

        <a
          class="mt-4 block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
          href="checkout/{plan.plan_id}"
        >
          Get Started
        </a>
      </div>

      <div class="p-6 sm:px-8">
        <p class="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

        <ul class="mt-2 space-y-2 sm:mt-4">
          {#each plan.features as feature}
          <li class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-indigo-700"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span class="text-gray-700"> {feature} </span>
          </li>
          {/each}

         
          

          
        </ul>
      </div>
    </div>
    {/each}
     

    
  </div>
</div>
</div>
