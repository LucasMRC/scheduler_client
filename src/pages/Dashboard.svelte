<script lang="ts">
    import Store from "../store";
    import LoadingState from "../lib/components/LoadingState.svelte";
    import { onMount } from "svelte";
    import { getTasks, logout } from "../lib/api";
    import TaskList from "../lib/components/TaskList.svelte";
    import TaskMenu from "../lib/components/TaskMenu.svelte";
    import DashboardHeader from "../lib/components/DashboardHeader.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import { Plus } from "svelte-radix";

    export let goToLogin: () => void;
    export let goToForm: () => void;

    let selectedTask: Task | null = null;

    const user = Store.getUser();
    if (!user) {
        logout();
        goToLogin();
    }
    const tasks = fetchTasks();

    async function fetchTasks(): Promise<TaskGroup | never> {
        try {
            const { tasks } = await getTasks();
            Store.setTasks(tasks);
            return Store.getOrderedTasks();
        } catch {
            throw new Error("Failed to fetch tasks");
        }
    }

    onMount(async () => {
        document.title = "Dashboard";
        if (!Store.getUsers().length) {
            Store.fetchUsers();
        }
        window._APP_STORE_ = Store;
    });

    function handleTaskMenu(task: Task) {
        selectedTask = task;
    }

    function handleCreateTask() {
        goToForm();
    }
</script>

<section
    class="w-full min-h-[100vh] p-4 bg-white border border-gray-200 shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700"
>
    <DashboardHeader {user} />
    {#await tasks}
        <LoadingState />
    {:then tasks}
        {#if Object.keys(tasks).length > 0}
            <div class="rounded overflow-hidden grid gap-1">
                {#each Object.keys(tasks) as taskDate}
                    <TaskList
                        {taskDate}
                        tasks={tasks[taskDate]}
                        {handleTaskMenu}
                    />
                {/each}
            </div>
            {#if selectedTask}
                <TaskMenu
                    {selectedTask}
                    closeMenu={() => (selectedTask = null)}
                />
            {/if}
        {:else}
            <p>No tasks found</p>
        {/if}
        <IconButton on:click={handleCreateTask}><Plus /></IconButton>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</section>
