import { Ticket } from '../ticket';

it('should manage version', async () => {
  const ticket = Ticket.build({
    title: 'Concert',
    price: 30,
    userId: 'userId',
  });

  await ticket.save();

  const firstTicket = await Ticket.findById(ticket.id);
  const secondTicket = await Ticket.findById(ticket.id);

  firstTicket!.set({ price: 43 });
  secondTicket!.set({ price: 23 });

  await firstTicket?.save();
  try {
    await secondTicket?.save();
  } catch (err) {
    console.log('Error ', err);
  }
});

it('increments the version number of multiple saves ', async () => {
  const ticket = Ticket.build({
    title: 'Concert',
    price: 30,
    userId: 'userId',
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);
});
