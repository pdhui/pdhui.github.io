function LCurtainSample3(speed,onClosing,onComplete){  
    var s = this;  
    base(s,LSprite,[]);  
    if(!speed)speed = LStage.width/100;  
    if(!onClosing){  
        s.onClosing = function(){};  
    }else{  
        s.onClosing = onClosing;  
    }     
    if(!onComplete){  
        s.onComplete = function(){};  
    }else{  
        s.onComplete = onComplete;  
    }  
    s.mode = "close";  
    s.height1 = 0;  
    s.height2 = 0;  
    s.width1 = 0;  
    s.width2 = 0;  
    s.isDoClosing = false;  
    s.speed = speed;  
    s.doingTransition = false;
    s.addEventListener(LEvent.ENTER_FRAME,s.onshow);  
}  
LCurtainSample3.prototype.onshow = function(s){  
    s.graphics.clear();  
    s.graphics.drawRect(1,"black",[0,0,LStage.width,s.height1],true,"black");  
    s.graphics.drawRect(1,"black",[0,LStage.height-s.height2,LStage.width,s.height2],true,"black");  
    s.graphics.drawRect(1,"black",[0,0,s.width1,LStage.height],true,"black");  
    s.graphics.drawRect(1,"black",[LStage.width-s.width2,0,s.width2,LStage.height],true,"black");  
    if(s.mode == "close" && s.height1 >= LStage.height/2 ){  
        s.mode = "transition";  
        if(s.isDoClosing == false){  
            s.onClosing();  
            s.isDoClosing = true;  
        }  
    }  
    if(s.mode == "close"){  
        s.height1 += s.speed;  
        s.height2 += s.speed;  
        s.width1 += s.speed;  
        s.width2 += s.speed;  
    }else if(s.mode == "open"){  
        s.height1 -= s.speed;  
        s.height2 -= s.speed;  
        s.width1 -= s.speed;  
        s.width2 -= s.speed;  
        if(s.height1 < 0){  
            s.mode = "stop";  
        }  
    }else if(s.mode == "stop"){  
        s.graphics.clear();  
        s.removeEventListener(LEvent.ENTER_FRAME,s.onshow);  
        s.onComplete();  
    }else if(s.mode=="transition" && !s.doingTransition){
        s.doingTransition = true;
        RotateMagic(s,function(){
            s.mode="open";
        });
    }
}  

function RotateMagic(layer,completefn){

    // var bitmapData = new LBitmapData(Imageresource.mfz),
    //     bitmap = new LBitmap(bitmapData),beginY,oncomplete;
    
    var mfz = new LBitmapData(Imageresource.mofazhen1),mfzAnimation,
        divideList = LGlobal.divideCoordinate(mfz.image.width,mfz.image.height,3,5);
    bitmap = new LAnimationTimeline(mfz,combileList(divideList));
   
    bitmap.scaleX=bitmap.scaleY=4;
    bitmap.speed =0.4;
    
    bitmap.height=bitmap.getHeight();
    bitmap.x = LStage.width/2 - bitmap.getWidth()/2;
    beginY = LStage.height-bitmap.getHeight();

    

    oncomplete = function(){
        setTimeout(function(){
            layer.removeChild(bitmap);
            completefn && completefn();
        }, 1000);
        
    }
    LTweenLite.to(bitmap,1,{y:beginY,loop:false,ease:LEasing.Strong.easeInOut})
            .to(bitmap,2,{y:beginY+bitmap.height*0.75,scaleY:1,loop:false,ease:LEasing.Quint.easeIn
                ,onComplete:oncomplete
            });
            //.to(bitmap,2,{y:250,scaleX:1.,scaleY:0.1,loop:true,ease:LEasing.Quint.easeIn})   
           /* .to(bitmap,2,{alpha:0.8,y:beginY+bitmap.height*0.7-20,scaleY:0.3,loop:false,ease:LEasing.Quint.easeIn
                ,onComplete:oncomplete
                });*/
    layer.addChild(bitmap);
}