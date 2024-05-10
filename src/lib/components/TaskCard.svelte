<script lang="ts">
    import IconButton from "./IconButton.svelte";
    import * as Card from "./ui/card";
    import { formatDate } from "../../utils/index";
    import Store from "../../store";
    import CardDetails from "./CardDetails.svelte";

    export let task: Task;

    let cardDetails: HTMLDetailsElement;

    function handleStatusChange(e: Event) {
        e.stopPropagation();
        Store.updateTask(
            task.id,
            { status: task.status === "Completed" ? "Pending" : "Completed" }
        );
    }

    function handleCloseDetails() {
        cardDetails.open = false;
    }
</script>

<li class="[&_div]:p-1">
    <details bind:this={cardDetails} class="select-none" name="card-details">
        <summary class="marker:content-['']">
            <Card.Root class="h-40">
                <Card.Header>
                    <div class="flex justify-between">
                        <IconButton
                            on:click={handleStatusChange}
                            class="border rounded"
                        >
                            {#if task.status === "Completed"}
                                Done!
                            {/if}
                        </IconButton>
                        <span class="text-thin text-xs text-right">
                            {formatDate(task.dueDate)}
                        </span>
                    </div>
                    <Card.Title tag="h5" class="font-normal"
                        >{task.title}</Card.Title
                    >
                </Card.Header>
                <Card.Content></Card.Content>
                <Card.Footer></Card.Footer>
            </Card.Root>
        </summary>
        <CardDetails {handleCloseDetails} {task} />
    </details>
</li>
