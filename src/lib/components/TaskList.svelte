<script lang="ts">
    import TaskCard from "./TaskCard.svelte";

    export let taskDate: string;
    export let tasks: Task[];
    export let filter: "pending" | "done" | "all" = "pending";

    $: tasksToDisplay = tasks.filter((task) => {
        if (filter === "all") return true;
        if (filter === "pending") return task.status !== "Completed";
        if (filter === "done") return task.status === "Completed";
        return false;
    });

</script>

{#if tasksToDisplay.length !== 0}
    <h2 class="text-lg font-semibold">{taskDate}</h2>
    <ul class="grid gap-1 grid-cols-2">
        {#each tasksToDisplay as task}
            <TaskCard {task} />
        {/each}
    </ul>
{/if}
