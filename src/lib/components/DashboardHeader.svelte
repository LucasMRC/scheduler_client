<script lang="ts">
    import IconButton from "./IconButton.svelte";
    import { Plus } from "svelte-radix";

    export let user: User | null;
    export let goToForm: () => void;
    export let updateFilter: (filter: "pending" | "done" | "all") => void;
    export let filter: "pending" | "done" | "all";

    function handleCreateTask() {
        goToForm();
    }
</script>

<header class="px-6 pt-4 border-b border-solid border-foreground">
    <h5
        class="mb-3 capitalize text-base font-semibold text-gray-900 md:text-xl dark:text-white"
    >
        {user?.alias ?? "User"}
    </h5>
    <div class="flex justify-between pb-4">
        <h1 class="font-thin text-2xl">Tus tareas</h1>
        <IconButton on:click={handleCreateTask}><Plus /></IconButton>
    </div>
    <ul class="flex gap-3">
        <li><button class={`${filter === 'pending' ? 'opacity-70' : ''}`} on:click={() => updateFilter('pending')}>Pendientes</button></li>
        <li><button class={`${filter === 'done' ? 'opacity-70' : ''}`} on:click={() => updateFilter('done')}>Hechas</button></li>
        <li><button class={`${filter === 'all' ? 'opacity-70' : ''}`} on:click={() => updateFilter('all')}>Todas</button></li>
    </ul>
</header>
