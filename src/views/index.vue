<template>
  <div>
    <div class="header">
      <div class="btn">
        <RadioGroup v-model="day" type="button" button-style="solid">
          <Radio label="全部"></Radio>
          <Radio label="近7日"></Radio>
          <Radio label="近30日"></Radio>
        </RadioGroup>
      </div>
      <div class="content">
        <Col span="4">
        <Card style="margin-right:40px">
          <div style="display: flex;justify-content: space-between;">
            <Icon type="ios-stats-outline" style="color:#007AFF;font-weight: bold;" size="36" />
            <div class="right">
              <p style="color:#007AFF;font-weight: bold;font-size:22px">{{clinic_num}}</p>
              <p>xx数量</p>
            </div>
          </div>
        </Card>
        </Col>
        <Col span="4">
        <Card style="margin-right:40px">
          <div style="display: flex;justify-content: space-between;">
            <Icon type="ios-stats-outline" style="color:#FF3A30;font-weight: bold;" size="36" />
            <div class="right">
              <p style="color:#FF3A30;font-weight: bold;font-size:22px">{{user_num}}</p>
              <p>用户数量</p>
            </div>
          </div>
        </Card>
        </Col>
        <Col span="4">
        <Card style="margin-right:40px">
          <div style="display: flex;justify-content: space-between;">
            <Icon type="ios-stats-outline" style="color:#FF9502;font-weight: bold;" size="36" />
            <div class="right">
              <p style="color:#FF9502;font-weight: bold;font-size:22px">{{visit_num}}</p>
              <p>浏览量</p>
            </div>
          </div>
        </Card>
        </Col>
        <Col span="4">
        <Card style="margin-right:40px">
          <div style="display: flex;justify-content: space-between;">
            <Icon type="ios-stats-outline" style="color:#34C758;font-weight: bold;" size="36" />
            <div class="right">
              <p style="color:#34C758;font-weight: bold;font-size:22px">{{sao_num}}</p>
              <p>扫码次数</p>
            </div>
          </div>
        </Card>
        </Col>
      </div>
    </div>
  </div>
</template>

<script>
 import {sys_home_data} from "@/axios/publics";
import '@/assets/utils/china'
export default {
  data(){
    return{
      disableEnd: {
        disabledDate: time => {
          if (this.start_time) {
            return time.getTime() <= this.start_time.getTime()
          }
        }
      },
      columns1: [
        {
          title: '排行',
          type: 'index',
          align: 'center'
        },
        {
          title: '地区',
          key: 'province'
        },
        {
          title: '数量',
          key: 'nums'
        },
        {
          title: '占比',
          key: 'ratio'
        }
      ],
      dataList:[],
      clinic_list:[
        {
        id:2,
        name:"xx",
      },{
        id:1,
        name:"xx",
      },
      ], //机构
      clinic:2,

      clinic_num:'',
      sao_num:'',
      user_num:'',
      visit_num:'',
      type:'',
      day:"全部",
      dayEchart:"近7日",
      start_time:"",
      end_time:"",
      listmap:[]
    }
  },
  created(){
    this.get_sys_home_data()
  },
  mounted(){
  },
  methods:{
    // 全部数量
    get_sys_home_data(day){
      const data={
        day:day
      }
      sys_home_data(data).then(res=>{
        this.user_num=res.info.data.user_num ==null ? '0' : res.info.data.user_num
        this.clinic_num=res.info.data.clinic_num ==null ? '0' : res.info.data.clinic_num
        this.sao_num=res.info.data.sao_num == null ? '0' : res.info.data.sao_num
        this.visit_num=res.info.data.visit_num == null ? '0' : res.info.data.visit_num
      })
    },
  }
}
</script>


<style lang="less" scoped>
.header{
  padding: 20px 10px;
}
.btn{
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.content{
  // margin-left: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  .right{
    margin-left: 20px;
    >p:last-child{
      margin-top: 10px;
    }
  }
}
.center{
  padding: 10px 0;
  >h3:first-child{
    padding: 10px 10px;
  }
}
.center-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  >.right{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
}

</style>
