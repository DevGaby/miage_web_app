import { Unit } from '../model/unit';

export class Cours { 
    constructor(public id: number, public label: string, public period: string, 
                public nbHour: Unit, public teacher: string, public detail: string) { } 
}
