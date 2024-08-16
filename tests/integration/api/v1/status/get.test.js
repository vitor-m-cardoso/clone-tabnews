describe('GET to /api/v1/status', () => {
  it('Should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status');
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.updated_at).toBeDefined();
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  });

  it('Should return correct Postgress version', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status');
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.dependencies.database).toHaveProperty('version');
    expect(responseBody.dependencies.database.version).toEqual('16.0');
  });

  it('Should return correct max connections on database', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status');
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.dependencies.database).toHaveProperty('max_connections');
    expect(responseBody.dependencies.database.max_connections).toEqual(100);
  });

  it('Should return correct used connections on database', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status');
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.dependencies.database).toHaveProperty('used_connections');
    expect(responseBody.dependencies.database.used_connections).toEqual(1);
  });
});
