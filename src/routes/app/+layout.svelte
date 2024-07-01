<script lang="ts">
	import '../../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let currentPage = writable<string>('view');
	setContext('currentPage', currentPage);
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/">
					<div class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
							<path
								fill="currentColor"
								d="M33 19a1 1 0 0 1-.71-.29L18 4.41L3.71 18.71A1 1 0 0 1 2.3 17.3l15-15a1 1 0 0 1 1.41 0l15 15A1 1 0 0 1 33 19Z"
								class="clr-i-solid clr-i-solid-path-1"
							/>
							<path
								fill="currentColor"
								d="M18 7.79L6 19.83V32a2 2 0 0 0 2 2h7V24h6v10h7a2 2 0 0 0 2-2V19.76Z"
								class="clr-i-solid clr-i-solid-path-2"
							/>
							<path fill="none" d="M0 0h36v36H0z" />
						</svg>
					</div>
				</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			<AppRailAnchor href="/app/list" selected={$currentPage === 'list'}>
				<svelte:fragment slot="lead">
					<div class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M20 4H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM4 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H4Zm2 5h2v2H6V7Zm5 0a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-3 4H6v2h2v-2Zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Zm-2 3H6v2h2v-2Zm2 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg>
					</div>
				</svelte:fragment>
				<div class="title">List</div>
			</AppRailAnchor>
			<AppRailAnchor href="/app/view" selected={$currentPage === 'view'}>
				<svelte:fragment slot="lead">
					<div class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><path
								fill="currentColor"
								d="M17.25 2A2.75 2.75 0 0 1 20 4.75v14.5A2.75 2.75 0 0 1 17.25 22H6.75A2.75 2.75 0 0 1 4 19.249V4.75c0-1.26.846-2.32 2-2.647V3.75c-.304.228-.5.59-.5 1v14.498c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V4.75c0-.69-.56-1.25-1.25-1.25H15V2h2.25ZM14 2v8.139c0 .747-.8 1.027-1.29.764l-.082-.052l-2.126-1.285l-2.078 1.251c-.5.36-1.33.14-1.417-.558L7 10.14V2h7Zm-1.5 1.5h-4v5.523l1.573-.949a.923.923 0 0 1 .818-.024l1.61.974V3.5Z"
							/></svg
						>
					</div>
				</svelte:fragment>
				<div class="title">View</div>
			</AppRailAnchor>
			<AppRailAnchor href="/app/compare" selected={$currentPage === 'compare'}>
				<svelte:fragment slot="lead">
					<div class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
							><g fill="none"
								><path
									fill="currentColor"
									d="M6 4h6v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
									opacity=".16"
								/><path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7m4-16h1a2 2 0 0 1 2 2v1m0 10v1a2 2 0 0 1-2 2h-1m3-9v2M12 2v20"
								/></g
							></svg
						>
					</div>
				</svelte:fragment>
				<div class="title">Compare Texts</div>
			</AppRailAnchor>
			<!-- --- -->
			<svelte:fragment slot="trail">
				<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>

<style>
	.icon {
		display: inline-block;
		padding-top: 0.5em;
		margin: 0 auto;
	}
	.title {
		padding-bottom: 0.5em;
	}
</style>
