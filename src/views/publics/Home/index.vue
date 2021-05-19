<template>
  <div>
    <div class="header">
      <div class="btn">
        <RadioGroup v-model="day" type="button" @on-change="day_change" button-style="solid">
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
    <div class="center">
      <h3>热力分布</h3>
      <div class="center-title">
        <div class="left">
          <Select v-model="clinic" filterable clearable @on-change="clinic_list_change" style="width:200px">
            <Option v-for="item in clinic_list" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
        <div class="right">
          <RadioGroup v-model="dayEchart" type="button" @on-change="day_echart" button-style="solid">
            <Radio label="近7日"></Radio>
            <Radio label="近30日"></Radio>
          </RadioGroup>
          <div>
            <DatePicker type="date" v-model="start_time"  placeholder="开始时间" style="width: 150px;margin-left:20px"></DatePicker>
            <span>至</span>
            <DatePicker type="date" v-model="end_time" :disabled="!start_time" :time-picker-options="disableEnd"  @on-change="time_change" placeholder="结束时间" style="width: 150px"></DatePicker>
          </div>
        </div>
      </div>
      <div>
        <Row>
          <Col span="16">
            <div id="main" style="width: 100%;height:400px;"></div>
          </Col>
          <Col span="8">
            <Table highlight-row stripe :columns="columns1" :data="dataList"></Table>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
 import {sys_home_data,sys_hot_data} from "@/axios/publics";
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
   this.myChart = this.$echarts.init(document.getElementById("main"));
   this.myEcharts()
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
    // 时间
    time_change(){
      this.myEcharts()
    },
    // 天数
    day_change(){
      this.get_sys_home_data()
    },
    // echart天数
    day_echart(){
      this.myEcharts()
    },
    clinic_list_change(){
      this.myEcharts()
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let listmap=[]
      let arrList=[]
      sys_hot_data().then(res=>{
        let list =res.info.data
        for (let i = 0; i < list.length; i++) {
             let province_name=list[i].province
             if (province_name == "四川省") {
                province_name = "四川";
              }
              if (province_name == "江西省") {
                province_name = "江西";
              }
              if (province_name == "河北省") {
                province_name = "河北";
              }
              if (province_name == "内蒙古自治区") {
                province_name = "内蒙古";
              }
              if (province_name == "甘肃省") {
                province_name = "甘肃";
              }
              if (province_name == "海南省") {
                province_name = "海南";
              }
              if (province_name == "山东省") {
                province_name = "山东";
              }
              listmap.push({
                name: province_name,
                value: list[i].nums,
              });
              arrList.push({
                nums: list[i].nums,
                province: list[i].province,
                ratio: list[i].ratio + "%"
              })
            }
            this.dataList=arrList
        var option = {
              title: {
                left: "center",
              },
              tooltip: {
                trigger: "item",
              },
              legend: {
                orient: "vertical",
                left: "left",
              },
              visualMap: {
                min: 0,
                max: 1000,
                left: "left",
                top: "bottom",
                text: ["高", "低"],
                calculable: false,
                orient: "horizontal",
                inRange: {
                  color: [
                    "rgba(235,252,241, 1)",
                    "rgba(198,247,215, 1)",
                    "rgba(144,240,173, 1)",
                    "rgba(91,233,134, 1)",
                    "rgba(56,224,114, 1)",
                  ],
                  symbolSize: [30, 1000],
                },
              },
              series: [
                {
                  name: this.clinic==1 ? '机构' : '用户',
                  type: "map",
                  mapType: "china",
                  roam: false,
                  label: {
                    normal: {
                      show: true,
                    },
                    emphasis: {
                      show: true,
                    },
                  },
                  data: listmap,
                },
              ],
            }
            this.myChart.setOption(option);
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
