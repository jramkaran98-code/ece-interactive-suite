// ----- Navigation -----
function showSection(id){
    const sections = document.querySelectorAll('.tool-section');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// ----- Universal Number Converter -----
function convertNumber() {
    const input = document.getElementById("number-input").value.trim();
    const type = document.getElementById("number-type").value;
    const output = document.getElementById("conversion-output");
    let decimal;

    switch(type){
        case "binary":
            if(!/^[01]+$/.test(input)){ output.innerText="Invalid binary"; return;}
            decimal = parseInt(input,2); break;
        case "decimal":
            if(!/^\d+$/.test(input)){ output.innerText="Invalid decimal"; return;}
            decimal = parseInt(input,10); break;
        case "hex":
            if(!/^[0-9a-fA-F]+$/.test(input)){ output.innerText="Invalid hex"; return;}
            decimal = parseInt(input,16); break;
        case "octal":
            if(!/^[0-7]+$/.test(input)){ output.innerText="Invalid octal"; return;}
            decimal = parseInt(input,8); break;
    }

    output.innerText = `Decimal: ${decimal} | Binary: ${decimal.toString(2)} | Octal: ${decimal.toString(8)} | Hex: ${decimal.toString(16).toUpperCase()}`;
}

// ----- Signal Visualizer -----
const canvas = document.getElementById('signal-canvas');
const ctx = canvas.getContext('2d');
const freqSlider = document.getElementById('frequency-slider');
const ampSlider = document.getElementById('amplitude-slider');
const phaseSlider = document.getElementById('phase-slider');
const waveType = document.getElementById('wave-type');
const freqDisplay = document.getElementById('freq-display');
const ampDisplay = document.getElementById('amp-display');
const phaseDisplay = document.getElementById('phase-display');
const playPauseBtn = document.getElementById('play-pause');

let phaseOffset = 0;
let isPlaying = true;

function drawWave(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const freq = parseFloat(freqSlider.value);
    const amp = parseFloat(ampSlider.value);
    const phaseDeg = parseFloat(phaseSlider.value);
    const type = waveType.value;

    freqDisplay.innerText = freq;
    ampDisplay.innerText = amp;
    phaseDisplay.innerText = phaseDeg;

    // Axes
    ctx.strokeStyle="#aaa";
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.stroke();
    for(let x=0;x<=canvas.width;x+=50){
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }

    // Wave
    ctx.beginPath();
    for(let x=0;x<canvas.width;x++){
        const angle = (x/canvas.width)*2*Math.PI*freq + (phaseDeg*Math.PI/180) + phaseOffset;
        let y;
        if(type==="sine"){ y = canvas.height/2 - amp*Math.sin(angle);}
        else if(type==="square"){ y = canvas.height/2 - (Math.sin(angle)>=0?amp:-amp);}
        else{ y = canvas.height/2 - (2*amp/Math.PI)*Math.asin(Math.sin(angle));}
        if(x===0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
    }
    ctx.strokeStyle="#0077cc";
    ctx.lineWidth=2;
    ctx.stroke();
}

function animate(){ if(isPlaying){ phaseOffset+=0.05; } drawWave(); requestAnimationFrame(animate);}
freqSlider.addEventListener('input', drawWave);
ampSlider.addEventListener('input', drawWave);
phaseSlider.addEventListener('input', drawWave);
waveType.addEventListener('change', drawWave);
playPauseBtn.addEventListener('click', ()=>{ isPlaying=!isPlaying; playPauseBtn.innerText=isPlaying?"Pause":"Play";});
animate();

// ----- Logic Gate Simulator -----
function computeGate(){
    const gate = document.getElementById('gate-type').value;
    const a = parseInt(document.getElementById('inputA').value);
    const b = parseInt(document.getElementById('inputB').value);
    let out;
    switch(gate){
        case "AND": out=a&b; break;
        case "OR": out=a|b; break;
        case "XOR": out=a^b; break;
        case "NOT": out=a?0:1; break;
    }
    document.getElementById('gate-output').innerText=out;
}

// ----- Binary Arithmetic Calculator -----
function binaryCalc(){
    const b1 = document.getElementById('binary1').value.trim();
    const b2 = document.getElementById('binary2').value.trim();
    const op = document.getElementById('operation').value;
    if(!/^[01]+$/.test(b1)||!/^[01]+$/.test(b2)){ document.getElementById('binary-result').innerText="Invalid binary input"; return;}
    const n1 = parseInt(b1,2), n2=parseInt(b2,2);
    let resDec;
    switch(op){
        case "add": resDec=n1+n2; break;
        case "subtract": resDec=n1-n2; break;
        case "multiply": resDec=n1*n2; break;
    }
    document.getElementById('binary-result').innerText=`Binary: ${resDec.toString(2)} | Decimal: ${resDec} | Hex: ${resDec.toString(16).toUpperCase()} | Octal: ${resDec.toString(8)}`;
}
