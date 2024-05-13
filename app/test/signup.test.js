const { BadRequestError,DatabaseConnectionError } = require('@sumanauth/common'); 
const {signup} = require('../api/authentication.api'); 

describe('signup', () => {
  test('should create a new user successfully', async () => {
    const userData = {
        Username: 'testuser1',
        password: 'testpassword',
        Email: 'test@example.com',
        FullName: 'Test User'
      };
    const result = await signup(userData);
    expect(result).toBe('user created successfully');
  });

  test('should throw BadRequestError if user already exists', async () => {
    const userData = {
        Username: 'testuser1',
        password: 'testpassword',
        Email: 'test@example.com',
        FullName: 'Test User'
      };

    // Assuming a mock implementation of users.findOne() that returns a truthy value
    users.findOne = jest.fn().mockResolvedValue(true);

    await expect(signup(userData)).rejects.toThrow(BadRequestError);
  });

  test('should throw an error if any error occurs during signup', async () => {
    const userData = {
      Username: 'testuser',
      password: 'testpassword',
      Email: 'test@example.com',
      FullName: 'Test User'
    };

    // Assuming a mock implementation of users.create() that throws an error
    users.create = jest.fn().mockRejectedValue(new DatabaseConnectionError());

    await expect(signup(userData)).rejects.toThrow(DatabaseConnectionError);
  });
});
