import { Category } from "./category";

export class Course {

    constructor(
        public id?: Number,
        public name?: String,
        public price?: DoubleRange,
        public description?: String,
        public teacher?: String,
        public category?: Category,
        public image?: String
    ) {
    }
}
