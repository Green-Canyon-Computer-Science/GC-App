<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Notifications</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Notifications</ion-title>
          </ion-toolbar>
        </ion-header>
        
        <!-- Title -->
        <ion-card>
          <ion-card-content>
            <strong style="font-size: 30px; line-height: 26px;">Notifications</strong>
          </ion-card-content>
        </ion-card>

        <!-- Settings -->

        <ion-card>
          <ion-card-content>
            <div class="setting-container">
              <ion-toggle v-model="pushValue" @click="handlePushChange" class="setting-toggle"></ion-toggle>
              <ion-label class="setting-label">
                <strong>Push Notifications</strong>
              </ion-label>
            </div>
            
            <hr>

            <div class="setting-container">
              <ion-toggle v-model="gameValue" @click="handleGameChange" class="setting-toggle"></ion-toggle>
              <ion-label class="setting-label smaller">
                <strong>Game Notifications</strong>
              </ion-label>
            </div>

            <div class="setting-container">
              <ion-toggle v-model="scheduleValue" @click="handleScheduleChange" class="setting-toggle"></ion-toggle>
              <ion-label class="setting-label smaller">
                <strong>Schedule Change Notifications</strong>
              </ion-label>
            </div>

            <div class="setting-container">
              <ion-toggle v-model="eventValue" @click="handleEventChange" class="setting-toggle"></ion-toggle>
              <ion-label class="setting-label smaller">
                <strong>Event Notifications</strong>
              </ion-label>
            </div>

          </ion-card-content>
        </ion-card>

      </ion-content>
    </ion-page>
  </template>
  
<script setup>

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton, IonToggle, IonCardContent, IonLabel} from '@ionic/vue';
import { reactive } from 'vue';
import { APIENDPOINT, getCookie, setCookie } from '../constants';

</script>


<script>
export default {

  
  data() {
    
    return {
      pushValue: false,
      gameValue: false,
      scheduleValue: false,
      eventValue: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerWidth / 1.77777
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    if (getCookie("notifications-push") == null) {
      setCookie("notifications-push", false);
    }
    if (getCookie("notifications-game") == null) {
      setCookie("notifications-game", false);
    }
    if (getCookie("notifications-schedule") == null) {
      setCookie("notifications-schedule", false);
    }
    if (getCookie("notifications-event") == null) {
      setCookie("notifications-event", false);
    }

    this.pushValue = getCookie("notifications-push") == "true";
    this.gameValue = getCookie("notifications-game") == "true";
    this.scheduleValue = getCookie("notifications-schedule") == "true";
    this.eventValue = getCookie("notifications-event") == "true";
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerWidth / 1.77777;
    },
    handlePushChange() {
      if (this.pushValue == true) {
        this.gameValue = false;
        this.scheduleValue = false;
        this.eventValue = false;
        setCookie("notifications-game", false);
        setCookie("notifications-schedule", false);
        setCookie("notifications-event", false);
      }
      if (this.pushValue == false) {
        if (this.gameValue == false && this.scheduleValue == false && this.eventValue == false) {
          this.gameValue = true;
          this.scheduleValue = true;
          this.eventValue = true;
        }
      }
      setCookie("notifications-push", this.pushValue);
    },
    handleGameChange() {
      if (this.pushValue == false) {
        this.pushValue = true;
        setCookie("notifications-push", true);
      }
      setCookie("notifications-game", this.gameValue);
    },
    handleScheduleChange() {
      if (this.pushValue == false) {
        this.pushValue = true;
        setCookie("notifications-push", true);
      }
      setCookie("notifications-schedule", this.scheduleValue);
    },
    handleEventChange() {
      if (this.pushValue == false) {
        this.pushValue = true;
        setCookie("notifications-push", true);
      }
      setCookie("notifications-event", this.eventValue);
    }
  }
}
</script>




<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 65px;
}

.video {
  --inner-padding-end: 5;
  --padding-start: 5;
}

#cards > * {
  border-radius: 15px;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #5c1e1e;
  margin: 0;
}

#container a {
  text-decoration: none;
}

ion-card {
  text-align: center;
}

.setting-container {
  display: flex;
  width: 100%;
  text-align: right;

}

.setting-toggle {
  float: left;
}

.setting-label {
  float: right;
  width: 80%;
  padding-top: 4px;
  font-size: 20px;
}

.smaller {
  font-size: 16px;
}

hr {
  background-color: #7a7a7a;
  height: 3px;
}

</style>
  