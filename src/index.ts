import { User } from './models/User'

const user = new User({ id: 33, name: 'Temp name', age: 22 });

user.on('change', () => {
  console.log('change#1 event occurred');
});
user.on('change', () => {
  console.log('change#2 event occurred');
});

console.log(user.get('name'));
user.set({ name: 'updated' });

user.on('save', () => {
  console.log('user saved');
});
user.save();