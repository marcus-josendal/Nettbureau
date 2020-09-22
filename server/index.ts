import express, { Application } from 'express'

const app: Application = express()

app.post('/user', (req, res) => {
  res.send('Hello World!');
})

app.listen(3000, () =>  {
  console.log('App is listening on port 3000!');
})
