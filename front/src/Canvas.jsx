
    import { useEffect, useRef } from "react";

    export function Canvas({ rValue }) {
        const canvasRef = useRef(null);

        function drawDot(event){

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const rect = canvas.getBoundingClientRect();
            const xClick = event.clientX - rect.left;
            const yClick = event.clientY - rect.top;

            const canvasCenterX = canvas.width / 2;
            const canvasCenterY = canvas.height / 2;

            const scale = canvasCenterX / 5;
            const xValue = (xClick - canvasCenterX) / scale;
            const yValue = -(yClick - canvasCenterY) / scale;

            const plotX = xValue * 50;
            const plotY = -yValue * 50;

            ctx.beginPath();

            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.arc(plotX, plotY, 5, 0, 2 * Math.PI);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.resetTransform();
            ctx.closePath();

        }


        useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const Xcanvas = canvas.width;
            const Ycanvas = canvas.height;

            function clearCanvas() {
                ctx.clearRect(0, 0, Xcanvas, Ycanvas);
            }

            function drawGrid() {
                const gridSpacing = Xcanvas / 10;
                ctx.strokeStyle = '#e0e0e0';
                ctx.beginPath();
                for (let x = 0; x <= Xcanvas; x += gridSpacing) {
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, Ycanvas);
                }
                for (let y = 0; y <= Ycanvas; y += gridSpacing) {
                    ctx.moveTo(0, y);
                    ctx.lineTo(Xcanvas, y);
                }
                ctx.stroke();
            }

            function drawAxes() {
                ctx.strokeStyle = '#000000';
                ctx.beginPath();
                ctx.moveTo(Xcanvas / 2, 0);
                ctx.lineTo(Xcanvas / 2, Ycanvas);
                ctx.moveTo(0, Ycanvas / 2);
                ctx.lineTo(Xcanvas, Ycanvas / 2);
                ctx.stroke();
            }

            function drawShapes() {
                const scale = (Xcanvas / 2) * (rValue / 5);
                ctx.fillStyle = '#5f9ea0';

                // Четверть круга
                ctx.beginPath();
                ctx.moveTo(Xcanvas / 2, Ycanvas / 2);
                ctx.arc(Xcanvas / 2, Ycanvas / 2, scale / 2, 0, 0.5 * Math.PI);
                ctx.fill();
                ctx.stroke();

                // Прямоугольник
                ctx.beginPath();
                ctx.rect(Xcanvas / 2, Ycanvas / 2, -scale, scale);
                ctx.fill();
                ctx.stroke();

                // Треугольник
                ctx.beginPath();
                ctx.moveTo(Xcanvas / 2 + scale, Ycanvas / 2);
                ctx.lineTo(Xcanvas / 2, Ycanvas / 2);
                ctx.lineTo(Xcanvas / 2, Ycanvas / 2 - scale);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }

            function drawLabels() {
                const scale = (Xcanvas / 2) * (rValue / 5);
                ctx.font = '16px Arial';
                ctx.fillStyle = '#000000';

            //     ctx.fillText('-R', Xcanvas / 2 - scale , Ycanvas / 2 - 20);
                ctx.fillText('R', Xcanvas / 2 + scale -20, Ycanvas / 2 + 20);
            //
                ctx.fillText('R', Xcanvas / 2 - 20, Ycanvas / 2 - scale+20);
            //     ctx.fillText('-R', Xcanvas / 2 + 10, Ycanvas / 2 + scale-10);
             }

            function drawGraph() {
                clearCanvas();
                drawGrid();
                drawAxes();
                if (rValue) {
                    drawShapes();
                    drawLabels();
                }
            }

            drawGraph();
        }, [rValue]);

        return <canvas ref={canvasRef} id="canvas" width={500} height={500} onClick={drawDot} />;



}