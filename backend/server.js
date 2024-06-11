import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import colors from 'colors'
import { Post } from './models/postModel.js'

dotenv.config()

const PORT = process.env.PORT || 5060
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Response from server')
})

// Add a new post
app.post('/posts', async (req, res) => {
	try {
		if (!req.body.image || !req.body.caption) {
			return res.status(400).send('Image and caption are required')
		}
		const newPost = {
			image: req.body.image,
			caption: req.body.caption,
			category: req.body.category,
		}

		const post = await Post.create(newPost)

		res.status(201).send(post)
	} catch (err) {
		res.status(500).send(err)
	}
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
