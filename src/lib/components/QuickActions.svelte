<script lang="ts">
    import ThemeSwitch from "./ThemeSwitch.svelte";
    import IconButton from "./IconButton.svelte";
    import Exit from "svelte-radix/Exit.svelte";

    export let displayLogout: boolean;
    export let handleLogout: () => void;
</script>

<div class="absolute top-4 right-6 grid grid-cols-2">
    <ThemeSwitch />
    {#if displayLogout}
        <IconButton on:click={handleLogout}>
            <Exit class="absolute h-[1.2rem] w-[1.2rem]" />
        </IconButton>
    {/if}
</div>
