<script lang="ts">
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	export let inputPopupDemo: string = '';

	function onPopupDemoSelect(event: CustomEvent<AutocompleteOption>): void {
		inputPopupDemo = event.detail.label;
	}

	export let flavorOptions: AutocompleteOption[];
	// = [
	// 	{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
	// 	{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
	// 	{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
	// 	{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
	// 	{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
	// 	{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	// ];
</script>

<div class="text-token w-full max-w-sm space-y-2" style="display: inline-block">
	<input
		class="input autocomplete"
		type="search"
		name="autocomplete-search"
		bind:value={inputPopupDemo}
		placeholder="Search..."
		use:popup={popupSettings}
	/>
	<div
		data-popup="popupAutocomplete"
		class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
		tabindex="-1"
	>
		<Autocomplete
			bind:input={inputPopupDemo}
			options={flavorOptions}
			on:selection={onPopupDemoSelect}
		/>
	</div>
</div>
