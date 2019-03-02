<!--
 * @Description: In User Settings Edit
 * @Author: oouyang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-01 15:10:46
 * @LastEditTime: 2019-03-01 17:46:11
 -->

<template>
  <div>
    <p>区域树型组件</p>
    <div v-for="(childTree,nodeIndex) in treeList" :key="nodeIndex" class="tree">
      <div
        v-for="(item,index) in childTree"
        :key="index"
        @click="_getItemList(item,nodeIndex)"
      >{{item._source.areaname}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "regionalTree",
  data() {
    return {
      treeList: [], //核心数组
      isopen:false
    };
  },
  created() {},
  mounted() {
    let vm = this;
    vm.getChildList("440305").then(res => {
      console.log(res);
      vm.treeList.push(res.data);
    });
  },
  methods: {
    /**
     * @description:
     * @param {Object} item子树对象
     * @param {Number} nodeIndex用于判断当前点击有没有list
     * @return:
     */
    _getItemList(item, nodeIndex) {
      console.log(item, nodeIndex);
      let vm = this;
      let code = item._source.areacode;
      vm.getChildList(code).then(res => {
        //如果核心数组里面存在，先删除，再push
        if (vm.treeList[nodeIndex + 1]) {
          let arr = vm.treeList;
          arr = arr.slice(0, nodeIndex + 1);
          vm.treeList = arr;
          vm.treeList.push(res.data);
        } else {
          vm.treeList.push(res.data);
        }
      });
    },
    /**
     * @description: 根据父级区域code获取子区域数据
     * @param {parentCode}
     * @return:
     */
    getChildList(parentCode) {
      return axios({
        method: "post",
        url: "http://192.168.100.181:8990/cubeData/api/getAreaInfoByParentcode",
        params: {
          parentCode: parentCode
        }
      }).then(response => {
        return Promise.resolve(response.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tree {
  display: flex;
}
</style>


