<script lang="ts" setup>
let options = {
    chart: {
        id: 'vuechart-example'
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
}
let series = [{
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
}]
</script>

<template>
    <div>
        <h1>charts</h1>
        <apexchart width="50%" type="" :options="options" :series="series"></apexchart>
    </div>
</template>

