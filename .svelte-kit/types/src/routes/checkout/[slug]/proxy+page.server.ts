// @ts-nocheck
import { PUBLIC_SQUAREUP_APP_ID } from '$env/static/public'
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'


 
export const load = async ({ locals: { supabase }, params }: Parameters<PageServerLoad>[0]) => {
    const id = params.slug;
    console.log(id);
    const data = await getData(supabase, Number(id));

    return {
         ...data
    };
};

async function getData(supabase: any, planId: number) {
    const { data: servicePlan, error } = await supabase
        .from('serviceplans')
        .select('plan_name, description, price, duration')
        .eq('plan_id', planId)
        .single(); // Fetches a single record

    if (error) {
        console.error('Error fetching service plan:', error);
        return { servicePlan: null };
    }

    return { servicePlan };
}