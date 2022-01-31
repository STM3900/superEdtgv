<template>
  <table>
    <thead>
      <th>&nbsp;</th>
      <th v-for="(day, i) in weekDays" :key="day">
        <span :style="{ animationDelay: `${0.3 + 0.07 * i}s` }">
          {{ day }}
        </span>
        <span
          v-if="getStatus == 'ready'"
          :style="{ animationDelay: `${0.1 * i}s` }"
          >{{ getDateOfDay(i) }}</span
        >
      </th>
    </thead>
    <tbody>
      <tr v-for="i in 12" :key="i">
        <td
          class="table-hours"
          :style="{ animationDelay: `${0.4 + 0.07 * i}s` }"
        >
          <p>{{ i + 7 }}h</p>
        </td>
        <td v-for="i in 5" :key="i" class="table-normal-columns"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EdtTable",
  props: {
    formYear: String,
  },
  data() {
    return { weekDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"] };
  },
  computed: {
    ...mapGetters(["getStatus", "getEdtData"]),
  },
  methods: {
    getDateOfISOWeek(w, y) {
      var simple = new Date(y, 0, 1 + (w - 1) * 7);
      var dow = simple.getDay();
      var ISOweekStart = simple;
      if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
      else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
      return ISOweekStart;
    },
    formatDate(d) {
      return [d.getDate(), d.getMonth() + 1]
        .map((n) => (n < 10 ? `0${n}` : `${n}`))
        .join("/");
    },
    getDateOfDay(index) {
      let startDate = this.getDateOfISOWeek(
        this.getEdtData.weekNumber,
        this.formYear
      );
      startDate.setDate(startDate.getDate() + index);

      return this.formatDate(startDate);
    },
  },
};
</script>

<style scoped>
table {
  border-spacing: 0px;
  min-height: 650px;

  font-family: "Quicksand", sans-serif;
  transition: 0.3s;
  z-index: 1;
}

thead th {
  text-align: left;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 500;
}

thead th span,
.table-normal-columns {
  transition: 0.3s;
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

tbody tr td {
  width: 20%;
  padding: 10px;
}

tbody tr td:not(:last-child) {
  border-right: solid 1px #e1e1e1;
}

tbody tr td:first-child {
  width: auto;
  padding: 0px 10px 20px 10px;
  text-align: right;
}

tbody tr td:first-child p {
  margin: 0;
  margin-top: -15px;
}

.table-hours {
  transition: 0.3s;
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@media screen and (max-width: 1265px) {
  table {
    width: 1200px;
  }
}

@media screen and (max-width: 400px) {
  thead th {
    font-size: 18px;
  }

  tbody tr td {
    font-size: 14px;
  }
}
</style>
