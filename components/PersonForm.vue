<template>
  <article
    :class="
      getTogglePanel
        ? `person-form-show person-form person-form-${getTheme}`
        : `person-form-hide person-form person-form-${getTheme}`
    "
  >
    <section>
      <div>
        <label for="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          v-model="firstNameForm"
          v-on:keyup.enter="submitData"
        />
      </div>
      <div>
        <label for="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          v-model="lastNameForm"
          v-on:keyup.enter="submitData"
          v-on:input="testCalender"
        />
      </div>
      <div>
        <label for="date">Date</label>
        <input
          type="date"
          id=""
          date
          v-model="formDate"
          @change="prepareDate(formDate)"
          v-on:keyup.enter="submitData"
        />
      </div>
    </section>
    <div>
      <button
        v-if="!formDate"
        @click="submitData"
        :disabled="!getPersonFirstName || !getPersonLastName"
        :style="{
          background: getSelectedColor.normal,
          color: getSelectedColor.dark,
          borderColor: getSelectedColor.normal,
        }"
      >
        Chercher la semaine en cours
      </button>
      <button
        v-else
        @click="submitData"
        :disabled="!getPersonFirstName || !getPersonLastName"
        :style="{
          background: getSelectedColor.normal,
          color: getSelectedColor.dark,
          borderColor: getSelectedColor.normal,
        }"
      >
        Chercher la semaine
      </button>
      <button
        @click="resetStorage"
        :style="{
          color:
            getTheme == 'light'
              ? getSelectedColor.dark
              : getSelectedColor.normal,
          borderColor: getSelectedColor.normal,
        }"
      >
        Réinitialiser tes préférences
      </button>
    </div>

    <div class="color-wrapper">
      <ColorChanger />
      <CacheCheck />
    </div>
  </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PersonForm",
  data() {
    return {
      formDate: "",
      formYear: "",
    };
  },

  computed: {
    ...mapGetters([
      "getStatus",
      "getSelectedColor",
      "getTogglePanel",
      "getPerson",
      "getPersonFirstName",
      "getPersonLastName",
      "getTheme",
      "getCurrentYear"
    ]),

    firstNameForm: {
      get() {
        return this.getPersonFirstName;
      },
      set(name) {
        this.changePerson({ label: "SET_PERSON_FIRSTNAME", data: name });
      },
    },
    lastNameForm: {
      get() {
        return this.getPersonLastName;
      },
      set(name) {
        this.changePerson({ label: "SET_PERSON_LASTNAME", data: name });
      },
    },
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.changePerson({
        label: "SET_PERSON",
        data: JSON.parse(localStorage.getItem("user")),
      });

      setTimeout(() => {
        this.prepareDate(this.formDate);
        this.fetchCurentWeekEdtdata(this.formatName(this.getPerson));
      }, 1000);
    }

    this.formYear = this.getCurrentYear;
  },
  methods: {
    ...mapActions([
      "changeStatus",
      "fetchCurentWeekEdtdata",
      "fetchEdtdata",
      "changeSelectedColor",
      "changePerson",
      "changeViewStatusCalendar",
    ]),
    prepareDate(date) {
      // MM-JJ-AA
      this.formYear = date.substring(0, 4);
      const year = date.slice(2, 4);

      date = date.substring(5);
      date = `${date}-${year}`;

      this.changePerson({ label: "SET_PERSON_DATE", data: date });
    },
    formatName(person) {
      return {
        firstname: this.formatString(person.firstname),
        lastname: this.formatString(person.lastname),
        date: person.date,
      };
    },
    formatString(string) {
      return string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    },
    saveName() {
      localStorage.setItem("user", JSON.stringify(this.getPerson));
    },
    resetStorage() {
      this.changePerson({
        label: "SET_PERSON",
        data: { firstname: "", lastname: "", date: "" },
      });
      this.formDate = "";
      this.formYear = this.getCurrentYear;
      this.changeSelectedColor({
        normal: "hsl(200, 70%, 75%)",
        dark: "hsl(200, 70%, 15%)",
        class: "color5",
      });
      this.changeStatus("idle");
      localStorage.clear();
    },
    submitData() {
      if (this.getPersonFirstName && this.getPersonLastName) {
        !this.formDate
          ? this.fetchCurentWeekEdtdata(this.formatName(this.getPerson))
          : this.fetchEdtdata(this.formatName(this.getPerson));
        this.saveName();
      }
    },
    testCalender() {
      if (!this.getPersonLastName) {
        this.changeViewStatusCalendar(false);
      }
    },
  },
};
</script>

<style scoped>
/* person form */
.person-form-show {
  max-height: 120px;
  opacity: 1;
  padding: 20px;
}

.person-form-hide {
  max-height: 0;
  opacity: 0;
  padding: 0px 20px;
}

.person-form {
  overflow: hidden;
  max-width: 725px;

  transition: 0.3s;
  border: solid 1px;

  border-radius: 5px;
  margin-bottom: 15px;
}

.person-form-light {
  border-color: #e1e1e1;
}

.person-form-dark {
  border-color: rgb(50, 50, 50);
}

.person-form section {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;

  gap: 20px;

  margin-top: 10px;
  margin-bottom: 20px;
}

.person-form section div {
  position: relative;
}

.color-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.person-form section input {
  font-family: "Quicksand", sans-serif;
  background: none;

  /* haut | droit | bas | gauche */
  padding: 5px 2px 2px 2px;

  font-size: 16px;
  border: none;
  border-bottom: solid 1px;

  outline: none;
  transition: 0.3s;
}

.person-form-light section input {
  border-color: #e1e1e1;
  color: black;
}

.person-form-dark section input {
  border-color: rgb(50, 50, 50);
  color: rgb(220, 220, 220);
}

.person-form section input[type="date"] {
  /* haut | droit | bas | gauche */
  padding: 4px 2px 1px 2px;
}

.person-form-dark ::-webkit-calendar-picker-indicator {
  filter: invert(0.3);
  transition: 0.3s;
}

.person-form-light ::-webkit-calendar-picker-indicator {
  filter: invert(0.7);
  transition: 0.3s;
}

.person-form section label {
  font-family: "Quicksand", sans-serif;
  position: absolute;
  top: -8px;
  font-size: 10px;
  transition: 0.3s;
}

.person-form-light section label {
  color: black;
}

.person-form-dark section label {
  color: rgb(220, 220, 220);
}

.person-form button {
  font-family: "Quicksand", sans-serif;

  background: none;
  transition: 0.3s;
  padding: 8px 15px;

  border-radius: 5px;
  border: none;
  border: solid 1px;

  margin-bottom: 10px;
  transition: 0.3s;
}

.person-form-dark button {
  opacity: 1;
}

.person-form button:disabled {
  opacity: 0.5;
  transform: scale(0.99);
}

.person-form button:not(:active):not(:disabled):hover {
  cursor: pointer;
  transform: scale(0.99);
}

.person-form button:active {
  transform: scale(0.93);
}

/* RESPONSIVE */
@media screen and (max-width: 670px) {
  .person-form-show {
    max-height: 250px; /* à changer */
  }
}

@media screen and (max-width: 460px) {
  .person-form section {
    flex-direction: column;
    align-items: flex-start;
  }

  .person-form section div {
    width: 100%;
  }

  .person-form section input {
    width: 100%;
  }
}

@media screen and (max-width: 400px) {
  .person-form-show {
    padding: 20px 15px;
  }

  .person-form section label {
    font-size: 8px;
  }

  .person-form section input {
    font-size: 12px;
  }

  .person-form button {
    font-size: 12px;
  }

  .person-form section div:last-child label {
    top: -9px;
  }
}
</style>
