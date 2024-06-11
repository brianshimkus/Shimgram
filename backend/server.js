import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()

const PORT = process.env.PORT || 5060
const app = express()

app.get('/', (req, res) => {
	res.send('Response from server')
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`.yellow)
})
