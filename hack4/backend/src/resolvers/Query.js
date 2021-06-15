const Query = {
    statsCount(parent, {severity, locationKeywords}, {db}, info) {

        // var candid_people = db.people;
        if (!db.people)
            return null;

        // none of
        if (!locationKeywords)
            return null;
        
        var result = [];

        // location only
        if (!severity) {
            for (var i=0; i<locationKeywords.length; i++) {
                try {
                    var candid_people = db.people.filter( 
                            (p) => { return p.location.description.includes(locationKeywords[i]) ||
                                            p.location.description==locationKeywords[i] }
                        );

                    result.push(candid_people.length);            
                } catch (error) {
                    return null;
                }
            }
            return result;
        }

        // severity & location
        else {
            for (var i=0; i<locationKeywords.length; i++) {
                try {
                    var candid_people = db.people.filter( 
                            (p) => { return p.severity>=severity } 
                       ).filter( 
                            (p) => { return p.location.description.includes(locationKeywords[i]) ||
                                            p.location.description==locationKeywords[i] }
                        );

                    result.push(candid_people.length);            
                } catch (error) {
                    result.push(null);
                }
            }

            return result;//candid_people.length;
        }
    }
};

export { Query as default };