<script lang="ts">
    import { Cross1 } from "svelte-radix";
    import IconButton from "./IconButton.svelte";
    import Store from "../../store";

    export let task: Task;
    export let handleCloseDetails: () => void;

    let cardData = {
        title: task.title,
        description: task.description,
        due_date: task.dueDate,
        recurring: task.recurring,
        assigned_to: task.assignedTo,
    };

    const userOptions = Store.getUsers().map((user) => ({
        value: user,
        text: user.alias,
    }));
</script>

<article
    class="[&>*]:bg-transparent [&>textarea]:resize-none p-2 fixed auto-rows-min grid inset-0 bg-background px-4 py-6"
>
    <IconButton on:click={handleCloseDetails}>
        <Cross1 />
    </IconButton>
    <textarea
        class="font-thin text-2xl text-pretty"
        bind:value={cardData.title}
    />
    <textarea class="text-balance min-h-40" bind:value={cardData.description} />
    <input
        type="date"
        class="text-xs text-thin"
        bind:value={cardData.due_date}
    />
    <select class="text-xs text-thin" bind:value={cardData.assigned_to}>
        {#each userOptions as user}
            <option
                selected={task.assignedTo === user.value}
                value={user.value}
            >
                {user.text}
            </option>
        {/each}
    </select>
</article>
