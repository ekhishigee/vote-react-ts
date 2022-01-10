export class Poll {
  id: number;
  question: string;
  options: Option[]
  host: Host;

  constructor(id: number, question: string, options: Option[], host: Host) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.host = host;
  }
}

export class Option {
  id: number;

  constructor(id: number) {
    this.id = id
  }
}

export class Host {
  id: number;
  email: string;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }
}
