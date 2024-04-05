<script lang="ts">
    import * as Collapsible from "$lib/components/ui/collapsible";
    import TaskCard from "./TaskCard.svelte";

    export let taskDate: string;
    export let tasks: Task[];
    export let handleTaskMenu: (task: Task) => void;
</script>

<Collapsible.Root>
    <Collapsible.Trigger>
        <h3 class="font-semibold">{taskDate}</h3>
        <span class="text-gray-600">{tasks.length}</span>
    </Collapsible.Trigger>
    <Collapsible.Content>
        <ul class="my-4 space-y-3 p-3">
            {#each tasks as task}
                <TaskCard onClick={() => handleTaskMenu(task)} {task} />
            {/each}
        </ul>
    </Collapsible.Content>
</Collapsible.Root>
