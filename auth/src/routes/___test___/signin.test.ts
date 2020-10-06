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

})