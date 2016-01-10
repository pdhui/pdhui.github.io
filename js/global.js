// JavaScript Document
var SHAKE_THRESHOLD = 4000;  
var last_update = 0;  
var x = y = z = last_x = last_y = last_z = num=0,
	speed;  
// function init() {
// 	if(document.readyState == "complete"){
// 		console.log("加载完毕");
//         $(".loading").hide();
// 		if (window.DeviceMotionEvent) { 
// 		} else {  
// 			alert('您的设备不支持摇一摇');  
// 		}
// 		// start();
// 	}
//     else
//         setTimeout("init()", 500);
// }  
function deviceMotionHandler(eventData) {  
	var acceleration = eventData.accelerationIncludingGravity;  
	var curTime = new Date().getTime();  

	var facingUp = -1;
	if (acceleration.z > 0) {
	   	facingUp = 1;
	}
	// if(!hbproducer)
	// 	return;
	if ((curTime - last_update) > 100) {  
		var diffTime = curTime - last_update;  
		last_update = curTime;  
		x = acceleration.x;  
		y = acceleration.y;  
		z = acceleration.z;  
		speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime*10000 ;

  		// var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
  		// var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
  		// var z = Math.round(acceleration.z);
		//document.getElementById("ceshi").innerHTML = speed;
		// textInf.text = "speed: " + Math.round(speed);
		if (speed > SHAKE_THRESHOLD) { 
			// alert(speed);
			// alert("摇动了");  
			/*media.setAttribute("src", "http://211.148.5.228:8002/Pages/test/Kalimba.mp3");  
			media.load();
			media.play();*/
			// document.getElementById("bg-music").pause();
   //          document.getElementById("bg-music").play();
   			if(document.getElementById("bg-music").paused)  				
   				media.play();
			if(hbproducer.maxcount < 100)
				hbproducer.maxcount+=10;
			
			num++;
			// textInf.text = "已经摇了 " + num +" 次";
			if(num==1){
				$("#tip").hide();
				$("#caishen").addClass("dong");
				$("#hongbao").addClass("dong");
				// times();
			}
		}
		else if(speed<SHAKE_THRESHOLD){
			hbproducer.maxcount -= 10;
			speed =0;
			if(hbproducer.maxcount < 0)
				hbproducer.maxcount = 0;
			// media.pause();
		}
		last_x = x;  
		last_y = y;  
		last_z = z;  
	}  
}  
var SLOTXY=[0,0,46,386],
    POWERXY=[44,0,26,309],
	minIncreasePowerSpeed = 3000,
	minIncreasePowerCount = 20,
	Imageresource,
	backLayer = new LSprite(),
    characterLayer = new LSprite(),
    frontBgLayer = new LSprite();

function random(min,max){
    var range = max - min,
        rand = Math.random();   
    return(min + Math.round(rand * range));   
}

function initScreen(){
    LGlobal.align = LStageAlign.BOTTOM_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
    LSystem.screen(LStage.FULL_SCREEN);
}

function combileList(list){
	if(!list)
		return [];
	var combilelists = [];
	for(var rowindex=0, rowlen=list.length; rowindex < rowlen; rowindex++){		
		combilelists = combilelists.concat(list[rowindex]);
	}
	return [combilelists];
}

function SummonMagic(layer,closefn,openfn){
	var mfz = new LBitmapData(Imageresource.mofazhen),mfzAnimation,
    	divideList = LGlobal.divideCoordinate(mfz.image.width,mfz.image.height,4,5);
    layer = layer || frontBgLayer;
    var curtain = new LCurtainSample3(50,function(){  
        mfzAnimation = new LAnimationTimeline(mfz,combileList(divideList));
        mfzAnimation.speed =0.4;
        mfzAnimation.scaleX=3.5;
        mfzAnimation.scaleY=4;
        layer.addChildAt(mfzAnimation,0);
        closefn && closefn.call();
    },function(){                
        
	    setTimeout(function(){
	        
	       LTweenLite.to(mfzAnimation,1,{y:LStage.height/2-mfz.height/2,scaleY:0,loop:false,ease:LEasing.Quint.easeIn
	       	,onComplete:function(){
	       		layer.removeChildAt(0);
	       	}});
	    }, 1000); 

        openfn && openfn.call();
        layer.removeChild(curtain);
        
    });  
    layer.addChild(curtain);
} 

LGlobal.setDebug(true);