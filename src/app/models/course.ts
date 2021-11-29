import { Category } from "./category";

export class Course {

    constructor(
        public id?: Number,
        public name?: String,
        public description?: String,
        public imageUrl?: String,
        public price?: DoubleRange,
        public category?: Category
    ) {
    }
}
