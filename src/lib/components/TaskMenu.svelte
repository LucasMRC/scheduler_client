<script lang="ts">
    import { deleteTask, updateTask, completeTask } from "../api";
    import { showToast } from "../../store";

    export let selectedTask: Task;
    export let closeMenu: () => void;

    function markTaskAsDone() {
        try {
            completeTask(selectedTask);
            closeMenu();
            showToast("success", "Task done");
        } catch (error) {
            showToast("error", "An error occurred");
            console.error(error);
        }
    }

    function handleEditTask() {
        try {
            updateTask(selectedTask);
            closeMenu();
            showToast("success", "Task updated");
        } catch (error) {
            showToast("error", "An error occurred");
            console.error(error);
        }
    }

    function handleDeleteTask() {
        try {
            deleteTask(selectedTask);
            closeMenu();
            showToast("success", "Task deleted");
        } catch (error) {
            showToast("error", "An error occurred");
            console.error(error);
        }
    }
</script>

<menu
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
>
    <div
        class="relative w-80 p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
    >
        <h5 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            {selectedTask.title}
        </h5>
        <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
            {selectedTask.description}
        </p>
        <div class="grid">
            <button
                on:click={handleDeleteTask}
                class="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:bg-red-600"
            >
                Delete
            </button>
            <button
                on:click={handleEditTask}
                class="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:bg-blue-600"
            >
                Edit
            </button>
            <button
                on:click={markTaskAsDone}
                class="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:bg-green-600"
            >
                Done
            </button>
        </div>
    </div>
</menu>
