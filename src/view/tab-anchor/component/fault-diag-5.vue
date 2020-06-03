<template>
    <div>
        <mtd-table-column
            prop="maxCost"
            label="节点"
            sortable
            min-width="150" />
        <mtd-table-column
            prop="indicator"
            label="指标"
            sortable
            min-width="130" />
        <mtd-table-column
            prop="start"
            sortable
            label="开始时间"
            min-width="150">
            <template slot-scope="scope">
                {{ scope.row.start | formatTimeFromSecond }}
            </template>
        </mtd-table-column>
        <mtd-table-column
            prop="end"
            label="结束时间"
            sortable
            min-width="150">
            <template slot-scope="scope">
                {{ scope.row.end | formatTimeFromSecond }}
            </template>
        </mtd-table-column>
        <mtd-table-column
            prop="max"
            label="最大值"
            sortable
            min-width="100" />
        <mtd-table-column
            prop="min"
            sortable
            label="最小值"
            min-width="100" />
        <mtd-table-column
            prop="average"
            sortable
            label="平均值"
            min-width="100" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { formatTimeFromSecond } from '@/views/cluster/common/filter';

@Component({
    filters: {
        formatTimeFromSecond
    }
})

export default class FaultDiag5 extends Vue {
}
</script>

<style scoped>

</style>
