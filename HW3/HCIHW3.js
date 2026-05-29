let canvas, context;
  let startX=0, startY=0; // 마우스의 마지막 포인터 좌표
  let drawing=false;
  let tool = "pen";
  let oldtool = "pen";

  function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");
    
    context.lineWidth = 1;
    context.strokeStyle = document.getElementById("strokeColor").value;
    context.fillStyle = document.getElementById("fillColor").value;

    document.getElementById("strokeColor").addEventListener("input", function() {
      context.strokeStyle = this.value;
    });

    document.getElementById("fillColor").addEventListener("input", function() {
      context.fillStyle = this.value;
    });

    document.getElementById("lineWidth").addEventListener("input", function() {
      context.lineWidth = this.value;
    });

    // 마우스 리스너 등록. e는 MouseEvent 객체
    canvas.addEventListener("mousemove", function (e) { move(e) }, false);
    canvas.addEventListener("mousedown", function (e) { down(e) }, false);
    canvas.addEventListener("mouseup", function (e) { up(e) }, false);
    canvas.addEventListener("mouseout", function (e) { out(e) }, false);
    setTool("pen");
  }
  function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
  function setTool(t) {
    tool = t;
    //선택된 tool name을 msg 작성 처리
    //클릭해서 새로 선택된 도구 이미지+문자로 수정
    document.getElementById(tool).querySelector("img").src = tool + "_selected.png";
    document.getElementById(tool).querySelector("span").textContent ="_selected";
    if (oldtool != tool)
    { //선택 해제 된 버튼의 이미지+no문자로 수정
      document.getElementById(oldtool).querySelector("img").src = oldtool + ".png";
      document.getElementById(oldtool).querySelector("span").textContent = "";
      oldtool = tool;
    }
    let toolText = "";

    if(tool == "pen")
      toolText = "선";
    else if(tool == "rect")
      toolText = "사각형";
    else if(tool == "circle")
      toolText = "원";
    else if(tool == "text")
      toolText = "텍스트";

    document.getElementById("toolName").textContent = toolText;
  }

  function draw(curX, curY) { 
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(curX, curY);
    context.stroke();
  }
  function drawRect(curX, curY){
    let w = curX - startX;
    let h = curY - startY;
    context.beginPath();
    context.rect(startX, startY, w, h);

    if(document.getElementById("fillCheck").checked)
      context.fill();

    context.stroke();
  }
  function drawCircle(curX, curY){
    let w = curX - startX;
    let h = curY - startY;
    context.beginPath();

    context.arc(startX, startY, w, 0, 2*Math.PI, false);
    if(document.getElementById("fillCheck").checked)
      context.fill();

    context.stroke();
  }
  function writeText(curX, curY){
    let text = document.getElementById("textInput").value;
    let size = document.getElementById("fontSize").value;

    context.font = size + "px serif";
    context.fillText(text, curX, curY);
  }
  function down(e) { 
    startX = e.offsetX; startY = e.offsetY; // down 했을 때, 그 위치에서 시작 (HW3 힌트!)
    imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    drawing = true;
  }
  function up(e) { 
    if(!drawing) return;
    let curX = e.offsetX;
    let curY = e.offsetY;
    if(tool == "rect") {
      context.putImageData(imageData, 0, 0);
      drawRect(curX, curY);
    }
    else if (tool == "circle"){
      context.putImageData(imageData, 0, 0);
      drawCircle(curX, curY);
    }
    else if(tool == "text"){
      writeText(curX, curY);
    }
    drawing = false;
  }

  function move(e) {
    if(!drawing) return; // 마우스가 눌러지지 않았으면 리턴
    let curX = e.offsetX;
    let curY = e.offsetY;

    document.getElementById("mousePos").textContent =
    "(" + curX + ", " + curY + ")";
    if (tool == "pen"){
      draw(curX, curY);	
      startX = curX; startY = curY;
    }
    else if (tool == "rect"){
      context.putImageData(imageData, 0, 0);
      drawRect(curX, curY);
    }
    else if (tool == "circle"){
      context.putImageData(imageData, 0, 0);
      drawCircle(curX, curY);
    }
  }
  function out(e) { drawing = false; }