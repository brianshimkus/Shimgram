import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
	{
		image: {
			type: String,
			required: true,
		},
		caption: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
)

export const Post = mongoose.model('Post', postSchema)
