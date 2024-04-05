<script lang="ts">
    import { logout } from "../api";
    import ThemeSwitch from "./ThemeSwitch.svelte";
    import IconButton from "./IconButton.svelte";
    import Exit from "svelte-radix/Exit.svelte";

    export let displayLogout: boolean;
    export let handleLogout: () => void;
</script>

<div class="absolute top-0 right-1 grid grid-rows-2">
    <ThemeSwitch />
    {#if displayLogout}
        <IconButton on:click={handleLogout}>
            <Exit class="absolute h-[1.2rem] w-[1.2rem]" />
        </IconButton>
    {/if}
</div>
