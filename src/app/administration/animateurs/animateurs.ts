// animateur.ts
export class Animateur {
  id: number;
  name: string;
  city: string;
  address: string;
  mail: string;
  telephone: string;

  constructor(
    id: number,
    name: string,
    city: string,
    address: string,
    telephone: string,
    mail: string
  ) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.address = address;
    this.mail = mail;
    this.telephone = telephone;
  }
}
