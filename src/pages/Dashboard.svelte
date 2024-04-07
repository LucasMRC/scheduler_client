<script lang="ts">
    import Store from "../store";
    import LoadingState from "../lib/components/LoadingState.svelte";
    import { onMount } from "svelte";
    import { getTasks, logout } from "../lib/api";
    import TaskList from "../lib/components/TaskList.svelte";
    import TaskMenu from "../lib/components/TaskMenu.svelte";
    import DashboardHeader from "../lib/components/DashboardHeader.svelte";

    export let goToLogin: () => void;
    export let goToForm: () => void;

    let selectedTask: Task | null = null;

    const user = Store.getUser();
    if (!user) {
        logout();
        goToLogin();
    }

    async function fetchTasks(): Promise<TaskGroup | never> {
        try {
            const { tasks } = await getTasks();
            Store.setTasks(tasks);
            return Store.getOrderedTasks();
        } catch {
            throw new Error("Failed to fetch tasks");
        }
    }

    function refreshTasks() {
        
        window._APP_STORE_ = Store;
    }

    onMount(async () => {
        document.title = "Dashboard";
        if (!Store.getUsers().length) {
            Store.fetchUsers();
        }
        await fetchTasks();
        refreshTasks();
    });
</script>

<section class="w-full min-h-[100vh] shadow sm:p-6">
    <DashboardHeader {goToForm} {user} />
    {#await fetchTasks()}
        <LoadingState />
    {:then tasks}
        {#if Object.keys(tasks).length > 0}
            <div class="rounded p-4 overflow-hidden grid gap-1">
                {#each Object.keys(tasks) as taskDate}
                    <TaskList {refreshTasks} tasks={tasks[taskDate]} />
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
    {:catch error}
        <p>{error.message}</p>
    {/await}
</section>
