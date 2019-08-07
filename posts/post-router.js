const express = require('express')

// database access using knex 👊
const db = require('../data/db-config.js')

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // const posts = await db('posts')
    const posts = await db.select('*').from('posts')
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({
      message: 'Error getting posts ☠️', error: err
    })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    // const [post] = await db('posts').where({ id })
    const [post] = await db.select('*').from('posts').where({ id })
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({
        message: 'Could not find post id 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error getting post ☠️', error: err
    })
  }
})

router.post('/', async (req, res) => {
  const postData = req.body
  try {
    const post = await db('post').insert(postData)
    if (post) {
      res.status(201).json(post)
    }
  } catch (err) {
      res.status(500).json({
        message: 'Could not add your post to the data base 💩',
        error: err
      })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body
  try {
    const count = await db('posts').where('id', '=', id).update(changes)
    if (count) {
      res.status(200).json(count)
    } else {
      res.status(400).json({
        message: 'Could not update the post 💩'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Could not update the post 💩',
      error: err
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const post = req.body
  try {
    const count = await db('posts').where('id', '=', id).delete(post)
    if (count > 0) {
      res.status(200).json({
        message: 'This post has been destroyed ☠️'
      })
    } else {
      res.status(404).json({
        message: 'The post you are looking to delete could not be found 🤷‍'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Destruction of post was unsuccessful 💩'
    })
  }
})

module.exports = router