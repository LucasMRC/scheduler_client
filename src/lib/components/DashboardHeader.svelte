<script lang="ts">
    export let user: User | null;
</script>

<header class="pb-10">
    <h5
        class="mb-3 capitalize text-base font-semibold text-gray-900 md:text-xl dark:text-white"
    >
        {user?.alias ?? "User"}
    </h5>
    <span class="text-gray-500 dark:text-gray-400">Así están las cosas</span>
</header>
