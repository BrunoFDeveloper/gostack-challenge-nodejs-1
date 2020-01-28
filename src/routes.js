const { Router } = require('express');
const routes = Router();

let projects = [];

const checkProjectId = (req, res, next) => {
  const { id } = req.params;
  const findId = projects.find(project => project.id === id);
  if (!findId)
    return res.status(400).json({ message: 'Esse id de projeto não existe!' });

  return next();
};

routes.post('/projects', (req, resp) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });
  resp.json({ message: 'Projeto cadastrado com sucesso!' });
});

routes.post('/projects/:id/tasks', checkProjectId, (req, resp) => {
  const { id } = req.params;
  const { title } = req.body;

  projects = projects.map(project =>
    project.id === id
      ? { ...project, tasks: [...project.tasks, title] }
      : project
  );

  resp.json({ message: 'Projeto cadastrado com sucesso!' });
});

routes.get('/projects', (req, resp) => {
  resp.json(projects);
});

routes.put('/projects/:id', checkProjectId, (req, resp) => {
  const { id } = req.params;
  const { title } = req.body;

  projects = projects.map(project =>
    project.id === id ? { ...project, title } : project
  );

  resp.json(projects);
});

routes.delete('/projects/:id', checkProjectId, (req, resp) => {
  const { id } = req.params;

  projects = projects.filter(project => project.id !== id);

  resp.json(projects);
});

module.exports = routes;
