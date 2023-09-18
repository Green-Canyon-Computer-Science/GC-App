<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>Polls</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Polls</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <div id="cards">
          <div v-for="(p, i) in polls" :key="i">

            <ion-card>
              <ion-card-header>
                <ion-card-title> {{ p.title }} </ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ p.desc }}
              </ion-card-content>
              
              <div id="voteButton">
                <ion-button :href="'/poll?index=' + i" :disabled="p.disabled" id="vote" >{{ p.button }}</ion-button>
              </div>
            </ion-card>

          </div>

          
        </div>
        
  
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard } from '@ionic/vue';
import { reactive } from 'vue';
  const polls = reactive([]);

  const getPolls = async () => {
    const result = await (await fetch("http://192.168.0.124:3000/polls", {method: "GET"})).json();
    return result;
  };

  getPolls().then((result) => {
    polls.splice(0, polls.length, ...result)
  })

  </script>
  
  <style>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 65px;
  }
  #vote {
  }
  #voteButton {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  #cards {
  
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
  