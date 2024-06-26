<script lang="ts">
    import Store from "../store";
    import LoadingState from "../lib/components/LoadingState.svelte";
    import { onMount } from "svelte";
    import { getTasks, logout } from "../lib/api";
    import TaskList from "../lib/components/TaskList.svelte";
    import TaskMenu from "../lib/components/TaskMenu.svelte";
    import DashboardHeader from "../lib/components/DashboardHeader.svelte";
    import { orderTasks } from "../utils/tasks";

    export let goToLogin: () => void;
    export let goToForm: () => void;

    let selectedTask: Task | null = null;
    let tasks: Record<string, Task[]> = {};
    let filter: "pending" | "done" | "all" = "pending";

    const userStore = Store.getUser();
    const user = $userStore;
    if (!user) {
        logout();
        goToLogin();
    }

    async function fetchTasks(): Promise<void> {
        try {
            const { tasks } = await getTasks();
            Store.setTasks(tasks);
        } catch (error) {
            console.error("Failed to fetch tasks: ", error);
            showToast("error", "Failed to fetch tasks");
        }
    }

    function updateFilter(newFilter: "pending" | "done" | "all"): void {
        filter = newFilter;
    }
    onMount(async () => {
        document.title = "Dashboard";
        if (!Store.getUsers().length) {
            Store.fetchUsers();
        }
        const tasksStore = Store.getTasks();
        tasksStore.subscribe((value) => {
            tasks = orderTasks(value);
            window._APP_STORE_.tasks = tasks;
        });
    });
</script>

<section class="w-full min-h-[100vh] shadow sm:p-6">
    <DashboardHeader {filter} {updateFilter} {goToForm} {user} />
    <button on:click={triggerNotification}>Trigger Notification</button>
    {#await fetchTasks()}
        <LoadingState />
    {:then _}
        {#if Object.keys(tasks).length > 0}
            <div class="rounded p-4 overflow-hidden grid gap-1">
                {#each Object.keys(tasks) as taskDate}
                    <TaskList {filter} {taskDate} tasks={tasks[taskDate]} />
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
    {/await}
</section>
