const Mutation = {
    insertPeople(parent, {data}, {db, pubsub}, info) {

        const collections = db.people;

        for (var i=0; i<data.length; i++) {

            try {

                var person = data[i];

                const {ssn, name, location} = person;
                
                console.log(ssn);
                console.log(location);

                // update
                if ( collections.filter( (p) => {return p.ssn==ssn} ).length ) {

                    let idx = collections.findIndex( (p) => {return p.ssn==ssn});

                    collections[idx].name = name;
                    collections[idx].location.name = location.name;
                    collections[idx].location.description = location.description;

                    console.log(ssn+' exists, update information')
                } 
                // insert
                else {
                    collections.push(person);

                    console.log(ssn+' inserted ')
                }

            } catch(error) {
                
                return false;
            
            }

        }

        return true;
    }
};

export { Mutation as default };