import Uploader from '../components/Uploader';

import "./Upload.css";


export default function Upload() {

    // TODO get the mutation function
    // pass it to the Uploader component

    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={() => {}}/>
        </div>
    </div>;
}
