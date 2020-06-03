<template>
    <div class="fault-diag">
        <mtd-row
            type="flex"
            class="diag-search"
            justify="space-between">
            <span class="title">异常诊断</span>
            <fault-diag-search @search="getData"/>
        </mtd-row>
        <div class="anchor-wrap-diag">
            <ul class="content-wrap" id="diag-base-anchor-containter">
                <li v-for="(item, index) in anchorOptions" :key="item.href" :id="`diag-base-anchor-${index}`">
                    <div v-if="index === 0"></div>
                    <div v-else>
                        <mtd-card
                            class="card-box"
                            shadow="never">
                            <p class="title">{{ item.title }}
                                <mtd-tooltip :content="item.tip" placement="top">
                                    <i class="mtdicon mtdicon-warning-circle-o"/>
                                </mtd-tooltip>
                            </p>
                            <mtd-table
                                :data="item.tableData"
                                max-height="500"
                                v-loading="loading"
                            >
                                <component :is="item.content || null"/>
                            </mtd-table>
                        </mtd-card>
                    </div>
                </li>
            </ul>
            <mtd-anchor
                class="title-wrap"
                :offset-top="100"
                :affix="false"
                container="#diag-base-anchor-containter">
                <p class="title">目录</p>
                <mtd-anchor-link
                    v-for="(link, index) in anchorOptions"
                    :href="'#diag-base-anchor-' + index"
                    :title="link.title"
                    :key="'#diag-base-anchor-' + index"
                />
            </mtd-anchor>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import * as apis from '../../api/detail_diagnosis';
import FaultDiagSearch from './component/fault-diag-search';
import RedisAbnormalIndicatorList from './component/fault-diag-0';
import RedisAbnormalStatusList from './component/fault-diag-1';
import HulkAbnormalIndicatorList from './component/fault-diag-2';
import HulkAbnormalStatusList from './component/fault-diag-3';
import KeeperAbnormalIndicatorList from './component/fault-diag-4';
import slowLogAbnormalIndicatorList from './component/fault-diag-5';
import netAlarmDtoList from './component/fault-diag-6';
import redisOperationDtoList from './component/fault-diag-7';
import keeperOperationDtoList from './component/fault-diag-8';

@Component({
    components: {
        FaultDiagSearch,
        RedisAbnormalIndicatorList,
        RedisAbnormalStatusList,
        HulkAbnormalIndicatorList,
        HulkAbnormalStatusList,
        KeeperAbnormalIndicatorList,
        slowLogAbnormalIndicatorList,
        netAlarmDtoList,
        redisOperationDtoList,
        keeperOperationDtoList
    }
})
export default class FaultDiag extends Vue {
    // 当前集群名称
    @Prop()
    clusterName: string;
    anchorOptions: any = [
        {
            title: '全部诊断'
        },
        {
            title: 'Redis 异常数据',
            key: 'redisAbnormalIndicatorList',
            content: RedisAbnormalIndicatorList,
            tipKey: 'redisAbnormalIndicatorTip',
            tip: '',
            tableData: []
        },
        {
            title: 'Redis 异常状态',
            key: 'redisAbnormalStatusList',
            content: RedisAbnormalStatusList,
            tipKey: 'redisAbnormalStatusTip',
            tip: '',
            tableData: []
        },
        {
            title: 'Hulk 异常数据',
            tipKey: 'hulkAbnormalIndicatorTip',
            key: 'hulkAbnormalIndicatorList',
            content: HulkAbnormalIndicatorList,
            tip: '',
            tableData: []
        },
        {
            title: 'Hulk 异常状态 ',
            tipKey: 'hulkAbnormalStatusTip',
            key: 'hulkAbnormalStatusList',
            content: HulkAbnormalStatusList,
            tip: '',
            tableData: []
        },
        {
            title: 'Keeper 异常数据',
            tipKey: 'keeperAbnormalIndicatorTip',
            key: 'keeperAbnormalIndicatorList',
            content: KeeperAbnormalIndicatorList,
            tip: '',
            tableData: []
        },
        {
            title: '慢查询异常数据',
            tipKey: 'slowLogAbnormalIndicatorTip',
            key: 'slowLogAbnormalIndicatorList',
            content: slowLogAbnormalIndicatorList,
            tip: '',
            tableData: []
        },
        {
            title: '网络抖动异常状态',
            tipKey: 'netAlarmDtoTip',
            key: 'netAlarmDtoList',
            content: netAlarmDtoList,
            tip: '',
            tableData: []
        },
        {
            title: '集群运维日志',
            tipKey: 'redisOperationDtoTip',
            key: 'redisOperationDtoList',
            content: redisOperationDtoList,
            tip: '',
            tableData: []
        },
        {
            title: 'Keeper 运维日志',
            tipKey: 'keeperOperationDtoTip',
            key: 'keeperOperationDtoList',
            content: keeperOperationDtoList,
            tip: '',
            tableData: []
        }
    ];
    loading: boolean = false;

    getData (date) {
        this.loading = true;
        let params: any = {
            clusterName: this.clusterName,
            delta: date.timeRangeRadio,
            focusTime: moment(date.timeRange).format('YYYY-MM-DD HH:mm')
        };
        apis.getDiagnosisData(params).then(res => {
            let { code, ret, err } = res;
            if (code === 200) {
                this.loading = false;
                let result: any = ret || {};
                let resultKeys: any = Object.keys(result);
                let anchorOptions: any = this.anchorOptions.splice(0);
                anchorOptions.forEach((item) => {
                    item['tableData'] = resultKeys.indexOf(item['key']) > -1 ? result[item['key']] : [];
                    item['tip'] = resultKeys.indexOf(item['tipKey']) > -1 ? result[item['tipKey']] : '';
                });
                this.anchorOptions = anchorOptions;
            } else {
                this.$mtd.message({
                    message: err,
                    type: 'error'
                });
                this.loading = false;
            }
        }).catch(() => {
            this.loading = false;
        });
    }
}
</script>

<style lang="scss">
    .fault-diag {
        .diag-search {
            line-height: 34px;
            height: 34px;
            .title {
                font-size: 15px;
                color: #333;
                font-weight: 600;
            }
        }
        .anchor-wrap-diag {
            margin-top: 16px;
            position: relative;
            .content-wrap {
                position: relative;
                left: 150px;
                height: 800px;
                overflow-y: auto;
                margin-right: 150px;
                margin-bottom: 50px;
                li {
                    list-style: none;
                    max-height: 600px;
                    .card-box {
                        margin-bottom: 20px;
                        .title {
                            line-height: 20px;
                            font-weight: 600;
                            font-size: 16px;
                            margin-bottom: 15px;
                            color: #333;
                        }
                    }
                }
            }
            .title-wrap {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 150px;
                .title {
                    font-size: 14px;
                    font-weight: 500;
                    height: 25px;
                }
            }
        }
    }
</style>
