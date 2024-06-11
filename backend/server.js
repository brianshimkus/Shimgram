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

// Get all posts
app.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find({})

		return res.status(200).json({
			count: posts.length,
			data: posts,
		})
	} catch (err) {
		res.status(500).send(err)
	}
})

// Get one post by id
app.get('/posts/:id', async (req, res) => {
	try {
		const { id } = req.params

		const post = await Post.findById(id)

		return res.status(200).json(post)
	} catch (err) {
		res.status(500).send(err)
	}
})

// Update a post
app.put('/posts/:id', async (req, res) => {
	try {
		if (!req.body.image || !req.body.caption) {
			return res.status(400).send('Image and caption are required')
		}

		const { id } = req.params

		const result = await Post.findByIdAndUpdate(id, req.body)

		if (!result) {
			return res.status(404).send('Post not found')
		}

		return res.status(200).send({ message: 'Post updated successfully' })
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
