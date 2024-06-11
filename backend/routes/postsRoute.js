import express from 'express'
import { Post } from '../models/postModel.js'

const router = express.Router()

// Add a new post
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params

		const post = await Post.findById(id)

		return res.status(200).json(post)
	} catch (err) {
		res.status(500).send(err)
	}
})

// Update a post
router.put('/:id', async (req, res) => {
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

// Delete a post
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params

		const result = await Post.findByIdAndDelete(id)

		if (!result) {
			return res.status(404).send('Post not found')
		}

		return res.status(200).send({ message: 'Post deleted successfully' })
	} catch (err) {
		res.status(500).send(err)
	}
})

export default router
