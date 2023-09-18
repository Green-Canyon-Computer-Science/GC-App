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
            <ion-title size="large">{{ title.title }}</ion-title>
          </ion-toolbar>
        </ion-header>

        
        <div v-for="index in polldata.polldata" :key="index">
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ index.title }}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              <div v-if="index.type == 'checkbox'">
                <div v-for="choice in index.choices" :key="choice">
                  <ion-checkbox :id="choice"></ion-checkbox>
                  <label :for="choice" style="position: relative; bottom: 2px;">{{ "  " + choice }}</label>
                </div>
              </div>

              <div v-if="index.type == 'radio'">
                <ion-radio-group value>
                  <div v-for="choice in index.choices" :key="choice">
                    <ion-item>
                      <ion-radio slot="end" :value="choice"></ion-radio>
                      <ion-label>{{choice}}</ion-label>

                    </ion-item>
                  </div>
                </ion-radio-group>
              </div>
            </ion-card-content>
          </ion-card>
        </div>


        <ion-button style="position: relative; left: 50%; transform: translate(-50%);">Submit Poll</ion-button>



      </ion-content>
    </ion-page>
  </template>
  
<script setup>
  const title = reactive({});
  const polldata = reactive({});
  const polls = reactive([]); 

  const getNewAnn = async () => {
    const result =  await (await fetch("http://192.168.0.124:3000/polls", {method: "GET"})).json();
    console.log(result);
    return result;
  }

  const qs = (function(a) {
    if (a == "") return {};
    const b = {};
    for (let i = 0; i < a.length; ++i)
    {
        const p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));


  const t = qs["index"];

  getNewAnn().then((result) => {
    polls.splice(0, polls.length, ...result);
    title.title = polls[t].title;
    polldata.polldata = JSON.parse(polls[t].polldata).poll
    console.log(title);
  });


</script>

  <script>
import ArticleComp from './ArticleTemp.vue';

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { reactive } from 'vue';

</script>

<style>
ion-radio {
  --border-radius: 4px;
  --inner-border-radius: 4px;

  --color: #ddd;
  /* --color-checked: #6815ec; */
}

ion-radio.ios {
  width: 20px;
  height: 20px;

  border: 2px solid #ddd;
  border-radius: 4px;
}

.radio-checked.ios {
  border-color: rgb(34, 93, 79);
}
</style>
  