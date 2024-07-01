<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const currentPage = getContext<Writable<string>>('currentPage');
	$currentPage = 'view';


</script>

<h1>View Course</h1>
<label>Unit ID: {data.unitid}</label>
<div style="padding-bottom: 10px">
    <a href="/app/compare/{data.unitid}"><label style="border: 1px solid; border-radius: 10px; width: 300px;text-align: center;">Compare for Credit Mapping</label></a>
</div>

{#if data.courseDesc}
    <!-- {JSON.stringify(data.courseDesc)} -->
    <div class="table-container">
        <!-- Native Table Element -->
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>uotype</th>
                    <th>sequence</th>
                    <th>content</th>                    
                </tr>
            </thead>
            <tbody>
                {#each data.courseDesc as row, i}
                    <tr>
                        <td>{row.uotype}</td>
                        <td>{row.sequence}</td>
                        <td>{row.content}</td>
                    </tr>
                {/each}
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3">Count</th>
                    <td>{data.courseDesc.length}</td>
                </tr>
            </tfoot>
        </table>
    </div>
{/if}

<style>
    h1 {
        text-align: center;
        font-size: 2em;
        padding-bottom: 10px;
    }

    label {
        padding: 10px;
    }
</style>