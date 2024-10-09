import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from '../src/routes/TaskRoutes';

describe('Task API Endpoints', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use('/api', taskRoutes);
  });

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Task');
  });

  it('should not create a task without a title', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        description: 'No title provided',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Title is required.');
  });

  it('should get a task by ID', async () => {
    // Create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Task to Get',
        description: 'Task description',
      });

    const taskId = createResponse.body.id;

    const response = await request(app).get(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(taskId);
    expect(response.body.title).toBe('Task to Get');
  });

  it('should return 404 when getting a non-existent task', async () => {
    const response = await request(app).get('/api/tasks/non-existent-id');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found.');
  });

  it('should update a task', async () => {
    // Create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Task to Update',
        description: 'Original description',
      });

    const taskId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        title: 'Updated Task Title',
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe('Updated Task Title');
  });

  it('should not update a task with an empty title', async () => {
    // Create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Task to Fail Update',
      });

    const taskId = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        title: '   ', // Empty title after trimming
      });

    expect(updateResponse.status).toBe(400);
    expect(updateResponse.body.message).toBe('Title cannot be empty.');
  });

  it('should delete a task', async () => {
    // Create a task
    const createResponse = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Task to Delete',
      });

    const taskId = createResponse.body.id;

    const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Task deleted successfully.');
  });

  it('should return 404 when deleting a non-existent task', async () => {
    const response = await request(app).delete('/api/tasks/non-existent-id');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Task not found.');
  });
});
