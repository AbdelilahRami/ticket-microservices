import  mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../../app';
it('returns 404 when id of ticket not found ', async()=> {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
                .put(`/api/tickets/${id}`)
                .set('Cookie', global.signin())
                .send({
                    title: 'Title',
                    price: 45
                }).expect(404);
});

it('returns 401 when user is not authenticated ', async()=> {
    const response = await request(app)
                     .post(`/api/tickets/`)
                     .set('Cookie', global.signin())
                     .send({
                         title:'Title',
                         price: 50
                     }).expect(201);

    await request(app)
          .put(`/api/tickets/${response.body.id}`)
          .send({
              title: 'New title',
              price: 25
          })  .expect(401);               

});

it('returns 401 when the ticket id doesnt belong to the user ', async ()=> {
    const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie', global.signin())
    .send({
        title:'Title',
        price: 50
    }).expect(201);
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', global.signin())
            .send({
                title: 'dummy title',
                price: 70
            }).expect(401);

});

it('returns 400 when the ticketId belongs to the user but inputs are NOT valid ! ', async ()=> {
const cookie =  global.signin();

    const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie',cookie)
    .send({
        title:'Title',
        price: 50
    }).expect(201);
    await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                title: '',
                price: 70
            }).expect(400);

});

it('returns 200 when the ticketId belongs to the user , and the inputs VALID', async()=> {
    const updatedTile = 'Updated title';
    const updatedPrice= 70;
    const cookie = global.signin();

    const response = await request(app)
    .post(`/api/tickets/`)
    .set('Cookie',cookie)
    .send({
        title:'Title',
        price: 50
    }).expect(201);

    const updatedResponse = await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({
                title: updatedTile,
                price: updatedPrice
            }).expect(200);

    expect(updatedResponse.body.title).toEqual(updatedTile);
    expect(updatedResponse.body.price).toEqual(updatedPrice);        
});

