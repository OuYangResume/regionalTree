import regionalTree from './compontent/regionalTree'
const tree = {
    install(Vue, options) {
        Vue.component(regionalTree.name, regionalTree);
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(tree);
}
export default tree 
