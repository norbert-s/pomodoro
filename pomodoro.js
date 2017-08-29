let defaultTime=25, 
defaultBreak=5,
counter, // used with setinterval
minutes,
timeinMinSecFormat, 
timeInSeconds,
after,
flag,
now,
whenPauseClicked,
whenPaused,
paused=0,
toBeDisplayed,
displayThis="",
countIfSessionOrBreak=1,
countOnlySessions=0;//used to notify user about which session is on (first, second...)

const $button = $('button'),
$tPause=$("#tPause"),

$displayMinutes = $("#displayMinutes"),
$displaySeconds = $("#displaySeconds"),
$tMinutes = $('#tMinutes'), 
$tSeconds = $('#tSeconds'),
$skipBreak = $("#skipBreak"),
$skipSession = $("#skipSession"),
$disableTimerBreak =  $("#timerDown, #timerUp, #breakDown,#breakUp"),
$tStart = $("#tStart"),
$tReset = $("tReset"),
$bMinutes= $("#bMinutes"),
$bSeconds= $("#bSeconds"),
$breakDown= $("#breakDown"),
$textSessionStarted= $("#which_is_on"),
sessionEndAudio = new Audio("http://res.cloudinary.com/norberts/video/upload/v1502810972/29701__herbertboland__pianomood2_f0x1kv.wav"),
sessionStartAudio = new Audio("http://res.cloudinary.com/norberts/video/upload/v1502828785/216676__robinhood76__04864-notification-music-box_tuuvik.wav");
onReset = new Audio("https://jpk-image-hosting.s3.amazonaws.com/pomodoro-app/audio/start.mp3");

$(document).ready(function(){
	defaultSettings();

	$button.click(buttonPressed);
	function buttonPressed(event){
		let e = event.target.id;
		//console.log(e);
		if(e === "tStart"){
			startPressed();
		}
		else if(e === "tReset"){
			resetPressed();
		}
		else if(e === "breakDown"){
			breakDownPressed();
		}
		else if(e === "breakUp"){
			breakUpPressed();
		}
		else if(e === "timerDown"){
			timerDownPressed();
		}
		else if(e === "timerUp"){
			timerUpPressed();	
		}
		else if(e === "tPause"){
			pausePressed();
		}
	    else if(e === "timerP"){
	      	timerPressed();
	    }
	    /*else if (e === "skipSession"){
	    	skipSessionPressed();
	    }
	    else if(e === "skipBreak"){
	      skipBreakPressed();
	    }*/
	}
});
//functions part
function defaultSettings(){
	$tMinutes.text(defaultTime);
	$tSeconds.text(':00');
	$displayMinutes.text(defaultTime);
	$displaySeconds.text(':00');
	$bMinutes.text(defaultBreak);
	$bSeconds.text(':00');
	$tPause.text("Pause");
  hideInitial();
	/*hideThese();*/
	
}
/*function hideThese(){
	$skipBreak.hide();
	$skipSession.hide();
}*/
function hideInitial(){
  $tPause.hide();
}
function pausePressed() {
	if(paused %2=== 0){
		clearInt();
		whenPaused = timeInSeconds;
		//console.log(whenPaused);
		$tPause.text("Resume");
    if(flag===0){
      $textSessionStarted.text("Session "+countOnlySessions+" Paused");
    }
    else{
       $textSessionStarted.text("Break Paused");
    }
	}
	if(paused%2 ===1){
		timer(whenPaused);
		$tPause.text("Pause");
    if(flag===0){
      $textSessionStarted.text("Session "+countOnlySessions+" Started");
    }
    else{
      $textSessionStarted.text("Break!");
    }
	}
	paused++;
}
/*function timerPressed(){
   $("#timerP").removeClass('bounceIn');
}*/
function whenTheBreakCycleIsOn(){
	endAudio();
  displayTimeLeft(timeInSeconds);
	timer(defaultBreak*60);
	$disableTimerBreak.prop('disabled',true);
	$tStart.prop('disabled',true);
	$textSessionStarted.text("Break!");
	/*$skipSession.hide(700);
	$skipBreakPressed.show(700);*/
	flag=1;//used to determine which cycle is on (break or session)
}
//sth pressed
/*function skipBreakPressed(){
  clearInt();
  startPressed();
}
function skipSessionPressed(){
	clearInt();
	whenTheBreakCycleIsOn();
}*/

function resetdisplay(){
	if(defaultTime<10){
		$displayMinutes.text("0"+defaultTime);
		$displaySeconds.text(":00");
	}
	else	{
	$displayMinutes.text(defaultTime);
	$displaySeconds.text(":00");
	}
}
function startPressed(){
	countOnlySessions++;
  	timer(defaultTime*60);
	startAudio();
	$textSessionStarted.text("Session "+countOnlySessions+" Started");
	$disableTimerBreak.prop('disabled',true);
	$tStart.prop('disabled',true);
  	$skipBreak.hide();;
  	$tPause.show(700);
	$tStart.hide(700);
  	$tReset.show(700);
  	/*$skipSession.show(700);*/
  /*$("#timerP").addClass('animated bounceIn').css('animation-iteration-count','infinite').css('animation-duration','2s');*/
	flag=0;//used to change between the cycle of session and break
}
function resetPressed(){
  resetAudio();
	clearInt();
	resetdisplay();
  	countOnlySessions=0;
  	$textSessionStarted.text("");
	$disableTimerBreak.prop('disabled',false);
	$tStart.prop('disabled',false);
	$tStart.show(700);
	$tPause.text("Pause");
	//$("#$tPause").removeClass('animated bounceIn');
  	$tPause.hide(700);
}
//resets display to the values given by the user before a start session was reset


function timerUpPressed(){
	if(defaultTime>=1 && defaultTime<5){
		defaultTime+=1;
	}
	else if(defaultTime>=5 && defaultTime<=95){
		defaultTime+=5;
	}
	else {
	}
	displayTimerSetter();
}
function timerDownPressed(){
	if(defaultTime>=10){
		defaultTime-=5;
	}
	else if(defaultTime<=5 &&defaultTime>=2){
		defaultTime--;
	}
	else {
	}
	displayTimerSetter();
}
function breakUpPressed(){
	if(defaultBreak>=1 && defaultBreak<=4){
	defaultBreak+=1;
	}
  else if(defaultBreak>=5 &&defaultBreak <=55){
    defaultBreak+=5;
  }
	displayBreakSetter();
}
function breakDownPressed(){
	if(defaultBreak<=5 && defaultBreak>=2){
    defaultBreak--;
  }
  else if(defaultBreak<1){
    $breakDown.prop('disabled',true);
  }
	else if (defaultBreak>=5){
	defaultBreak-=5;
	}
	displayBreakSetter();
}





//reset dipslay
function resetdisplay(){
	if(defaultTime<10){
		$displayMinutes.text("0"+defaultTime);
		$displaySeconds.text(":00");
	}
	else	{
	$displayMinutes.text(defaultTime);
	$displaySeconds.text(":00");
	}
}


//audio

function startAudio(){
	sessionStartAudio.play();
}
function endAudio(){
  sessionEndAudio.play();
}
function resetAudio(){
  onReset.play();
}

//setup

function timer (millseconds){
	now = $.now();
	console.log("now :"+now);
	after = now + millseconds *1000;
	counter = setInterval(setInt,1000);
}

function setInt(){
	timeInSeconds = Math.round((after -Date.now())/1000);
	if(timeInSeconds <=0 ){
		clearInterval(counter);
	  if(flag===0){
			whenTheBreakCycleIsOn();
	}
	else if(flag===1){
		startPressed();
	}
}
displayTimeLeft(timeInSeconds);
//console.log(timeInSeconds);
}
function clearInt(){
	clearInterval(counter);
}

function displayTimeLeft(millseconds){
	minutes = Math.floor(millseconds / 60);
	timeinMinSecFormat =millseconds % 60;
	roundingSec();
	roundingMin();
	//console.log("visszavan:"+minutes,timeinMinSecFormat);
}
function roundingMin(){
	if(minutes<10){
		$displayMinutes.text("0"+minutes+':');
	}else {
		$displayMinutes.text(minutes+":");
	}
}
function roundingSec(){
if(timeinMinSecFormat<10){
		$displaySeconds.text("0"+timeinMinSecFormat);
}else{
		$displaySeconds.text(timeinMinSecFormat);
	}
}
function displayTimerSetter(){
	if(defaultTime<10){
		$tMinutes.text("0"+defaultTime);
		$displayMinutes.text("0"+defaultTime);
	}
	else
	{
	$tMinutes.text(defaultTime);
	$tSeconds.text(":00");
	$displayMinutes.text(defaultTime);
	$displaySeconds.text(":00");
	}
}
function displayBreakSetter(){
	if(defaultBreak<10){
		$bMinutes.text("0"+defaultBreak);
		$bSeconds.text(":00");
	}
	else{
	$bMinutes.text(defaultBreak);
	$bSeconds.text(":00");
	}
}
