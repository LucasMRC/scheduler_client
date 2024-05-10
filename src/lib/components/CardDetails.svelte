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

    const selectedUser = userOptions.find(
        (val) => val.label === cardData.assignedTo.alias
    )!;

    function closeDetails() {
        let updatedFlag = false;
        for (const key in cardData) {
            // @ts-ignore
            if (task[key] !== cardData[key]) {
                updatedFlag = true;
            }
        }
        if (updatedFlag) {
            Store.updateTask(task.id, cardData);
        }
        handleCloseDetails();
    }
</script>

<article
    class="fixed inset-0 bg-transparent px-4 py-6 [&>div.details-container]:p-9"
>
    <IconButton on:click={closeDetails} class="border border-gray-300 mb-2 bg-background">
        <Cross1 />
    </IconButton>
    <div class="details-container [&>*]:bg-transparent bg-background grid autor-rows-min border border-gray-300 rounded [&>textarea]:resize-none">
        <span class="text-sm">Título:</span>
        <textarea
            class="outline-none font-thin text-2xl text-pretty"
            bind:value={cardData.title}
        />
        <span class="text-sm">Descripción:</span>
        <textarea class="text-balance outline-none min-h-40" bind:value={cardData.description} />
        <span class="text-sm">Fecha límite:</span>
        <Input
            type="date"
            class="w-[50%] text-xs text-thin outline-none mb-3"
            bind:value={cardData.dueDate}
        />
        <span class="text-sm">Asignado a:</span>
        <Select value={selectedUser} class="w-[50%] text-xs text-thin capitalize" options={userOptions}  />
    </div>
</article>
