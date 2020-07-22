export class Professeur {
    constructor(public id: number, 
                public firstName: string,
                public lastName: string, 
                public status: string, 
                public description: string) {}
}

/* Full versionn of constructor
 export class Professeur {
     id: number;
     firstname: string;
     lastname: string;
     statut: string;
     description: string;

     constructor(id: number, firstname: string, lastname: string, statut: string, description: string) {
         this.id = id;
         this.firstname = firstname;
         this.lastname = lastname;
         this.statut = statut;
         this.description = description;
     }
}
*/

