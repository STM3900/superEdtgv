<template>
  <div>
    <h1>Super EDTGV</h1>
    <button @click="fetchEdtdata()">Get Data</button>
    <p>{{ getEdtData }}</p>
    <article class="edt-container">
      <section class="edt-case">
        <div>
          <div class="cours">bjr</div>
          <div class="filler"></div>
          <div class="cours">bjr</div>
          <div class="cours">bjr</div>
          <div class="cours">bjr</div>
          <div class="filler"></div>
          <div class="cours">bjr</div>
          <div class="cours">bjr</div>
          <div class="cours">bjr</div>
          <div class="filler"></div>
          <div class="filler"></div>
          <div class="cours">bjr</div>
        </div>
        <div><div class="cours">bjr</div></div>
        <div></div>
        <div><div class="cours">bjr</div></div>
        <div><div class="cours">bjr</div></div>
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
  methods: {
    ...mapActions(["changeStatus", "fetchEdtdata"]),
  },
  data() {
    return {
      cours: [
        {
          date: "10/01/2022",
          subject: "Archi générale & logicielle SE\nDISTANCIEL",
          start: "08:00",
          end: "12:00",
          professor:
            '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>carbillet jean-luc',
          room: "Aucune",
          weekday: "lundi",
          bts: false,
          remote: true,
          link: "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=C&date=01/10/2022&StartMeetingTeams=940733&StartMeetingTeamsHash=103F20F2D74638E912AD44822871DD14A8AD32FBDBFB5F1A417E93A128DFC28467DDE07525E25CCA84D36DEA5762A88FB98D189F8C3D3B6F7D5A5805BD5C7D67&Tel=theo.migeat",
          presence: true,
        },
        {
          date: "10/01/2022",
          subject: "Analyse des besoins\net\ncahier des charges \nDISTANCIEL",
          start: "13:00",
          end: "17:00",
          professor:
            '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>marxgut philippe',
          room: "Aucune",
          weekday: "lundi",
          bts: false,
          remote: true,
          link: "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=C&date=01/10/2022&StartMeetingTeams=942417&StartMeetingTeamsHash=20279D7D94287994BD865CF83F40BBCF1F19AF036C8E8ED900502BD0D6DCE2582A17C77D4D31D9F5F89C912195203182ABB8AC24927B9E21BA1DCA979E2F599E&Tel=theo.migeat",
          presence: true,
        },
        {
          date: "10/01/2022",
          subject: "hep-coopéeration e learning \nDISTANCIEL",
          start: "17:00",
          end: "19:00",
          professor:
            '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>zanconi marcelo',
          room: "Aucune",
          weekday: "lundi",
          bts: false,
          remote: true,
          link: "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=C&date=01/11/2022&StartMeetingTeams=944697&StartMeetingTeamsHash=F42FAA61F8580BADE4FB7B30C0DF7216B2A4C7731DDA20B3638E3C8CA85052D0252B0A87907D5BE8DD5AF8CE16C668A23280BE7B8DF893DE83AF1C218F849E7D&Tel=theo.migeat",
          presence: true,
        },
      ],
      dataTab: [],
      espaceTab: [],
    };
  },
  mounted() {
    for (let i = 0; i < this.cours.length; i++) {
      this.espaceTab.push(
        this.convertTimeToInt(this.cours[i].end) -
          this.convertTimeToInt(this.cours[i].start)
      );
    }

    console.log(this.espaceTab);
    this.getIterations(this.espaceTab);
  },
  methods: {
    convertTimeToInt(time) {
      return +time.substring(0, 2);
    },
    getIterations(tab) {
      let iterations = 12;
      for (let i = 0; i < tab.length; i++) {
        iterations -= tab[i];
      }

      console.log(iterations);
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
  border: solid 1px red;
  max-width: 1500px;

  margin-top: 25px;
  margin-left: 20px;
  position: relative;
}

.edt-case {
  position: absolute;
  background: red;

  width: calc(100% - 45px);
  margin-left: 45px;

  height: 100%;
  opacity: 0.3;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
}

.edt-case > div {
  width: calc(20% - 2px);

  background: blue;
  margin-top: 50px;
  height: 90%;

  margin-right: 2px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
}

.edt-case div .cours {
  color: red;
  background: green;

  width: 100%;
  height: calc(100% / 12);
}

.edt-case div .filler {
  visibility: hidden;

  width: 100%;
  height: calc(100% / 12);
}

table {
  width: 100%;
  border-spacing: 0px;

  font-family: "Quicksand", sans-serif;
}

thead th {
  text-align: left;
  padding-bottom: 25px;
  font-size: 20px;
}

tbody tr td {
  border-right: solid 1px #e1e1e1;
  width: 20%;
  padding: 10px;
}

tbody tr td:first-child {
  width: auto;
}
</style>
