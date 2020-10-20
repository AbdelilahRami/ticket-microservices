import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

jest.mock('../../nats-wrapper');

it('should respond with 404 ', async()=> {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
            .get(`/api/tickets/${id}`)
            .set('Cookie', global.signin())
            .expect(404);
});

it('should returns the ticket with its valid ticket', async()=>{
    const title = 'Title'
    const price =23;
    const ticketResponse = await request(app)
                                 .post('/api/tickets/')
                                 .set('Cookie', global.signin())
                                 .send({
                                    title,
                                     price
                                 }).expect(201);
    const response = await request(app)
                            .get(`/api/tickets/${ticketResponse.body.id}`)
                            .set('Cookie', global.signin())
                            .expect(200);
    expect(response.body.title).toEqual(title);
    expect(response.body.price).toEqual(price);                             



})