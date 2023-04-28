const express = require('express');
const router = express.Router();
const { Todo } = require('../models/todos');

router.use(express.json())
router.use(express.urlencoded({
  extended: true
  }))    

//GET TODOS (READ)
router.get('/', async (req, res, next) => {
  try{
    const Todos = await Todo.findAll()
    res.send(Todos)
  } catch (error) {

  }
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

//ADD TODOS (CREATE)
router.post('/', async (req, res, next) => {
  try {
    const addTodos = await Todos.create(req.body)  
    res.send(addTodos)
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