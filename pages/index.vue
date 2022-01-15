<template>
  <div>
    <h1>Super EDTGV</h1>
    <button @click="fetchEdtdata()">Get Data</button>
    <p>{{ getEdtData }}</p>
    <article class="edt-container">
      <section class="edt-case">
        <div v-for="(cours, i) in allCours" :key="i">
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
                <section>
                  {{ tab.subject }}
                </section>
                <section>
                  {{ tab.professor }}
                </section>
                <section>{{ tab.start }} - {{ tab.end }}</section>
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
  methods: {
    ...mapActions(["changeStatus", "fetchEdtdata"]),
  },
  data() {
    return {
      allCours: {
        lundi: [
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
        mardi: [
          {
            date: "11/01/2022",
            subject: "HEP\ncoopération\nDISTANCIEL",
            start: "08:00",
            end: "10:00",
            professor:
              '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>audebert christophe mac henri',
            room: "Aucune",
            weekday: "mardi",
            bts: false,
            remote: true,
            link: "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=C&date=01/11/2022&StartMeetingTeams=945390&StartMeetingTeamsHash=FEA72B8885D7636B15C95EA3D06FBB13C44475B084C305495B501EB7DCDE2DB821BDD1BB69EC0C1C628B335CD88584C55EE74519B6C7C6D8B99295AFC679B283&Tel=theo.migeat",
            presence: true,
          },
          {
            date: "11/01/2022",
            subject: "architecture applicative\nDISTANCIEL",
            start: "10:00",
            end: "12:00",
            professor:
              '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>mack mathieu',
            room: "Aucune",
            weekday: "mardi",
            bts: false,
            remote: true,
            link: "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=C&date=01/11/2022&StartMeetingTeams=946452&StartMeetingTeamsHash=C73EFC7832D0B1CB76866FEB4BF87D2BB61E5D9C3A7917D3A4AF5B7155FAF6A510D044D1734D6ADD84E4A3FA1AEA6B452B0E7171BE4CB1EC08F706F33AA5014F&Tel=theo.migeat",
            presence: true,
          },
          {
            date: "11/01/2022",
            subject: "architecture applicative\nDISTANCIEL",
            start: "13:00",
            end: "17:00",
            professor:
              '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>mack mathieu',
            room: "Aucune",
            weekday: "mardi",
            bts: false,
            remote: true,
            link: "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=C&date=01/12/2022&StartMeetingTeams=948239&StartMeetingTeamsHash=A67B62147386AB609A24852B63833B08A8017ACA82AB2947A7F12337C7A299221DA23EF76159EF0FEAE363A2C9AC89EBF7546275E29C2D7066526BDA216D1285&Tel=theo.migeat",
            presence: true,
          },
        ],
        mercredi: [
          {
            date: "12/01/2022",
            subject: "prise en main d'une ERP \nDISTANCIEL",
            start: "08:00",
            end: "12:00",
            professor:
              '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>leloup kim',
            room: "Aucune",
            weekday: "mercredi",
            bts: false,
            remote: true,
            presence: true,
          },
          {
            date: "12/01/2022",
            subject: "atelier:\npilotage d'un projet ERP\nDISTANCIEL",
            start: "13:00",
            end: "17:00",
            professor:
              '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>leloup kim',
            room: "Aucune",
            weekday: "mercredi",
            bts: false,
            remote: true,
            presence: true,
          },
        ],
        jeudi: [
          {
            date: "13/01/2022",
            subject: "Analyse des besoins & CDC\nDISTANCIEL",
            start: "08:00",
            end: "12:00",
            professor:
              '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>marxgut philippe',
            room: "Aucune",
            weekday: "jeudi",
            bts: false,
            remote: true,
            link: "https://edtmobiliteng.wigorservices.net/WebPsDyn.aspx?action=posEDTBEECOME&serverID=C&date=01/13/2022&StartMeetingTeams=954834&StartMeetingTeamsHash=6B59102CCA09CB3EAFAA008F1CD6D70520CDAF9F3E293846C40B0F048FEB83790ECA9CE05534D2A880BB2D0F66E3AE2A1E5D287704F78F81ACA0F4C75D0DE1AF&Tel=theo.migeat",
            presence: true,
          },
        ],
        vendredi: [
          {
            date: "14/01/2022",
            subject: "Archi générale & logicielle SE\ncv\nDISTANCIEL",
            start: "08:00",
            end: "12:00",
            professor:
              '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>carbillet jean-luc',
            room: "Aucune",
            weekday: "vendredi",
            bts: false,
            remote: true,
            presence: true,
          },
          {
            date: "14/01/2022",
            subject: "MSPR BLOC4 cv\nDISTANCIEL",
            start: "13:00",
            end: "17:00",
            professor:
              '<span style="float:right;"><img height="25px" src="http://photo-service.wigorservices.net/WIGOR/CADCOURSMIXTES/Presen_64-64.png" alt="Présenciel" title="Présenciel"></span>bal rémy ',
            room: "Aucune",
            weekday: "vendredi",
            bts: false,
            remote: true,
            presence: true,
          },
        ],
      },
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
      edtTab: [
        {
          type: "cours",
          coursLength: 4,
        },
        {
          type: "filler",
          coursLength: 1,
        },
        {
          type: "cours",
          coursLength: 4,
        },
        {
          type: "cours",
          coursLength: 2,
        },
        {
          type: "filler",
          coursLength: 1,
        },
      ],
    };
  },
  mounted() {
    this.allCours = Object.entries(this.allCours);
    this.allCours = this.generateAllCours(this.allCours);
    console.log(this.allCours);
  },
  methods: {
    convertTimeToInt(time) {
      return +time.substring(0, 2);
    },
    getCoursLength(cours) {
      return (
        this.convertTimeToInt(cours.end) - this.convertTimeToInt(cours.start)
      );
    },
    generateAllCours(tab) {
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
  border: solid 1px red;
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

  margin-top: 45px;
  height: 90%;

  margin-right: 2px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
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
  height: 100%;
  padding: 13px;

  text-transform: capitalize;
}

.edt-case div .filler {
  visibility: hidden;

  width: 100%;
}

table {
  width: 100%;
  border-spacing: 0px;

  font-family: "Quicksand", sans-serif;
}

thead th {
  text-align: left;
  padding-bottom: 10px;
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
