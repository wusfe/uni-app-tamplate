
import type {App} from 'vue'
import mescrollBody from "mescroll-uni/mescroll-body.vue";
import mescrollUni from "mescroll-uni/mescroll-uni.vue";
import mescrollEmpty from "mescroll-uni/components/mescroll-empty.vue";


export default {
    install (app:App){
        app.component("mescrollBody",mescrollBody ).component('mescrollUni', mescrollUni).component('mescrollEmpty',mescrollEmpty)
    }
}
