<script lang="ts">
    import { onMount } from "svelte";
    import { login, signup } from "../lib/api";
    import Store from "../store";
    import { showToast } from "../store/toast";
    import { Button } from "../lib/components/ui/button";
    import { Input } from "../lib/components/ui/input";
    import { Checkbox } from "../lib/components/ui/checkbox";

    export let goToDashboard: () => void;

    let name = "";
    let email = "";
    let pass = "";
    let showPassword = false;

    let action = "login";

    onMount(() => {
        document.title = "Scheduler - Login";
    });

    function handlePasswordChange(event: Event) {
        pass = (event.target as HTMLInputElement).value;
    }

    async function handleSubmit(e: Event) {
        e.preventDefault();
        try {
            const request = action === "login" ? async () => await login(name, pass) : async () => await signup(name, email, pass);
            const user = await request();
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
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
            handleSubmit(e);
        }
    }

    function toggleActionForms() {
        action = action === "login" ? "sign up" : "login";
        email = "";
    }
</script>

<section
    class="grid place-items-center w-full h-[100vh] p-4 shadow sm:p-6 gap-2"
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
            />
        </label>
        {#if action === "sign up"}
            <label for="email" class="pb-4 block"
                >Email
                <Input type="Email" bind:value={email} id="email" name="email" />
            </label>
        {/if}
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
        <Button class="capitalize" on:click={handleSubmit}>{action}</Button>
    </form>
    <div>
        <p class="text-center">
            {action === "login"
                ? "You don't have an account yet?"
                : "Already have an account?"}
        </p>
        <button
            on:click={toggleActionForms}
            class="border-none bg-transparent w-full outline-none select-none"
        >
            <span class="w-full underline block text-blue-300 text-center"
                >{action === "login" ? "Sign up" : "Log in"}</span
            >
        </button>
    </div>
</section>
