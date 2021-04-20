export default function Grid (props) {
    
    let grid_id = 'grid-'+props.i+'-'+props.j;
    let value_id = 'value-'+props.i+'-'+props.j;;
    let temp_class_name = 'grid '+'level-'+props.value;

    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}

    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                <div className="school-name" id={value_id}>{mapping[props.value]}</div>
            </div>
        </td>
    );
}