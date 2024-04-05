<script lang="ts">
    import * as Card from "./ui/card";

    export let task: Task;
    export let onClick: () => void;
</script>

<li>
    <Card.Root>
        <Card.Header>
            <Card.Title>{task.title}</Card.Title>
        </Card.Header>
        <Card.Content></Card.Content>
        <Card.Footer></Card.Footer>
    </Card.Root>
</li>
