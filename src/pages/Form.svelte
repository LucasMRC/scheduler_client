<script lang="ts">
    import { createTask } from "../lib/api";
    import { onMount } from "svelte";
    import Store from "../store";
    import { get } from "svelte/store";
    import { showToast } from "../store/toast";

    export let goToDashboard: () => void;

    const users = Store.getUsers();
    const today = new Date().toISOString().split("T")[0];

    let title = "";
    let description = "";
    let status = "Pending";
    let periodicity = "Once";
    let dueDate = today;
    let assignee = "";

    onMount(() => {
        document.title = "Scheduler - Create Task";
    });

    async function submitForm(event: Event) {
        event.preventDefault();
        const task: TaskDTO = {
            id: "",
            title,
            description,
            recurring: periodicity,
            status: status as TaskStatus,
            dueDate,
            createdBy: get(Store.getUser()) ?? ({ email: assignee } as User),
            assignedTo: assignee,
        };
        try {
            await createTask(task);
            const assignedUser = users.find((user) => user.alias === assignee);
            if (!assignedUser) {
                throw new Error("Assinged user not found");
            }
            Store.saveTask({ ...task, assignedTo: assignedUser });
            showToast("success", "Task created successfully");
            goToDashboard();
        } catch (err) {
            if (err instanceof Error) {
                showToast("error", err.message);
            } else {
                showToast("error", "Error creating task");
            }
            console.error("Error creating task", err);
            goToDashboard();
        }
    }
</script>

<section class="grid place-items-center w-full h-[100vh] p-4 shadow sm:p-6">
    <form
        on:submit|preventDefault={submitForm}
        class="p-5 w-4/5 max-w-56 rounded grid gap-5 text-sm"
    >
        <label for="title"
            >Title
            <input
                type="text"
                bind:value={title}
                id="title"
                name="title"
                class="w-full p-2 border border-gray-400 rounded-md"
            />
        </label>
        <label for="password"
            >Description
            <textarea
                bind:value={description}
                id="description"
                name="description"
                class="w-full resize-none p-2 border border-gray-400 rounded-md"
            />
        </label>
        <label for="periodicity"
            >Periodicity
            <select
                id="periodicity"
                bind:value={periodicity}
                class="w-full p-2 border border-gray-400 rounded-md"
                name="status"
            >
                <option value="Once">No recurring</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
            </select>
        </label>
        <label for="status"
            >Status
            <select
                id="status"
                bind:value={status}
                class="w-full p-2 border border-gray-400 rounded-md"
                name="status"
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Done</option>
                <option value="Overdue">Overdue</option>
            </select>
        </label>
        <label for="due_date"
            >Due Date
            <input
                type="date"
                id="due_date"
                bind:value={dueDate}
                name="due_date"
                min={today}
                class="w-full p-2 border border-gray-400 rounded-md"
            />
        </label>
        <label for="assignee"
            >Assignee
            <select
                id="assignee"
                name="assignee"
                bind:value={assignee}
                class="w-full p-2 border border-gray-400 capitalize rounded-md"
            >
                {#each users as user}
                    <option class="capitalize" value={user.alias}
                        >{user.alias}</option
                    >
                {/each}
            </select>
        </label>
        <button type="submit">Create Task</button>
    </form>
</section>
