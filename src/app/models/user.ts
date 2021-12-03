export class User {

    constructor(
        public id?: Number,
        public firstname?: String,
        public lastname?: String,
        public email?: String,
        public password?: String,
        public role?: String,
        public file?: String,
        public accountState?: Boolean
    ) {
    }

}
