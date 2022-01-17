<template>
  <div>
    <h1>Super EDTGV</h1>
    <input type="text" placeholder="Prénom" v-model="person.firstname" />
    <input type="text" placeholder="Nom" v-model="person.lastname" />
    <input
      type="date"
      placeholder="Date (MM-JJ-AA)"
      v-model="formDate"
      @change="prepareDate(formDate)"
    />

    <br /><br />
    <button
      v-if="!formDate"
      @click="
        fetchCurentWeekEdtdata(person);
        saveName();
      "
      :disabled="!person.firstname || !person.lastname"
    >
      Get current week
    </button>
    <button
      v-else
      @click="
        fetchEdtdata(person);
        saveName();
      "
      :disabled="!person.firstname || !person.lastname"
    >
      Get week
    </button>
    <button @click="resetStorage">reset localstorage</button>
    <p>Status : {{ getStatus }}</p>
    <article class="edt-container">
      <section v-if="getStatus == 'ready'" class="edt-case">
        <div
          v-for="(cours, i) in generateAllCours(getEdtData.week)"
          :key="i"
          :style="{ animationDelay: `${0.1 * i}s` }"
        >
          <div
            v-for="(tab, i) in cours"
            :key="i"
            :class="tab.type == 'cours' ? 'cours' : 'filler'"
            :style="{
              height: `calc(100% / 12 * ${tab.coursLength})`,
            }"
          >
            <div>
              <div>
                <section class="edt-time">
                  {{ tab.start }} - {{ tab.end }}
                </section>
                <section class="edt-subject">
                  {{ tab.subject }}
                </section>
                <section class="edt-prof">
                  <span>
                    {{ tab.professor }}
                  </span>
                  <a v-if="tab.link" :href="tab.link" target="_blank">
                    <fa class="icon-link" icon="link"
                  /></a>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
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
              {{ i + 7 }}h
            </td>
            <td v-for="i in 5" :key="i" class="table-normal-columns"></td>
          </tr>
        </tbody>
      </table>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "IndexPage",
  computed: {
    ...mapGetters(["getStatus", "getEdtData"]),
  },
  data() {
    return {
      person: {
        firstname: "",
        lastname: "",
        date: "",
      },
      formDate: "",
      formYear: "2022",
      weekDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    };
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.person = JSON.parse(localStorage.getItem("user"));
      if (localStorage.getItem("userDate")) {
        this.formDate = JSON.parse(localStorage.getItem("userDate"));
      }

      setTimeout(() => {
        !localStorage.getItem("userDate")
          ? (this.prepareDate(this.formDate),
            this.fetchCurentWeekEdtdata(this.person))
          : this.fetchEdtdata(this.person);
      }, 1000);
    }
  },
  methods: {
    ...mapActions(["changeStatus", "fetchCurentWeekEdtdata", "fetchEdtdata"]),
    getDateOfDay(index) {
      let startDate = this.getDateOfISOWeek(
        this.getEdtData.weekNumber,
        this.formYear
      );
      startDate.setDate(startDate.getDate() + index);

      return this.formatDate(startDate);
    },
    formatDate(d) {
      return [d.getDate(), d.getMonth() + 1]
        .map((n) => (n < 10 ? `0${n}` : `${n}`))
        .join("/");
    },
    getDateOfISOWeek(w, y) {
      var simple = new Date(y, 0, 1 + (w - 1) * 7);
      var dow = simple.getDay();
      var ISOweekStart = simple;
      if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
      else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
      return ISOweekStart;
    },
    prepareDate(date) {
      // MM-JJ-AA
      this.formYear = date.substring(0, 4);
      const year = date.slice(2, 4);

      date = date.substring(5);
      date = `${date}-${year}`;

      this.person.date = date;
    },

    convertTimeToInt(time) {
      return +time.substring(0, 2);
    },
    getCoursLength(cours) {
      return (
        this.convertTimeToInt(cours.end) - this.convertTimeToInt(cours.start)
      );
    },
    generateAllCours(tab) {
      tab = Object.entries(tab);

      let finalTab = [];
      for (let i = 0; i < tab.length; i++) {
        finalTab.push(this.generateTab(tab[i][1]));
      }

      return finalTab;
    },
    generateTab(tab) {
      let finalTab = [];
      let previousCours;
      let hoursRemaining = 12;

      for (let i = 0; i < tab.length; i++) {
        let tabObj = {};
        if (i == 0 && this.convertTimeToInt(tab[i].start) != 8) {
          const timeBeforeCours = this.convertTimeToInt(tab[i].start) - 8;

          finalTab.push({ type: "filler", coursLength: timeBeforeCours });
          hoursRemaining -= timeBeforeCours;
        } else if (previousCours) {
          const timeBetweenCours =
            this.convertTimeToInt(tab[i].start) -
            this.convertTimeToInt(previousCours.end);
          if (timeBetweenCours > 0) {
            finalTab.push({ type: "filler", coursLength: timeBetweenCours });
            hoursRemaining -= timeBetweenCours;
          }
        }
        tabObj.type = "cours";
        tabObj.coursLength = this.getCoursLength(tab[i]);
        tabObj.subject = tab[i].subject;
        tabObj.professor = this.truncateProfTag(tab[i].professor);
        tabObj.start = tab[i].start;
        tabObj.end = tab[i].end;
        tabObj.link = tab[i].link;

        finalTab.push(tabObj);
        hoursRemaining -= tabObj.coursLength;
        previousCours = tab[i];
      }

      if (hoursRemaining) {
        finalTab.push({ type: "filler", coursLength: hoursRemaining });
      }

      return finalTab;
    },
    truncateProfTag(str) {
      return str.replace(/ *\<[^)]*\> */g, "");
    },
    saveName() {
      localStorage.setItem("user", JSON.stringify(this.person));
      localStorage.setItem("userDate", JSON.stringify(this.formDate));
    },
    resetStorage() {
      localStorage.clear();
    },
  },
};
</script>

<style scoped>
body {
  font-family: "Quicksand", sans-serif;
}

h1 {
  font-family: "Quicksand", sans-serif;
}

.edt-container {
  /* border: solid 1px red; */
  max-width: 1500px;

  margin-top: 25px;
  margin-left: 20px;
  position: relative;
}

.edt-case {
  position: absolute;

  width: calc(100% - 45px);
  margin-left: 45px;

  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;

  z-index: 2;
}

.edt-case > div {
  width: calc(20% - 2px);

  margin-top: 36px;
  height: calc(100% - 37px);

  margin-right: 2px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;

  transition: 0.3s;
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.edt-case div .cours {
  width: 100%;
  margin-bottom: 1px;
}

.edt-case div .cours > div {
  background: #1689be;
  border-radius: 5px;
  height: 100%;

  margin-left: 3px;
  margin-right: 3px;
}

.edt-case div .cours > div > div {
  font-family: "Quicksand", sans-serif;
  color: white;
  height: 85%;
  padding: 13px;

  text-transform: capitalize;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-content: center;
}

.edt-time {
  font-size: 12px;
}

.edt-subject {
  align-self: center;
  text-align: center;
}

.edt-prof {
  font-size: 12px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.edt-prof a {
  color: white;
}

.edt-case div .filler {
  visibility: hidden;

  width: 100%;
}

table {
  width: 100%;
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
}

.table-hours {
  transition: 0.3s;
  transform: translateX(-5px);
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  0% {
    transform: translateX(-5px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
