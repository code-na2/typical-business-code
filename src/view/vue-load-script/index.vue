<template>

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { loadScript } from '@/utils/utils';

export default class VueLoadScript extends Vue {
    mounted () {
        let s3Url = '//s3plus.sankuai.com/v1/mss_e4b9616ba5ac4bd89b55664672fdf747/squirrel/';
        let src = `${s3Url}jquery.min.js`;
        let src2 = `${s3Url}jqtreetable.js`;
        loadScript(src, () => {
            console.log('jQuery', jQuery);
            loadScript(src2, () => {
                // this.initTable(); // 此处可执行业务逻辑
            });
        });
    }
}
</script>

<style scoped>

</style>
