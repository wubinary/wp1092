import Grid from '../components/Grid'
export default function Row (props) {
    return (
        <tr>
            { 
                props.vector.map((e, j)=>(<Grid i={props.i} j={j} value={e} />))
            }
        </tr>
    );
};