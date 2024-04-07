<script lang="ts">
    import TaskCard from "./TaskCard.svelte";

    export let tasks: Task[];
    export let refreshTasks: () => void;
</script>

<ul class="p-3 grid grid-cols-2">
    {#each tasks as task}
        <TaskCard {task} {refreshTasks}/>
    {/each}
</ul>
