const express = require('express');
const app = express();
const data = require('./data.json');

// Set Pug as the view engine
app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// Define a route to render the home page
app.get('/', (req, res) => {
  res.render('index', { projects: data.projects });
});

// Define a route to render the about page
app.get('/about', (req, res) => {
  res.render('about');
});

// Define a route to render individual project pages
app.get('/project/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = data.projects.find(project => project.id === projectId);
  if (project) {
    res.render('project', { project });
  } else {
    res.status(404).render('not-found', { title: 'Page Not Found' });
  }
});

// Handle undefined routes with a user-friendly error message
app.use((req, res) => {
  res.status(404).render('not-found', { title: 'Page Not Found' });
});

// Error handler for rendering non-existing templates
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Internal Server Error' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});