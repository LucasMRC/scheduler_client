<script lang="ts">
    import { slide } from "svelte/transition";
    import { expoOut } from "svelte/easing";

    export let type: "success" | "warning" | "error" | "info" = "info";
    export let message = "";

    const Types = {
        success: {
            background: "bg-green-200",
            border: "border-[#a1dbb8]",
            "border-dark": "dark:border-[#0c622e]",
            text: "text-green-700",
            "text-dark": "dark:text-green-200",
            "background-dark": "dark:bg-green-600",
        },
        warning: {
            background: "bg-yellow-200",
            border: "border-[#a1dbb8]",
            "border-dark": "dark:border-[#2e2005]",
            text: "text-yellow-700",
            "text-dark": "dark:text-yellow-200",
            "background-dark": "dark:bg-yellow-600",
        },
        error: {
            background: "bg-red-200",
            border: "border-[#f4d9a4]",
            "border-dark": "dark:border-[#842e3c]",
            text: "text-red-700",
            "text-dark": "dark:text-red-200",
            "background-dark": "dark:bg-red-600",
        },
        info: {
            background: "bg-neutral-100",
            border: "border-[#eeeeee]",
            "border-dark": "dark:border-[#616161]",
            text: "text-zinc-600",
            "text-dark": "dark:text-neutral-100",
            "background-dark": "dark:bg-neutral-600",
        },
    };
</script>

<div
    transition:slide={{
        axis: "x",
        duration: 300,
        delay: 200,
        easing: expoOut,
    }}
    class={`absolute top-3 right-1 pointer-events-auto mx-auto rounded-lg ${Types[type].background} text-sm ${Types[type].text} shadow-lg ${Types[type]["background-dark"]} ${Types[type]["text-dark"]}`}
    id="static-example"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
>
    <div
        class={`flex items-center justify-between rounded-t-lg ${Types[type].border} px-4 py-[0.65rem] ${Types[type]["border-dark"]}`}
    >
        <div class="flex items-center">
            <span class="me-2 py-1 [&>svg]:h-6 [&>svg]:w-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </span>
            <div
                class="whitespace-nowrap overflow-x-hidden rounded-b-lg p-1 text-center"
            >
                {message}
            </div>
        </div>
    </div>
</div>
