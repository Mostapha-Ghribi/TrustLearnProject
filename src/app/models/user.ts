export class User {

    constructor(
        public id?: Number,
        public firstname?: String,
        public lastname?: String,
        public email?: String,
        public password?: String,
        public role?: String,
        public accountState?: Boolean        
    ) {
    }

}
