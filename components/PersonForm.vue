<template>
  <article
    :class="
      getTogglePanel
        ? 'person-form-show person-form'
        : 'person-form-hide person-form'
    "
  >
    <section>
      <div>
        <label for="firstname">Prénom</label>
        <input type="text" id="firstname" v-model="firstNameForm" />
      </div>
      <div>
        <label for="lastname">Nom</label>
        <input type="text" id="lastname" v-model="lastNameForm" />
      </div>
      <div>
        <label for="date">Date</label>
        <input
          type="date"
          id=""
          date
          v-model="formDate"
          @change="prepareDate(formDate)"
        />
      </div>
    </section>
    <div>
      <button
        v-if="!formDate"
        @click="
          fetchCurentWeekEdtdata(formatName(getPerson));
          saveName();
        "
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
        @click="
          fetchEdtdata(formatName(getPerson));
          saveName();
        "
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
          color: getSelectedColor.dark,
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
      formYear: "2022",
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
      if (localStorage.getItem("userDate")) {
        this.formDate = JSON.parse(localStorage.getItem("userDate"));
      }

      setTimeout(() => {
        !localStorage.getItem("userDate")
          ? (this.prepareDate(this.formDate),
            this.fetchCurentWeekEdtdata(this.formatName(this.getPerson)))
          : this.fetchEdtdata(this.formatName(this.getPerson));
      }, 1000);
    }
  },
  methods: {
    ...mapActions([
      "changeStatus",
      "fetchCurentWeekEdtdata",
      "fetchEdtdata",
      "changeSelectedColor",
      "changePerson",
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
      localStorage.setItem("userDate", JSON.stringify(this.formDate));
    },
    resetStorage() {
      this.changePerson({
        label: "SET_PERSON",
        data: { firstname: "", lastname: "", date: "" },
      });
      this.formDate = "";
      this.formYear = "2022";
      this.changeSelectedColor({
        normal: "hsl(200, 70%, 75%)",
        dark: "hsl(200, 70%, 15%)",
        class: "color5",
      });
      this.changeStatus("idle");
      localStorage.clear();
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
  border: solid 1px #e1e1e1;

  border-radius: 5px;
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

  /* haut | droit | bas | gauche */
  padding: 5px 2px 2px 2px;

  font-size: 16px;
  border: none;
  border-bottom: solid 1px black;

  outline: none;
}

.person-form section input[type="date"] {
  /* haut | droit | bas | gauche */
  padding: 4px 2px 1px 2px;
}

.person-form section label {
  font-family: "Quicksand", sans-serif;
  position: absolute;
  top: -8px;
  font-size: 10px;
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
</style>
