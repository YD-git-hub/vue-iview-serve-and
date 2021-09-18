<template>
  <div class="calendar">
    <div class="select">
      <Form inline>
        <FormItem>
          <Select v-model="curYear" placeholder="请选择">
            <Option
              v-for="item in yearOptions"
              :key="item.key"
              :value="item.value"
              :label="item.label"
            />
          </Select>
        </FormItem>
        <FormItem>
          <Select v-model="curMonth" placeholder="请选择">
            <Option
              v-for="item in monthOptions"
              :key="item.key"
              :value="item.value"
              :label="item.label"
            />
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleQuickChange('prev')"
            >上一月</Button
          >
          <Button type="primary" @click="handleQuickChange('next')"
            >下一月</Button
          >
        </FormItem>
      </Form>
    </div>
    <table class="calendar-table" :style="{ width }">
      <thead>
        <tr>
          <th v-for="(item, i) in weeks" :key="i">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dates, i) in res" :key="i" :style="{ height: tbodyHeight }">
          <td
            v-for="(item, index) in dates"
            :key="index"
            :class="{
              notCurMonth: !item.isCurMonth,
              currentDay: item.date === curDate,
              selectDay: item.isSelected,
              rangeSelectd: item.isRangeSelected,
              weekend: item.isWeekend,
            }"
            @click="handleItemClick(item, i, index)"
            @mouseover="handleItemMove(item, i, index)"
          >
            <!-- <span>{{ item.date.split('-').slice(1).join('-') }}</span> -->
            <span>{{ item.date }}</span>
            <slot :data="item" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  getDaysInMonth,
  handleCrateDate,
  handleCreateDatePicker,
  parseTime,
} from "./index";
export default {
  components: {},
  props: {
    selectMode: {
      type: String,
      default: "click",
    },
    startOfWeek: {
      type: Number,
      default: 1,
    },
    canSelect: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "100%",
    },
    tbodyHeight: {
      type: String,
      default: "100px",
    },
  },
  data() {
    return {
      monthOptions: [],
      yearOptions: [],
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      curYear: new Date().getFullYear(), // 当前年
      curMonth: new Date().getMonth(), // 当前月
      days: 0, // 当前月总共天数
      curDate: parseTime(new Date().getTime()), // 当前日期 yyyy-MM-dd 格式，用来匹配是否是当前日期
      prevDays: [], // 非当前月的上一月展示的日期
      rearDays: [], // 非当前月的下一月展示的日期
      curDays: [], // 当前月的日期
      showDays: [], // 总共展示的42个日期
      res: [], // 二维数组
      res2: [], // 数组
      selectedDates: [], // 选中的日期
      selectedMode: false, // true表示点击， false表示滑动
      moveIndex: [], // 两个，第一个是起始，第二个是结束
      canMove: false, // 当moveIndex数组有一个值时，可以触发滑动
    };
  },
  computed: {},
  watch: {
    curMonth: {
      handler(val) {
        this.handleGetDays(this.curYear, val, this.startOfWeek);
      },
    },
    curYear: {
      handler(val) {
        this.handleGetDays(val, this.curMonth, this.startOfWeek);
      },
    },
  },
  created() {
    this.weeks.unshift(...this.weeks.splice(this.startOfWeek - 1));
    this.handleGetDays(this.curYear, this.curMonth, this.startOfWeek);
    this.selectedMode = this.selectMode === "click";
  },
  mounted() {
    this.monthOptions = handleCreateDatePicker().months;
    this.yearOptions = handleCreateDatePicker().years;
    if (localStorage.selectedDates)
      this.selectedDates = JSON.parse(localStorage.selectedDates);
  },
  methods: {
    handleGetDays(year, month) {
      this.showDays = [];
      this.days = getDaysInMonth(year, month);
      let firstDayOfWeek = new Date(`${year}-${month + 1}-01`).getDay();

      // 处理周起始日
      const obj = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        0: "日",
      };
      const firstDayInCN = obj[firstDayOfWeek];
      const index = this.weeks.indexOf(firstDayInCN);
      console.log(firstDayOfWeek, index);

      if (firstDayOfWeek === 0) {
        // 星期天为0 星期一为1 ，以此类推
        firstDayOfWeek = 7;
      }

      this.prevDays = handleCrateDate(year, month, 1, index + 1, "prev");
      this.rearDays = handleCrateDate(
        year,
        month,
        1,
        42 - this.days - index,
        "rear"
      );

      this.curDays = handleCrateDate(year, month, 1, this.days);
      this.showDays.unshift(...this.prevDays);
      this.showDays.push(...this.curDays);
      this.showDays.push(...this.rearDays);
      this.res = this.handleFormatDates(this.showDays);
    },
    handleFormatDates(arr, size = 7) {
      // 传入长度42的原数组，最终转换成二维数组
      const arr2 = [];
      for (let i = 0; i < size; i++) {
        const temp = arr.slice(i * size, i * size + size);
        arr2.push(temp);
      }
      // console.log(arr2)
      return arr2;
    },
    handleTableHead(start) {
      const sliceDates = this.weeks.splice(start - 1);
      this.weeks.unshift(...sliceDates);
    },
    handleItemClick(item, i, j) {
      if (!this.canSelect) return;
      if (this.selectedMode) {
        this.$nextTick(() => {
          this.res[i][j].isSelected = !this.res[i][j].isSelected;
          if (this.res[i][j].isSelected) {
            this.selectedDates.push(this.res[i][j].date);
            this.res2.push(this.res[i][j].date);
            this.selectedDates = Array.from(new Set(this.selectedDates));
          } else {
            this.selectedDates.splice(this.selectedDates.indexOf(item.date), 1);
          }
          this.$emit("dateSelected", this.selectedDates);
        });
      } else {
        // 滑动模式下，第一次点击是起始，第二次点击是结束
        const index = i * 7 + j;
        this.canMove = true;
        if (this.moveIndex.length === 1) {
          this.canMove = false;
        }
        if (this.moveIndex.length === 2) {
          this.showDays.forEach((item) => {
            item.isSelected = false;
            item.isRangeSelected = false;
          });
          this.canMove = true;
          this.moveIndex.length = 0;
        }
        this.moveIndex.push(index);
        this.moveIndex.sort((a, b) => a - b);
        this.selectedDates = this.showDays.slice(
          this.moveIndex[0],
          this.moveIndex[1] + 1
        );
        this.selectedDates.length !== 0 &&
          this.$emit("dateSelected", this.selectedDates);
      }
    },
    handleItemMove(data, i, j) {
      if (this.canMove && !this.selectedMode) {
        const index = i * 7 + j;
        this.showDays.forEach((item) => {
          item.isSelected = false;
          item.isRangeSelected = false;
        });
        // 让第一个日期和最后一个日期显示蓝色高亮
        this.showDays[index].isSelected = true;
        this.showDays[this.moveIndex[0]].isSelected = true;

        // 不同情况的判断，当用户的鼠标滑动进日期的索引小于起始日期的索引，要做if else处理
        if (this.moveIndex[0] < index) {
          for (let i = this.moveIndex[0] + 1; i < index; i++) {
            this.showDays[i].isRangeSelected = true;
          }
        } else {
          for (let i = index + 1; i < this.moveIndex[0]; i++) {
            this.showDays[i].isRangeSelected = true;
          }
        }
      }
    },
    handleQuickChange(type) {
      if (type === "prev") {
        this.curMonth--;
        if (this.curMonth === -1) {
          this.curMonth = 11;
          this.curYear -= 1;
        }
      } else if (type === "next") {
        this.curMonth++;
        if (this.curMonth === 12) {
          this.curMonth = 0;
          this.curYear += 1;
        }
      }
      this.$nextTick(() => {
          for (const i of this.res) {
            for (const j of i) {
              for (const k of this.res2) {
                if (j.date == k) {
                  j.isSelected = true;
                }
              }
            }
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
.calendar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.calendar-table {
  table-layout: fixed;
  border-collapse: collapse;
  transition: 0.3s;
  thead tr {
    height: 50px;
  }
  tbody tr {
    &:first-child td {
      border-top: 1px solid #08a8a0;
    }
    td {
      cursor: pointer;
      border-right: 1px solid #08a8a0;
      border-bottom: 1px solid #08a8a0;
      &:first-child {
        border-left: 1px solid #08a8a0;
      }
    }
  }
}

.notCurMonth {
  color: #c0c4cc;
}
.currentDay {
  color: #fff;
  background-color: #08a8a0;
}
.selectDay {
  color: #fff;
  background-color: #409eff;
}
.rangeSelectd {
  color: #606266;
  background-color: #dee2e9;
}
.weekend {
  color: #f73131;
}
</style>
