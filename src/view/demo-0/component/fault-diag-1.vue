<template>
    <div>
        <mtd-table-column
            prop="redisAddr"
            label="节点"
            sortable
            min-width="150" />
        <mtd-table-column
            prop="metric"
            label="指标"
            sortable
            min-width="130" />
        <mtd-table-column
            prop="firstOccur"
            sortable
            label="第一次出现时间"
            min-width="150">
            <template slot-scope="scope">
                {{ scope.row.firstOccur | formatTimeFromSecond }}
            </template>
        </mtd-table-column>
        <mtd-table-column
            prop="lastOccur"
            sortable
            label="最后一次出现时间"
            min-width="180">
            <template slot-scope="scope">
                {{ scope.row.lastOccur | formatTimeFromSecond }}
            </template>
        </mtd-table-column>
        <mtd-table-column
            prop="status"
            label="异常值"
            sortable
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

export default class FaultDiag1 extends Vue {
}
</script>

<style scoped>

</style>
