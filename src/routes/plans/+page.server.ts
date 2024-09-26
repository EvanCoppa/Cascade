import { PUBLIC_SQUAREUP_APP_ID } from '$env/static/public'
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'


 
export const load: PageServerLoad = async ({ locals: { supabase }, params }) => {
    // const { slug } = params;

    const data = await getData(supabase);

    return {
         ...data
    };
};

 async function getData(supabase: any) {
    const { data: servicePlans, error } = await supabase
        .from('serviceplans')
        .select('plan_id, plan_name, description, price, duration, features')
        .order('price');

    if (error) {
        console.error('Error fetching service plans:', error);
        return { servicePlans: [] };
    }

    return { servicePlans: servicePlans ?? [] };
}