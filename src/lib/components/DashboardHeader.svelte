<script lang="ts">
    import IconButton from "./IconButton.svelte";
    import { Plus } from "svelte-radix";

    export let user: User | null;
    export let goToForm: () => void;

    function handleCreateTask() {
        goToForm();
    }
</script>

<header class="px-6 pt-4 pb-10 border-b border-solid border-black">
    <h5
        class="mb-3 capitalize text-base font-semibold text-gray-900 md:text-xl dark:text-white"
    >
        {user?.alias ?? "User"}
    </h5>
    <div class="flex justify-between">
        <h1 class="font-thin text-2xl">Your tasks</h1>
        <IconButton on:click={handleCreateTask}><Plus /></IconButton>
    </div>
</header>
