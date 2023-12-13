<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Weekly Schedule</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Schedule</ion-title>
          </ion-toolbar>
        </ion-header>        
        
        <img :src=" APIENDPOINT + '/weekly'" style="width: 100% !important;">

        <div class="fullimage">
          <a :href=" APIENDPOINT + '/weekly'" style="width: 100%; text-align: center; display: block;">
            <strong>Click here for full image</strong>
          </a>
        </div>

      
      </ion-content>
    </ion-page>
  </template>
  
<script setup>

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton } from '@ionic/vue';
import { reactive } from 'vue';
import { APIENDPOINT } from '../constants';

</script>


<script>

export default {
  data() {
    
    return {
      windowWidth: window.innerWidth,
      windowHeight: window.innerWidth / 1.77777
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    onPinch(event) {
      this.scale = event.scale;
      this.transform = `scale(${this.scale})`;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerWidth / 1.77777;
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

.fullimage {
  background-color: white; 
  margin-left: 15px; 
  margin-right: 15px; 
  padding: 10px; 
  border-radius: 15px; 
  box-shadow: 0px 5px 11px -5px rgba(0,0,0,0.75);
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
</style>
  