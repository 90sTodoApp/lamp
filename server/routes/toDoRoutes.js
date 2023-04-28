const express = require('express');
const router = express.Router();
const { Todo } = require('../models/todos');
const Sequelize = require('../db')

router.use(express.json())
router.use(express.urlencoded({
  extended: true
  }))    

//GET TODOS (READ)
router.get('/', async (req, res, next) => {
  try{
    const todos = await Todo.findAll()
    res.send(todos)
  } catch (error) {

  }
})

//ADD TODOS (CREATE)
router.post('/', async (req, res) => {
    const addTodos = await Todo.create(req.body)  
    res.send(addTodos)
})

//GET SINGLE TODOS (READ)
router.get('/:id', async (req, res, next) => {
  try {
    const todos = await Todos.findByPk(req.params.id)
    res.send(todos)
  } catch (error) {
    next(error)
  }
})



//DELETE TODOS
router.delete('/:id', async (req, res, next) =>{
  try {
    const deletedTodos = await Todos.findByPk(req.params.id)  
     await deletedTodos.destroy()
    res.send(await Todos.findAll())
  } catch (error) {
    next(error)  
  }
})

//EDIT TODOS (UPDATE/PUT)
router.put('/:id', async (req, res, next) => {
  try{
    const updatedTodos = await Todos.update(req.body, 
      {where: {id: req.params.id}})
    res.send(await Todos.findAll())
  } catch (error){
    next(error)
  }
})

module.exports = router