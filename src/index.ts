import { User, UserProps } from './models/User'
import { Collection } from './models/Collection';
import { UserForm } from './views/UserForm'

const rootUrl = 'http://localhost:3000/users';

const user = User.buildUser({ name: 'Name', age: 20 });
const form = new UserForm(document.getElementById('root'), user);

form.render();