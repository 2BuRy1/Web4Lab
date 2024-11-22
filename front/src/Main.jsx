import {InputText} from "./props/Input";
import {Button} from "./props/Button";
import {useEffect, useState} from "react";
import {Canvas} from "./Canvas";
import {useNavigate} from "react-router-dom";


export function Main( {setAuthenticated} ){

    const [xButtonValue, setXButtonValue] = useState("");
    const [yInputValue, setYInputValue] = useState("");
    const [rButtonValue, setRButtonValue] = useState("");
    const navigate = useNavigate();

    function handleYInput(e){
        setYInputValue(e.target.value);
    }


    function handleRChange(e){
        setRButtonValue(e.target.value);
    }


    function handleXChange(e){
    setXButtonValue(e.target.value);

    }

    function handleAddPoint(){


        const requestContent = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                x: xButtonValue,
                y: yInputValue,
                r: rButtonValue,
            })

        }

        fetch("http://localhost:8080/addPoint", requestContent)
            .then(response => response.json())
            .then((data) => console.log(data))


    }


    useEffect(() => {


        const requestContent = {
            method: "GET",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }


        }


        fetch("http://localhost:8080/points",requestContent )
            .then(response => {
                if(!response.ok) {
                    setAuthenticated(false);
                    localStorage.removeItem("jwt");
                    navigate("/login")
                }
                else{
                    response.json().then((data) => {
                        const points = data.points; points.forEach((point) => {
                            console.log(point)
                        })

                    });
                }

            })

    }, []);





    return(
        <main>
            <div className="variables">

                <div className="xSelection">
                    <Button onClick={(e) => handleXChange(e)}
                            value="-2"
                            class="xButtons"
                    />
                    <Button
                        onClick={(e) => handleXChange(e)}
                        value="-1.5"
                        class="xButtons"/>
                    <Button
                        onClick={(e) => handleXChange(e)}
                        value="-1"
                        class="xButtons"/>
                    <Button
                        onClick={(e) => handleXChange(e)}
                        value="-0.5"
                        class="xButtons"/>
                    <Button
                        onClick={(e) => handleXChange(e)}
                        value="0"
                        class="xButtons"/>
                    <Button
                        onClick={(e) => handleXChange(e)}
                        value="0.5"
                        class="xButtons"/>
                    <Button
                        onClick={(e) => handleXChange(e)}
                        value="1"
                        class="xButtons"/>
                    <Button
                        onClick={(e) => handleXChange(e)}
                        value="1.5"
                        class="xButtons"/>
                    <Button
                        onClick={(e) => handleXChange(e)}
                        value="2"
                        class="xButtons"/>
                </div>

                <div className="ySelection">
                    <InputText id="yInput"
                               type="text"
                               name="-5...3"
                               onChange ={(e) =>handleYInput(e)}
                               value ={yInputValue}
                    />
                </div>


                    <div className="rSelection" id="rButtons">
                <Button
                    onClick={(e) => handleRChange(e)}
                    value="1"
                    class="rButtons"/>
                <Button
                    onClick={(e) => handleRChange(e)}
                    value="2"
                    class="rButtons"/>
                <Button
                    onClick={(e) => handleRChange(e)}
                    value="3"
                    class="rButtons"/>
                <Button
                    onClick={(e) => handleRChange(e)}
                    value="4"
                    class="rButtons"/>
                <Button
                    onClick={(e) => handleRChange(e)}
                    value="5"
                    class="rButtons"/>
            </div>
        </div>
            <div className="canvasSelection">
                    <Canvas rValue={rButtonValue}/>
                </div>
            <input type={"button"} onClick={handleAddPoint}/>



        </main>


    )


}