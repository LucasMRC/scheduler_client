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

    type Option = {
        value: unknown;
        label: string;
    };

    type $$Props = HTMLAttributes<HTMLDivElement> & { options: Option[]; value: Option };

    let className: $$Props["class"] = undefined;
    let selected: $$Props["value"] = { label: '', value: undefined } as Option;

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
    <SelectInput value={selected.value}>{selected.label}</SelectInput>
</Select>
