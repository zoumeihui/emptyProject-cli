<template>
  <div id="home" >
    <main class="fancy-scrollbar">
      <div class="input">
        <input type="text" @keyup.enter="search" v-model="searchContent" :placeholder="placeholder"/><i class="zricon-search" @click="search"></i>
      </div>
      <ul class="item-type">
        <li @click="searchbytype(item.typevalue)" v-for="(item,index) in protypelist" v-html="item.typename" :class="{'active': searchType === item.typevalue}"></li>
      </ul>
      <div :class="{'wrapbox':true,'listbox':isList}">
        <div class="add-tmp" @click="showProjectBox">
          <p>新建项目</p>
        </div>
        <div class="dummyproject" v-show="projectArr.length==0 && dummyshow">
          <p>内容为空</p>
        </div>
        <div class="shotemplate" v-for="(item,index) in projectArr" @click="gotoDetail(item.puuid,item.proName,item.createTime,item.pmErp)">
          <h3>{{item.proName}}</h3>
        </div>
      </div>
    </main>
    <transition name="fade">
      <myMask v-show="addProjectBox" @hideBox="hideProjectBox"></myMask>
    </transition>
    <transition name="fade">
      <alertBox v-show="alertShow" :alertMsg="message" :alertType="type" :homealert="homealert" ></alertBox>
    </transition>
    <LoadingBox v-if="loading == 11"></LoadingBox>
  </div>
</template>

<script>
  import myMask from './Mask'
  import alertBox from './Alert'

  //Loading
  import LoadingBox from './loading/Loading'
  import {mapGetters} from 'vuex'

  export default {
    computed:mapGetters([
      "isAdmin",
      'loading'
    ]),
    components:{
      myMask,
      alertBox,
      LoadingBox
    },
    mounted(){
      this.getProject();
    },
    data(){
      return {
        deleteId:"",
        //项目类型
        protypelist:[{typevalue:"",typename:"全部"},{typevalue:0,typename:"PC端"},
          {typevalue:1,typename:"移动端"}, {typevalue:2,typename:"微信小程序"},
          {typevalue:3,typename:"IOS客户端"},{typevalue:4,typename:"Android客户端"}],
        //当前选择的项目类型
        searchType:""
      }
    },
    methods:{
      //获取项目列表数据
      getProject(){
        let _this = this;
        _this.$store.dispatch("showLoading",11);
        this.$http({
          method:"get",
          url:window.ajaxUrl + "/projectManage/projectList",
          params:{
            keyWord:""
          }
        }).then(function (res) {
          let _data = res.data;
          if (_data.code == 0){
            _this.projectArr = _data.data;
            _this.dummyshow = true;
          }
        }).catch(function (err) {
          _this.dummyshow = true;
          console.log(err)
        })
      },
    
      //盒子显示按钮事件
      showBox(){
        let _this = this;
        _this.isList = false;
        _this.isBox = true;
      },
      //搜索事件
      search(){
        let _this = this;
        _this.$store.dispatch("showLoading",11);
          this.$http({
            method:"get",
            url:window.ajaxUrl + "/projectManage/projectList",
            params:{
              keyWord:_this.searchContent,
              proType:_this.searchType
            }
          }).then(function (res) {
            let _data = res.data;
            if (_data.code == 0){
              _this.projectArr = _data.data;
            }
          }).catch(function (err) {
            console.log(err)
          })
         
       
      },
    
      //隐藏新建项目弹窗
      hideProjectBox(){
        let _this = this;
        _this.addProjectBox = false;
      },
      //点击进入详情页
      gotoDetail(id,name,time,erp){
        let _this = this;
        _this.$store.dispatch("showLoading",11);
        this.$http({
          method:"get",
          url:window.ajaxUrl + "/projectManage/getRuuid",
          params:{
            PUUID:id
          }
        }).then(function (res) {
          let _data = res.data;
          if (_data.code == 0){
            _this.$router.push({
              name:"Detail",
              query:{
                proName:name,
                time:time,
                pmErp:erp
              }
            })
          }
        }).catch(function (err) {

        })
      },
  
      
</script>

<style scoped>
 
  /*动画效率*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  /*分类*/
  .item-type{
    position: absolute;
    left: 50%;
    top: 100px;
  }
  .item-type li{
    display: inline-block;
    margin-left: 5px;
    padding: 0 8px;
    height: 24px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #d9d9d9;
    color: rgba(0,0,0,.45);
    line-height: 22px;
    font-size: 14px;
    transition: all .5s;
    cursor: pointer;
  }
  .item-type li:hover,.item-type li.active{
    border: 1px solid #5F71EB;
    color: #5F71EB;
  }

  .fancy-scrollbar {
    -webkit-overflow-scrolling: touch
  }
  .fancy-scrollbar::-webkit-scrollbar {
    height: 8px;
    width: 4px
  }
  .fancy-scrollbar::-webkit-scrollbar-button:start:decrement,
  .fancy-scrollbar::-webkit-scrollbar-button:end:increment {
    background: transparent;
    display: none
  }
  .fancy-scrollbar::-webkit-scrollbar-track-piece {
    background: #dbdbdb
  }
  .list-body.fancy-scrollbar::-webkit-scrollbar-track-piece {
    background: #fff
  }
  .fancy-scrollbar::-webkit-scrollbar-track-piece:vertical:start {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0
  }
  .fancy-scrollbar::-webkit-scrollbar-track-piece:vertical:end {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px
  }
  .fancy-scrollbar::-webkit-scrollbar-track-piece:horizontal:start {
    border-top-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 5px
  }
  .fancy-scrollbar::-webkit-scrollbar-track-piece:horizontal:end {
    border-top-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 0
  }
  .fancy-scrollbar::-webkit-scrollbar-thumb:vertical,
  .fancy-scrollbar::-webkit-scrollbar-thumb:horizontal {
    background: rgba(0,0,0,0.13);
    border-radius: 5px;
    display: block;
    height: 10px
  }
  .fancy-scrollbar::-webkit-scrollbar-thumb:vertical{
    background: rgba(0,0,0,0.43);
  }
  .fancy-scrollbar::-webkit-scrollbar-thumb:vertical:hover{}
  .fancy-scrollbar::-webkit-scrollbar-thumb:horizontal:hover{
    background: rgba(0,0,0,0.23);
  }
  .list-body.fancy-scrollbar::-webkit-scrollbar-button {
    display: block;
    height: 0px
  }
  .dummyproject{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 463px;
    text-align: center;
    font-size: 14px;
    color: rgba(0,0,0,.33);
    line-height: 22px;
  }
  .dummyproject span{
    background: url("../assets/css/dummypro.png") top center no-repeat ;
    display: inline-block;
    width: 213px;
    height: 178px;
    margin-bottom: 22px;
  }
</style>
