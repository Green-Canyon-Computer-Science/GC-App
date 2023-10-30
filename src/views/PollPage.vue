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

        <div ref="poll">
          <div v-for="index in polldata.polldata" :key="index" class="questioncard">
            <ion-card>
              <ion-card-header>                  
                  <ion-card-title class="title">
                    <span style="color: red; font-size: 30px;" v-if="index.required" class="required">* </span>
                    <h1 class="title">
                      {{ index.title }}
                    </h1>
                  </ion-card-title>
              </ion-card-header>

              <ion-card-content>
                <div v-if="index.type == 'checkbox'" class="questioninput typecheckbox">
                  <div v-for="choice in index.choices" :key="choice">
                    <ion-item>
                      <ion-label  style="position: relative; left: 5px;" class="label">{{choice}}</ion-label>
                      <ion-checkbox label-placement="start" class="checkbox response"></ion-checkbox>
                    </ion-item>
                  </div>
                </div>

                <div v-if="index.type == 'radio'" class="questioninput typeradio">
                  <ion-radio-group value>
                    <div v-for="choice in index.choices" :key="choice">
                      <ion-item>
                        <ion-radio slot="end" :value="choice" class="radio response"></ion-radio>
                        <ion-label class="label">{{choice}}</ion-label>

                      </ion-item>
                    </div>
                  </ion-radio-group>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>


        <ion-button style="position: relative; left: 50%; transform: translate(-50%);" @click="onSubmit">Submit Poll</ion-button>

      </ion-content>
    </ion-page>
  </template>
  
<script setup>
const title = reactive({});
const polldata = reactive({});
import { APIENDPOINT, setCookie, getCookie } from '../constants';
import { Device } from '@capacitor/device';

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

const getIndexedPoll = async () => {
  try {
    const result =  (await (await fetch(APIENDPOINT + "/pollsid?id=" + t, {method: "GET"})).json()).data;
    return result[0];
  } catch (e) {
    console.log(e);
  }
  return [];
}



getIndexedPoll().then((result) => {
  const jsonData = JSON.parse(JSON.parse(result.polldata));
  title.title = result.title;
  polldata.polldata = jsonData.poll
});


</script>

  <script>
import ArticleComp from '../components/ArticleComponent.vue';

import { toastController, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonButton, IonLabel, IonCheckbox, IonItem, IonRadio, IonRadioGroup, IonCardContent} from '@ionic/vue';
import { reactive } from 'vue';

export default {
  methods: {
    async presentToast(position) {
        const toast = await toastController.create({
          message: 'You have not answered all required questions',
          duration: 3000,
          position: position,
        });

        await toast.present();
      },
    async onSubmit() {
      const deviceid = await Device.getId();

      const pollContainer = this.$refs.poll;
      const questions = pollContainer.querySelectorAll('.questioncard');
      const response = [];

      let ret = false;

      // Loop over each questions
      questions.forEach(element => {

        const choices = [];

        const options = element.querySelectorAll(".label") // Gets all options
        const responses = element.querySelectorAll(".response") // gets all responses
        const title = element.querySelectorAll(".title") // gets all responses
        const required = element.querySelectorAll(".required") // gets all responses
        // const 

        // Loop over responses
        for (let i = 0; i < options.length; i ++) {
          if (responses[i].checked) {
            choices.push(options[i].innerHTML);
          }
        }
        if (choices.length == 0 && required.length > 0) {
          this.presentToast("bottom");
          ret = true;
          return;
        }
        // TODO: Make required questions *actually* required

        response.push({"choices": choices});

        });



        // Get index of poll
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
      if (ret == true) {
        return;
      }

      const t = qs["index"];

      fetch(APIENDPOINT + "/poll", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pollid: t,
          deviceid: deviceid.identifier,
          response: response
        })
      }).then(() => {
        if (getCookie("answered") == null || getCookie("answered") == "") {
          setCookie("answered", JSON.stringify([
            t
          ]));
        } else {
          const get = JSON.parse(getCookie("answered"));
          get.push(t);
          setCookie("answered", JSON.stringify(get));
        }
        window.location.href = "/polls";
      });
    }
  }
}

</script>

<style>
  h1 {
    text-align: center;
  }
  ion-toast {
    --background: #ececec;
    --color: #616161;
    font-size: 18px;
    --border-radius: 30px;
    text-align: center;
  }

</style>
  