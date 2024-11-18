import {InputText} from "./props/Input";
import {Button} from "./props/Button";
import {useState} from "react";
import {Canvas} from "./Canvas";


export function Main(){

    const [xButtonValue, setXButtonValue] = useState("");
    const [yInputValue, setYInputValue] = useState("");
    const [rButtonValue, setRButtonValue] = useState("");


    function handleYInput(e){
        setYInputValue(e.target.value);
    }


    function handleRChange(e){
        setRButtonValue(e.target.value);
    }





    function handleXChange(e){
    setXButtonValue(e.target.value);

    }




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



        </main>


    )


}