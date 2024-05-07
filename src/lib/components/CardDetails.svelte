<script lang="ts">
    import { Cross1 } from "svelte-radix";
    import IconButton from "./IconButton.svelte";
    import Store from "../../store";
    import { Input } from "./ui/input";
    import Select from "./Select.svelte";

    export let task: Task;
    export let handleCloseDetails: () => void;

    let cardData = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        recurring: task.recurring,
        assignedTo: task.assignedTo,
    };

    const userOptions = Store.getUsers().map((user) => ({
        value: user,
        label: user.alias,
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
    <Input
        type="date"
        class="text-xs text-thin"
        bind:value={cardData.dueDate}
    />
    <Select value={cardData.assignedTo} class="text-xs text-thin capitalize" options={userOptions}  />
</article>
