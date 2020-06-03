<template>
    <div>
        <mtd-table-column
            prop="operateTime"
            label="操作时间"
            sortable
            min-width="150">
            <template slot-scope="scope">
                {{ scope.row.operateTime | formatTimeFromSecond }}
            </template>
        </mtd-table-column>
        <mtd-table-column
            prop="operator"
            label="操作人"
            sortable
            min-width="100" />
        <mtd-table-column
            prop="operateType"
            label="操作类型"
            sortable
            min-width="100" />
        <mtd-table-column
            prop="operateContent"
            label="操作内容"
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

export default class FaultDiag7 extends Vue {
}
</script>

<style scoped>

</style>
