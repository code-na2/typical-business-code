<template>
    <div>
        <mtd-table-column
            prop="idc"
            label="抖动机房"
            sortable
            min-width="100" />
        <mtd-table-column
            prop="startTime"
            sortable
            label="开始时间"
            min-width="180">
            <template slot-scope="scope">
                {{ scope.row.startTime || '-' }}
            </template>
        </mtd-table-column>
        <mtd-table-column
            prop="currentTime"
            label="当前时间"
            sortable
            min-width="180">
            <template slot-scope="scope">
                {{ scope.row.currentTime || '-' }}
            </template>
        </mtd-table-column>
        <mtd-table-column
            prop="status"
            label="状态"
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

export default class FaultDiag6 extends Vue {
}
</script>

<style scoped>

</style>
