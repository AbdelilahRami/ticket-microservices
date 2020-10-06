import request from 'supertest';
import {app} from '../../app';

it('should fail when an email doesnt exist', async()=>{
    await request(app)
    .post('/api/users/signin')
    .send({
        email:'test@test.com',
        password: 'password'
    })
    .expect(400);
});

it('should fail when a password is invalid !', async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password: 'password'
    })
    .expect(201);

    await request(app)
    .post('/api/users/signin')
    .send({
        email:'test@test.com',
        password: 'feiufejefl'
    })
    .expect(400);
});

it('should set cookie an email and password are valid', async()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password: 'password'
    })
    .expect(201);

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email:'test@test.com',
        password: 'password'
    })
    .expect(200);
    console.log('response ', response.get('Set-Cookie'));
    expect(response.get('Set-Cookie')).toBeDefined();
});