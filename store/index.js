export const state = () => ({
  status: "idle",
  edtData: [],
  selectedColor: {},
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
};

export const actions = {
  changeStatus(context, status) {
    context.commit("SET_STATUS", status);
  },

  fetchCurentWeekEdtdata(context, payload) {
    context.commit("SET_STATUS", "loading");
    this.$axios
      .get(
        `https://api-calendar.calendz.app/v1/week?firstname=${payload.firstname}&lastname=${payload.lastname}`
      )
      .then((response) => {
        context.commit("SET_STATUS", "ready");
        context.commit("SET_EDT_DATA", response.data);
      });
  },

  fetchEdtdata(context, payload) {
    context.commit("SET_STATUS", "loading");
    this.$axios
      .get(
        `https://api-calendar.calendz.app/v1/week/${payload.date}?firstname=${payload.firstname}&lastname=${payload.lastname}`
      )
      .then((response) => {
        context.commit("SET_STATUS", "ready");
        context.commit("SET_EDT_DATA", response.data);
      });
  },

  changeSelectedColor(context, selectedColor) {
    context.commit("SET_SELECTED_COLOR", selectedColor);
  },
};
