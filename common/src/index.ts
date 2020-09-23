export const formRules = {
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

export * from './types/FormKeys'
export * from './types/ErrorResponse'
