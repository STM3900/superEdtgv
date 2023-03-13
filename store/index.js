export const state = () => ({
  status: "idle",
  edtData: [],
  selectedColor: {},
  togglePanel: false,
  cacheActivate: true,
  person: {
    firstname: "",
    lastname: "",
    date: "",
  },
  theme: "",
  viewStatusCalendar: false,
  currentYear: "",
});

export const getters = {
  getStatus: (state) => {
    return state.status;
  },

  getEdtData: (state) => {
    return state.edtData;
  },

  getSelectedColor: (state) => {
    return state.selectedColor;
  },

  getTogglePanel: (state) => {
    return state.togglePanel;
  },

  getCacheActivate: (state) => {
    return state.cacheActivate;
  },

  getPerson: (state) => {
    return state.person;
  },

  getPersonFirstName: (state) => {
    return state.person.firstname;
  },

  getPersonLastName: (state) => {
    return state.person.lastname;
  },

  getPersonDate: (state) => {
    return state.person.date;
  },

  getTheme: (state) => {
    return state.theme;
  },

  getViewStatusCalendar: (state) => {
    return state.viewStatusCalendar;
  },

  getCurrentYear: (state) => {
    return state.currentYear;
  }
};

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },

  SET_EDT_DATA(state, edtData) {
    state.edtData = edtData;
  },

  SET_SELECTED_COLOR(state, selectedColor) {
    state.selectedColor = selectedColor;
  },

  SET_TOGGLE_PANEL(state, togglePanel) {
    state.togglePanel = togglePanel;
  },

  SET_CACHE_ACTIVATE(state, cacheActivate) {
    state.cacheActivate = cacheActivate;
  },

  SET_PERSON(state, person) {
    state.person = person;
  },

  SET_PERSON_FIRSTNAME(state, firstname) {
    state.person.firstname = firstname;
  },

  SET_PERSON_LASTNAME(state, lastname) {
    state.person.lastname = lastname;
  },

  SET_PERSON_DATE(state, date) {
    state.person.date = date;
  },

  SET_THEME(state, value) {
    state.theme = value;
  },

  SET_VIEW_STATUS_CALENDAR(state, value) {
    state.viewStatusCalendar = value;
  },

  SET_CURRENT_YEAR(state, value) {
    state.currentYear = value;
  }
};

export const actions = {
  changeStatus(context, status) {
    context.commit("SET_STATUS", status);
  },

  fetchCurentWeekEdtdata(context, payload) {
    context.commit("SET_STATUS", "loading");
    this.$axios
      .get(
        `https://api-calendar.calendz.app/v1/week?firstname=${
          payload.firstname
        }&lastname=${payload.lastname}${
          context.state.cacheActivate ? "" : "&ignoreCache=true"
        }`
      )
      .then((response) => {
        response.data.week
          ? Object.keys(response.data.week).length
            ? context.commit("SET_STATUS", "ready")
            : context.commit("SET_STATUS", "error")
          : context.commit("SET_STATUS", "error");

        context.commit("SET_EDT_DATA", response.data);
      });
  },

  fetchEdtdata(context, payload) {
    context.commit("SET_STATUS", "loading");
    this.$axios
      .get(
        `https://api-calendar.calendz.app/v1/week/${payload.date}?firstname=${
          payload.firstname
        }&lastname=${payload.lastname}${
          context.state.cacheActivate ? "" : "&ignoreCache=true"
        }`
      )
      .then((response) => {
        response.data.week
          ? Object.keys(response.data.week).length
            ? context.commit("SET_STATUS", "ready")
            : context.commit("SET_STATUS", "error")
          : context.commit("SET_STATUS", "error");

        context.commit("SET_EDT_DATA", response.data);
      });
  },

  changeSelectedColor(context, selectedColor) {
    context.commit("SET_SELECTED_COLOR", selectedColor);
  },

  changeTogglePanel(context, togglePanel) {
    context.commit("SET_TOGGLE_PANEL", togglePanel);
  },

  changeCacheActivate(context, cacheActivate) {
    context.commit("SET_CACHE_ACTIVATE", cacheActivate);
  },

  changePerson(context, payload) {
    context.commit(payload.label, payload.data);
  },

  changeTheme(context, value) {
    context.commit("SET_THEME", value);
  },

  changeViewStatusCalendar(context, value) {
    context.commit("SET_VIEW_STATUS_CALENDAR", value);
  },

  changeCurrentYear(context, year) {
    context.commit("SET_CURRENT_YEAR", year);
  }
};
