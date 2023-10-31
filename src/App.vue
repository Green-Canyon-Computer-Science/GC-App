<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list" style="border-radius: 15px;">
            <!-- <ion-list-header>Green Canyon</ion-list-header> -->
            <!-- <ion-note>Testing</ion-note> -->

            <img src="https://www.ccsdut.org/cms/lib/UT02205719/Centricity/Domain/694/GreenCanyonWolves%20with%20Wolf%20Graphic.png" style="width: 70%; position: relative; left: 50%; transform: translate(-50%);">
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
          <div class="bottom-links">
            <ion-item style=" border-radius: 25px 25px 0px 0px;" onclick="window.open('https://www.ccsdut.org/domain/464', '_system', 'location=yes'); return false;">
              <ion-icon aria-hidden="true" slot="start" :md="linkSharp"></ion-icon>
              <ion-label>Quick Links</ion-label>
            </ion-item>
          </div>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup>

import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { ref } from 'vue';
import {
  newspaperSharp,
  tvSharp,
  homeSharp,
  megaphoneSharp,
  calendarSharp,
  linkSharp,
  notificationsSharp
} from 'ionicons/icons';


// NOTIFICATIONS
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { FCM } from "@capacitor-community/fcm";
import { APIENDPOINT, getCookie, setCookie } from './constants';

const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');

async function notifs() {

  if (isPushNotificationsAvailable) {
    await PushNotifications.requestPermissions();
    await PushNotifications.register();
    await PushNotifications.removeAllDeliveredNotifications()
  } 

  console.log("Subscribed to all!");
  if (getCookie("notifications-push") == null && isPushNotificationsAvailable) {
    FCM.subscribeTo({ topic: "all" })
    FCM.subscribeTo({ topic: "game" })
    FCM.subscribeTo({ topic: "schedule" })
    FCM.subscribeTo({ topic: "event" })
  }
}
notifs();
// END NOTIFICATIONS

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeSharp,
    mdIcon: homeSharp,
  },
  {
    title: 'Announcements',
    url: '/announcements',
    iosIcon: megaphoneSharp,
    mdIcon: megaphoneSharp,
  },
  {
    title: 'GCTV',
    url: '/gctv',
    iosIcon: tvSharp,
    mdIcon: tvSharp,
  },
  {
    title: 'Polls',
    url: '/polls',
    iosIcon: newspaperSharp,
    mdIcon: newspaperSharp,
  },
  {
    title: 'Week Schedule',
    url: '/schedule',
    iosIcon: calendarSharp,
    mdIcon: calendarSharp,
  }
  ,
  {
    title: 'Notifications',
    url: '/notifs',
    iosIcon: notificationsSharp,
    mdIcon: notificationsSharp,
  }
];
const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
const indecies= {
  "home": 0,
  "announcements": 1,
  "article": 1,
  "gctv": 2,
  "polls": 3,
  "poll": 3,
  "schedule": 4
}
const path = window.location.pathname.replace("/", "");
selectedIndex.value = indecies[path];


function randomPos () {

    const randomX = Math.random() * 200; // Random X position
    const randomY = Math.random() * 500; // Random Y position
    const randomRotation = Math.random() * 360; // Random rotation angle
    const scale = (Math.random() * 0.5) + 0.5;

    return `position: absolute; transform: translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg) scale(${scale})`;
}



</script>

<style>
  ion-menu ion-content {
    --background: var(--ion-item-background, var(--ion-background-color, rgb(34, 93, 79)));
  }

  ion-content {
    --background: #fff linear-gradient(to top, rgba(16, 64, 52, 1), transparent);
  }

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: calc(env(safe-area-inset-top) + 8px);
  --padding-bottom: 20px;
}

.bottom-links {
  position: absolute;
  bottom: 0;
  margin: 0;
  padding: 0;
  height: 50px;
  width: calc(304px - 16px);
  border-bottom: 2px solid white;        
}
@media (max-width: 340px) {
  .bottom-links {
    width: calc(264px - 16px);
  }  
}


ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #6ac34a);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #b71010;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #8c9bae;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
