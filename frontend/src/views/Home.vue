<template>
  <div class="container--main">
    <v-row class="flex-column justify-end align-center mb-5" no-gutters>
      <h1 class="pb-1">Personopplysninger</h1>
      <span class="font-weight-light">dataene sendes til io@nettbureau.no</span>
    </v-row>
    <v-form ref="form" v-model="validForm">
      <v-row class="justify-center">
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            Fornavn <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              validate-on-blur
              background-color="white"
              prepend-inner-icon="fas fa-user fa-fw"
              v-model="formValues.firstName"
              :rules="formRules.required"
              :error-messages="errorMessages ? errorMessages[formKeys.FirstName] : []"
          />
        </v-col>
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            Etternavn <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              validate-on-blur
              background-color="white"
              prepend-inner-icon="fas fa-user fa-fw"
              v-model="formValues.surName"
              :rules="formRules.required"
              :error-messages="errorMessages ? errorMessages[formKeys.SurName] : []"
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
              validate-on-blur
              background-color="white"
              prepend-inner-icon="fas fa-phone fa-fw"
              v-model="formValues.phoneNumber"
              :rules="[...formRules.required, ...formRules.phone]"
              :error-messages="errorMessages ? errorMessages[formKeys.PhoneNumber] : []"
          />
        </v-col>
        <v-col cols="12" class="px-5" md="6">
          <span class="subtitle-1 font-weight-medium">
            E-postadresse <span style="color: orangered">*</span>
          </span>
          <v-text-field
              outlined
              class="mt-0"
              validate-on-blur
              background-color="white"
              prepend-inner-icon="fas fa-at fa-fw"
              v-model="formValues.email"
              :rules="[...formRules.required, ...formRules.email]"
              :error-messages="errorMessages ? errorMessages[formKeys.Email] : []"
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
              validate-on-blur
              background-color="white"
              prepend-inner-icon="fas fa-map fa-fw"
              v-model="formValues.zipCode"
              :rules="[...formRules.required, ...formRules.zipCode]"
              :error-messages="errorMessages ? errorMessages[formKeys.ZipCode] : []"
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
              :error-messages="errorMessages ? errorMessages[formKeys.Address] : []"
          />
        </v-col>
      </v-row>
    </v-form>
    <span v-if="sentForm" class="status--text success--text">Informasjonen din er sendt!</span>
    <span class="status--text error--text">{{ internalServerError }}</span>
    <v-row class="justify-center" no-gutters>
      <v-btn @click="resetState" class="mr-5" color="white">Fjern Utfylling</v-btn>
      <v-tooltip :disabled="validForm" max-width="200" bottom>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-btn
                color="#3060AE"
                class="white--text"
                :loading="loading"
                :disabled="!validForm"
                @click="submitUserData"
            >
              Send din informasjon
            </v-btn>
          </div>
        </template>
        <span>Fyll ut informasjonen ovenfor for å sende data</span>
      </v-tooltip>
    </v-row>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import {ErrorResponse, FormKeys, formRules} from 'nettbureau_common'
import {sendUserData} from '../api/UserApi'
import {InvalidFormError} from '../InvalidFormError'

@Component
export default class Home extends Vue {
  validForm = false
  loading = false
  sentForm = false
  formRules = formRules
  formKeys = FormKeys
  internalServerError: string | null = null
  errorMessages: Record<FormKeys, string[]> | null = null
  formValuesSnapshot: Record<FormKeys, string> | null = null
  formValues: Record<FormKeys, string> = {
    [FormKeys.FirstName]: '',
    [FormKeys.SurName]: '',
    [FormKeys.PhoneNumber]: '',
    [FormKeys.Email]: '',
    [FormKeys.ZipCode]: '',
    [FormKeys.Address]: '',
  }

  @Watch('formValues', { deep: true })
  resetErrorWhenSuppliedWithNewValue(val: Record<FormKeys, string>) {
    if(!this.errorMessages || !this.formValuesSnapshot) return
    Object.keys(this.errorMessages).forEach(key => {
      if(this.formValuesSnapshot?.[key as FormKeys] !== val[key as FormKeys]) {
        this.errorMessages![key as FormKeys] = []
      }
    })
  }

  submitUserData() {
    this.loading = true
    this.sentForm = false
    this.internalServerError = null
    sendUserData(this.formValues)
        .then(() => {
          this.sentForm = true
          this.resetState()
        }).catch((err: InvalidFormError) => {
          if (err.response?.status === 400) {
            this.formValuesSnapshot = {...this.formValues}
            this.errorMessages = this.buildError(err.response.data.error)
          } else {
            this.internalServerError = 'En uventet feil oppsto'
          }
        }).finally(() => this.loading = false)
  }

  buildError(error: ErrorResponse[]): Record<FormKeys, string[]> {
    return error.reduce((acc, err: ErrorResponse) => {
      if(!acc[err.field]) {
        acc[err.field] = []
      }
      acc[err.field].push(err.message)
      return acc
    }, {} as Record<FormKeys, string[]>)
  }

  resetState() {
    //@ts-ignore
    this.$refs.form.resetValidation()
    Object.keys(this.formValues).forEach(key => this.formValues[key as FormKeys] = '')
    if(this.errorMessages) {
      Object.keys(this.errorMessages).forEach(key => this.errorMessages![key as FormKeys] = [])
    }
  }
}
</script>
<style lang="sass">
.container--main
  display: flex
  flex-direction: column
  align-content: center
  min-height: 100vh
  padding: 12px
  width: 80vw
  margin: 0 auto

.status--text
  font-weight: bold
  margin-bottom: 18px
  text-align: center
  &:after
    content: "\200D"

.success--text
  color: #4CAF50

.error--text
  color: #b71c1c
</style>

