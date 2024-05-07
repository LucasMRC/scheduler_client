<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import {
        Select,
        SelectItem,
        SelectTrigger,
        SelectContent,
        SelectValue,
        SelectInput,
    } from './ui/select';
    import type { Selected } from "bits-ui";

    type Option = {
        value: unknown;
        label: string;
    };

    type $$Props = HTMLAttributes<HTMLDivElement> & { options: Option[]; value: Selected<unknown> };

    let className: $$Props["class"] = undefined;
    let selected: $$Props["value"] = undefined as unknown as Selected<unknown>;

    export { className as class };
    export let options: Option[];
    export { selected as value };
</script>

<Select bind:selected>
    <SelectTrigger class={className}>
        <SelectValue />
    </SelectTrigger>
    <SelectContent>
        {#each options as option}
            <SelectItem class="capitalize" label={option.label} value={option.value}>{option.label}</SelectItem>
        {/each}
    </SelectContent>
</Select>
