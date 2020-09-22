<template>
  <v-container class="container--main">
    <v-row class="justify-space-around" no-gutters>
      <h1 class="mb-3">Personopplysninger</h1>
    </v-row>
    <v-form v-model="validForm">
      <v-row class="justify-center">
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            Fornavn <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              background-color="white"
              prepend-inner-icon="fas fa-user fa-fw"
              v-model="formValues.firstName"
              :rules="formRules.required"
          />
        </v-col>
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            Etternavn <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              background-color="white"
              prepend-inner-icon="fas fa-user fa-fw"
              v-model="formValues.surName"
              :rules="formRules.required"
          />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            Mobilnummer <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              background-color="white"
              prepend-inner-icon="fas fa-phone fa-fw"
              v-model="formValues.phoneNumber"
              :rules="[...formRules.required, ...formRules.phone]"
          />
        </v-col>
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            E-postadresse <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              background-color="white"
              prepend-inner-icon="fas fa-at fa-fw"
              v-model="formValues.email"
              :rules="[...formRules.required, ...formRules.email]"
          />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            Postnummer <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              background-color="white"
              prepend-inner-icon="fas fa-map fa-fw"
              v-model="formValues.zipCode"
              :rules="[...formRules.required, ...formRules.zipCode]"
          />
        </v-col>
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            Adresse <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              background-color="white"
              prepend-inner-icon="fas fa-map-marker-alt fa-fw"
              v-model="formValues.address"
              :rules="formRules.required"
          />
        </v-col>
      </v-row>
    </v-form>
    <v-row class="justify-center" no-gutters>
      <v-tooltip :disabled="validForm" max-width="200" bottom>
        <template v-slot:activator="{ on }">
          <div v-on="on">
             <v-btn
                 color="#3060AE"
                 class="white--text"
                 @click="createUser"
             >
             Opprett bruker
           </v-btn>
          </div>
        </template>
        <span>Fyll ut informasjonen ovenfor for å sende data</span>
      </v-tooltip>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import HelloWorld from '../components/HelloWorld.vue'
  import {FormKeys} from 'nettbureau_common'
  import {sendUserData} from '../api/UserApi'

  @Component({
    components: { HelloWorld }
  })
  export default class Home extends Vue {
    validForm = false

    formValues: Record<FormKeys, string> = {
      [FormKeys.FirstName]: '',
      [FormKeys.SurName]: '',
      [FormKeys.PhoneNumber]: '',
      [FormKeys.Email]: '',
      [FormKeys.ZipCode]: '',
      [FormKeys.Address]: '',
    }

    formRules = {
      required: [
        (v: string) => !/^\s*$/.test(v) || 'Feltet er påkrevd'
      ],
      email: [
        (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Må være en gyldig e-postadresse'
      ],
      phone: [
        (v: string) => /^\d+$/.test(v) || 'Kun tall i mobilnummeret',
        (v: string) => v.length === 8 || 'Mobilnummeret må være 8 karakterer langt'
      ],
      zipCode: [
        (v: string) => /^\d+$/.test(v) || 'Kun tall i postnummeret',
        (v: string) => v.length === 4 || 'Mobilnummeret må være 4 karakterer langt'
      ]
    }

    createUser() {
      sendUserData(this.formValues)
        .then(() => {
          // Do something
        }).catch(e => {
          // Do something
      })
    }
  }
</script>
<style lang="sass">
  .container--main
    display: flex
    flex-direction: column
    position: absolute
    max-width: 1000px
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
</style>

