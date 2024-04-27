<script lang="ts">
    import TaskCard from "./TaskCard.svelte";

    export let taskDate: string;
    export let tasks: Task[];
</script>

<span>{taskDate}</span>
<ul class="p-3 grid gap-1 grid-cols-2">
    {#each tasks as task}
        <TaskCard {task} />
    {/each}
</ul>
