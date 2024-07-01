<script lang="ts">
    import type { PageData } from './$types';
	import SelectSubdiscipline from './SelectSubdiscipline.svelte';
	import { convertDBtoUIList, disciplineIsValid, findCourses } from './dataHelper';
	
    import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

    export let data: PageData;
	const currentPage = getContext<Writable<string>>('currentPage');
	$currentPage = 'list';

	const subdisciplineList = convertDBtoUIList(data.subdisciplines);
    let inputPopupDemo= '';

    let subdisciplineRec;
    let courses;
    $: if(inputPopupDemo){
        subdisciplineRec = disciplineIsValid(data.subdisciplines, inputPopupDemo); 
        if(subdisciplineRec) {
            courses = findCourses(data.courses, subdisciplineRec.subdisciplineid);
        }       
    }         
</script>

<main>
	<h1>List Courses</h1>
    <div style="padding-bottom: 10px">
        <label class="fl" for="">Sub Discipline:</label>
        <SelectSubdiscipline flavorOptions={subdisciplineList} bind:inputPopupDemo />
    </div>
	<!-- {#each data.result as entry}
		<div>
			<div style="text-indent: 10px">
				{JSON.stringify(entry)}
			</div>
		</div>
	{/each} -->

    {#if subdisciplineRec && courses}
        <!-- {JSON.stringify(subdisciplineRec)} -->
        <!-- {JSON.stringify(courses)} -->
        <div class="table-container">
            <!-- Native Table Element -->
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Unit Id</th>
                        <th>Name</th>
                        <th>Grading Basis</th>
                        <th>asced</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each courses as row, i}
                        <tr>
                            <td>{row.unitid}</td>
                            <td>{row.name}</td>
                            <td>{row.gradingbasis}</td>
                            <td>{row.asced}</td>
                            <td><a href="/app/view/{row.unitid}">View</a></td>
                        </tr>
                    {/each}
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="3">Count</th>
                        <td>{courses.length}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    {/if}
    
</main>

<style>
	main {
		padding: 3em;
	}

    h1 {
        text-align: center;
        font-size: 2em;
        padding-bottom: 10px;
    }
    
    .fl {
        padding-right: 1em;
    }
</style>
