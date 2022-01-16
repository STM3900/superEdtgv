<template>
  <div>
    <h1>Super EDTGV</h1>
    <button @click="fetchEdtdata()">Get Data</button>
    <p>{{ getStatus }}</p>
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
                  {{ tab.professor }}
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <table>
        <thead>
          <th>&nbsp;</th>
          <th>Lundi</th>
          <th>Mardi</th>
          <th>Mercredi</th>
          <th>Jeudi</th>
          <th>Vendredi</th>
        </thead>
        <tbody>
          <tr>
            <td>8h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>9h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>10h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>11h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>12h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>13h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>14h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>15h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>16h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>17h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>18h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>19h</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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
            date: "10/01/2022",
    return {};
  },
  methods: {
    ...mapActions(["changeStatus", "fetchEdtdata"]),
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
        if (previousCours) {
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
}

thead th {
  text-align: left;
  padding-bottom: 10px;
  font-size: 20px;
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
