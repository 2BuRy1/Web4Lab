import {InputText} from "./props/Input";
import {Button} from "./props/Button";
import {useEffect, useRef, useState} from "react";
import {Canvas} from "./Canvas";
import {useNavigate} from "react-router-dom";
import {DotsCanvas} from "./DontsCanvas";
import {PointsTable} from "./PointsTable";



export function Main( {setAuthenticated} ){

    const [xButtonValue, setXButtonValue] = useState("");
    const [yInputValue, setYInputValue] = useState("");
    const [rButtonValue, setRButtonValue] = useState(1);
    const [serverData, setServerData] = useState({});
    const [allUserPoints, setAllUserPoints] = useState([]);
    const navigate = useNavigate();
    const yRef = useRef(null)


    useEffect(() => {

        if(serverData.error === 403) {
            setAuthenticated(false);
            localStorage.removeItem("jwt");
            navigate("/login")
        }

        console.log(serverData);

    }, [serverData]);




    function handleYInput(e){
        setYInputValue(e.target.value);
    }


    function checkLetters(){

        const hasLetters = /[A-Za-zА-Яа-я]/.test(yInputValue)
        console.log(yRef.current);
        if (!hasLetters) {
            return true;
        } else {
            return false;
        }

    }

    function handleRChange(e){
        setRButtonValue(e.target.value);
    }

    function validate(){

        let validY =  !yInputValue;

        let validR = !rButtonValue;
        let validX = !xButtonValue;
        return (!validY && !validR && !validX && parseFloat(yInputValue) >=-5 && parseFloat(yInputValue)<=3 && checkLetters());
    }






    function handleXChange(e){
    setXButtonValue(e.target.value);

    }

    function handleAddPoint(){

        if(!checkLetters()){
            yRef.current.classList.add("is-invalid");

        }

        console.log(checkLetters())

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

        if(!validate()){
            return;
        }

        fetch("http://localhost:8080/checkHit", requestContent)
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
            .then(async response => {
                if (!response.ok) {
                    setAuthenticated(false);
                    localStorage.removeItem("jwt");
                    navigate("/login")
                } else {
                    const data = await response.json()
                    setAllUserPoints(data.points);

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
                               onChange={(e) => handleYInput(e)}
                               value={yInputValue}
                               ref={yRef}
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
                    <Button
                        onClick={(e) => handleAddPoint(e)}
                        value = "Отправить"
                        class = "sendButton"
                    />
                </div>
            </div>
            <div className="canvasSelection">
                    <Canvas rValue={rButtonValue} />
                    <DotsCanvas setServerData={setServerData} rValue={rButtonValue} points={allUserPoints}/>
                </div>
            <div className="tableSection">

                <PointsTable points={allUserPoints} newPoint={serverData}/>

            </div>


        </main>


    )


}