describe('GET to /api/v1/status', () => {
  it('Should return 200', async () => {
    const response = await fetch('http://localhost:3001/api/v1/status');
    expect(response.status).toBe(200);
  });
});
