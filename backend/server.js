import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import colors from 'colors'

dotenv.config()

const PORT = process.env.PORT || 5060
const app = express()

app.get('/', (req, res) => {
	res.send('Response from server')
})

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDB connected'.cyan)
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`.yellow)
		})
	})
	.catch((err) => {
		console.log(err)
	})
