var express = require('express')
var app = express()
var port = process.env.PORT || 8080

app.get('/', function (request, response) {
  response.json({
    welcome: 'welcome to my API!'
  })
})

app.get('/slack/message_action', function (request, response) {
  response.json(todos)
})

app.get('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).json({ error: request.params.slug + ' does not exist.' })
    return
  }
  response.json(todos[request.params.slug])
})

app.post('/slack/message_action', function (request, response) {
  response.json(request)
  var slug = request.body.name.trim().toLowerCase().split(' ').join('-')
  todos[slug] = {
    name: "test",
    status: "test1"
  }
  response.redirect('/todos/' + slug)
})

app.delete('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).json({ error: request.params.slug + ' does not exist.' })
    return
  }
  delete todos[request.params.slug]
  response.redirect('/todos')
})

app.put('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).json({ error: request.params.slug + ' does not exist.' })
    return
  }
  var todo = todos[request.params.slug]
  if (request.body.name !== undefined) {
    todo.name = request.body.name.trim()
  }
  if (request.body.status !== undefined) {
    todo.status = request.body.status
  }
  response.redirect('/todos/' + request.params.slug)
})

app.use(function (request, response, next) {
  response.status(404).json({ error: request.url + ' not found' })
})

app.listen(port)
