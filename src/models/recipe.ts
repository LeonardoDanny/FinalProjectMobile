import { Ingredient } from "./ingredient";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class Recipe {
    constructor(
        public title: string,
        public description: string,
        public difficulty: string,
        public ingredients: Ingredient[],
        public image: URL) {}
}