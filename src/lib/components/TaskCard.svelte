<script lang="ts">
    import IconButton from "./IconButton.svelte";
    import * as Card from "./ui/card";
    import { formatDate } from "../../utils/index";
    import Store from "../../store";

    export let task: Task;
    export let refreshTasks: () => void;

    function handleStatusChange() {
        Store.updateTaskStatus(
            task.id,
            task.status === "Done" ? "Pending" : "Done",
        );
        refreshTasks();
    }
</script>

<li class="[&_div]:p-1">
    <Card.Root class="h-40">
        <Card.Header>
            <div class="flex justify-between">
                <IconButton
                    on:click={handleStatusChange}
                    class="border rounded"
                >
                    {#if task.status === "Done"}
                        Done!
                    {/if}
                </IconButton>
                <span class="text-xs text-right">
                    {formatDate(task.dueDate)}
                </span>
            </div>
            <Card.Title tag="h5">{task.title}</Card.Title>
        </Card.Header>
        <Card.Content></Card.Content>
        <Card.Footer></Card.Footer>
    </Card.Root>
</li>
