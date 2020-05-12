<template>
    <div class="search-content">
        <label class="search-label">诊断时间</label>
        <mtd-date-picker
            class="m-r-18"
            v-model="timeRange"
            type="datetime"
            placeholder="选择时间"
            format="yyyy-MM-dd HH:mm"
            :time-picker-options="{ format: 'HH:mm' }"
            :options="timePickerOptions"
            @confirm="onTimeRangeChange" />
        <mtd-radio-group
            v-model="timeRangeRadio"
            class="m-r-18">
            <mtd-radio-button
                v-for="item in timeTransfer"
                :key="item.value"
                :value="item.value">{{ item.label }}
            </mtd-radio-button>
        </mtd-radio-group>
        <mtd-button class="btn-demo-item" ghost type="primary">一键诊断</mtd-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';
const TIME_TRANSFER = [
    {
        label: '前15分钟',
        value: 15
    },
    {
        label: '前30分钟',
        value: 30
    },
    {
        label: '前1小时',
        value: 60
    }
];

@Component({
})

export default class FaultDiagSearch extends Vue {
    timeTransfer: any = TIME_TRANSFER;
    // 时间区间默认为1，单位：小时
    timeRangeRadio: number = 15;
    timeRange: any = moment().subtract(this.timeRangeRadio, 'seconds').toDate();

    @Watch('timeRangeRadio')
    onTimeRangeRadioChange (val: number) {
        if (val) {
            this.timeRange = moment().subtract(val, 'seconds').toDate();
        }
        this.emitCallback();
    }
    // timePicker 组件禁止选择大于当前时间的时间
    timePickerOptions: any = {
        disabledDate: (val: Date) => {
            return moment(val).isAfter();
        }
    };
    onTimeRangeChange (): void {
        this.timeRangeRadio = null;
        this.emitCallback();
    }
    emitCallback () {
        this.$emit('search', { timeRangeRadio: this.timeRangeRadio, timeRange: this.timeRange });
    }
    created () {
        this.emitCallback();
    }
}
</script>

<style lang="scss" scoped>
    .search-content {
        .search-label {
            margin-right: 20px;
            color: #606266;
        }
    }
    .m-r-18 {
        margin-right: 18px;
    }
</style>
