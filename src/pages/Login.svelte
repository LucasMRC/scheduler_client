<script lang="ts">
    import { onMount } from "svelte";
    import { login } from "../lib/api";
    import Store from "../store";
    import { showToast } from "../store/toast";
    import { Button } from "../lib/components/ui/button";
    import { Input } from "../lib/components/ui/input";
    import { Checkbox } from "../lib/components/ui/checkbox";

    export let goToDashboard: () => void;

    let name = "";
    let pass = "";
    let showPassword = false;

    onMount(() => {
        document.title = "Scheduler - Login";
    });

    function handlePasswordChange(event: Event) {
        pass = (event.target as HTMLInputElement).value;
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        try {
            const user = await login(name, pass);
            Store.saveUser(user);
            goToDashboard();
        } catch (err) {
            if (err instanceof Error) {
                showToast("error", err.message);
            } else {
                showToast("error", "Error logging in");
            }
            console.error("Error logging in", err);
        }
    }

    function handleKeyPress(e: KeyboardEvent) {
        if (e.key === "Enter") handleSubmit(e);
    }
</script>

<section
    class="grid place-items-center w-full h-[100vh] p-4 bg-slate-200 border border-gray-400 shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 gap-2"
>
    <form
        class="bg-gray-50 dark:bg-gray-950 py-5 px-10 w-72 rounded grid gap-5 text-sm"
    >
        <h1 class="text-xl font-bold text-center">Scheduler</h1>
        <label for="username" class="pb-4 block"
            >Username
            <Input
                type="text"
                bind:value={name}
                id="username"
                name="username"
                autocomplete="given-name"
                on:keypress={handleKeyPress}
            />
        </label>
        <label for="password" class="pb-4 block"
            >Password
            <Input
                type={showPassword ? "text" : "password"}
                autocomplete="current-password"
                value={pass}
                on:change={handlePasswordChange}
                id="passowrd"
                name="passowrd"
                on:keypress={handleKeyPress}
            />
        </label>
        <label
            for="show-password"
            class="grid gap-2 grid-flow-col-dense items-center"
        >
            <Checkbox id="show-password" bind:checked={showPassword} />Show
            password
        </label>
        <Button on:click={handleSubmit}>Login</Button>
    </form>
</section>
