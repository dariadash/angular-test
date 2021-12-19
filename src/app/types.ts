export class User {
    constructor(
        public id: number,
        public email: string,
        public first_name: string,
        public last_name: string,
        public avatar: string,
    ) { }
}

export class Responce {
    constructor(
        public data: Array<User>
    ) { }
}

export class Resources {
    constructor(
        public id: number,
        public name: string,
        public year: number,
        public color: string,
        public pantone_value: string,
    ) { }
}

export class ResponceResources {
    constructor(
        public data: Array<Resources>
    ) { }
}