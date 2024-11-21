import {forwardRef, useState} from "react";


export function InputText(props, required=true) {
    return(
        <label htmlFor={props.id}>
            <input type ={props.type}
                   id={props.id}
                   placeholder={props.name}
                   value={props.value}
                   onChange={props.onChange}
                   required={required}
                   className={props.class}
            />
        </label>
    )

}


export default forwardRef(InputText)


