export const state = () => ({
  status: "idle",
  edtData: [],
  selectedColor: {},
  togglePanel: false,
  cacheActivate: false,
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
          context.state.cacheActivate ? "&ignoreCache=true" : ""
        }`
      )
      .then((response) => {
        Object.keys(response.data.week).length
          ? context.commit("SET_STATUS", "ready")
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
          context.state.cacheActivate ? "&ignoreCache=true" : ""
        }`
      )
      .then((response) => {
        Object.keys(response.data.week).length
          ? context.commit("SET_STATUS", "ready")
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
};
