import { Eventing } from './Eventing';
import { Sync } from "./Sync";
import { Attribues } from "./Attributes";
import Axios, { AxiosResponse } from 'axios';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attribues<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attribues<UserProps>(attrs);
  }

  public get on() {
    return this.events.on;
  }

  public get trigger() {
    return this.events.trigger;
  }

  public get get() {
    return this.attributes.get;
  }


  public set(update: UserProps) {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  public fetch(): void {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error("Cannot fatch without an id");
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => { this.set(response.data) });
  }

  public save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save')
      }).catch(() => { this.trigger('error') });
  }
}