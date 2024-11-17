

export function Button(props) {

    return(
        <input type="button" onClick={props.onClick} value={props.value} className="authInputs" id= {props.id} />
    )


}