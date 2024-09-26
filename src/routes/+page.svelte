<script lang="ts">
    // ToDo
    // 1. If user is authenticated take them to dashboard
    let redirect: boolean = false;
    let redirectRoute: string = "/private/dashboard";

    if (redirect ) {
        window.location.href = redirectRoute;
    }
</script>

<h1>Welcome to Supabase!</h1>
