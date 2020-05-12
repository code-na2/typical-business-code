<template>
    <div>
        <mtd-tabs v-model="activeTab" type="border-card">
            <mtd-tab-pane
                v-for="(item, index) in activeTabOptions"
                :key="index"
                :label="item.label"
                :value="item.label">
                <component :is="item.value" :cluster-name="clusterName"></component>
            </mtd-tab-pane>
        </mtd-tabs>
    </div>
</template>

<script lang="tsx">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import FaultDiag from './fault-diag.vue';
import FaultWarning from './fault-warning.vue';

@Component({
    FaultDiag,
    FaultWarning
})
export default class FaultDiagnosis extends Vue {
    // 当前集群名称
    clusterName: string;

    activeTabOptions: any = [{
        label: '异常诊断',
        value: FaultDiag
    }, {
        label: '异常告警',
        value: FaultWarning
    }];
    activeTab: string = this.activeTabOptions[0].label;

    created () {
        this.clusterName = this.$route.query.name;
    }
}
</script>

<style scoped>
    .m-b-18 {
        margin-bottom: 18px;
    }
</style>
