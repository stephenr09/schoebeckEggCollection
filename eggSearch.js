var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

//Initiating the Speech API to constantly listen
var recognizing = false;
var ignore_onend;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.start();

recognition.onstart = function() {
    recognizing = true;
    console.log('Listening...');
};

recognition.onerror = function(event) {
};

recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
        return;
        }
};

//Recognize when user prompts egg search function with "okay museum"
recognition.onresult = function(event) {
    var transcripted = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        transcripted += event.results[i][0].transcript.toLowerCase();
    }
    var searchCue = "okay museum";
    if(transcripted.includes(searchCue)){
        testSpeech();
    }
};

//Phrases that the search recognizes
var phrases = [
    '1',
    '2',
    'one',
    'two'
   ];
   
  var errorPara = document.querySelector('.voice');
  
  var testBtn = document.querySelector('.speech');
  
  function testSpeech() {
    testBtn.disabled = true;
    testBtn.textContent = 'Listening';
    testBtn.style.backgroundColor = '#5e6eba';

    errorPara.textContent = 'Or say, "Okay Museum, show me egg number...';
    errorPara.style.background = '';
    
    var grammar = '#JSGF V1.0; grammar phrase;';
    var search = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    search.grammars = speechRecognitionList;
    search.lang = 'en-US';
    search.interimResults = false;
    search.maxAlternatives = 1;
  
    search.start();
  
    search.onresult = function(event) {
  
    var speechResult = event.results[0][0].transcript;
    
    //Search speechResult for matching string in phrases[]
    var i = 0;
    var found = false;
    while(!found && i < phrases.length){
      if(speechResult.includes(phrases[i])){
        contentSwitch(phrases[i]);
        found = true;
        break;
      }    
      i++;
    }
    //If no matches, Display Try Again message
    if(!found){
      errorPara.textContent = 'Try Again';
      errorPara.style.background = 'red';
      console.log('Phrase not found');
    }
    
      console.log('Phrase heard: ' + speechResult);
      console.log('Confidence: ' + event.results[0][0].confidence);
    }
  
    search.onspeechend = function() {
      testBtn.disabled = false;
      testBtn.textContent = 'Voice Search';
    }
  
    search.onerror = function(event) {
      testBtn.disabled = false;
      testBtn.textContent = 'Voice Search';
      console.log('Error occurred in recognition: ' + event.error);
    }
    
    search.onaudiostart = function(event) {
        //Fired when the user agent has started to capture audio.
        console.log('SpeechRecognition.onaudiostart');
    }
    
    search.onaudioend = function(event) {
        //Fired when the user agent has finished capturing audio.
        console.log('SpeechRecognition.onaudioend');
    }
    
    search.onend = function(event) {
        search.stop();
        recognition.start();
        //Fired when the speech recognition service has disconnected.
        console.log('SpeechRecognition.onend');
    }
    
    search.onnomatch = function(event) {
        //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        console.log('SpeechRecognition.onnomatch');
    }
    
    search.onsoundstart = function(event) {
        //Fired when any sound — recognisable speech or not — has been detected.
        console.log('SpeechRecognition.onsoundstart');
    }
    
    search.onsoundend = function(event) {
        testBtn.style.backgroundColor = '#2c3667';
        //Fired when any sound — recognisable speech or not — has stopped being detected.
        console.log('SpeechRecognition.onsoundend');
    }
    
    search.onspeechstart = function (event) {
        //Fired when sound that is recognised by the speech recognition service as speech has been detected.
        console.log('SpeechRecognition.onspeechstart');
    }

    search.onstart = function(event) {
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
    }
}

testBtn.addEventListener('click', testSpeech);
//--------------------------------------------------
//             END SPEECH RECOGNIZER
//--------------------------------------------------

//Numpad functionality
function inputNumber(number){
    var numpad = document.forms[0].numpad;
    numpad.value = numpad.value + number;
}

//Display number result when user hits "GO" on numpad
function displayResult(){
	var input = document.getElementById("numpadSearch").elements;
	alert(input['numpad'].value);
}

//Backspace button on numpad
function backSpace(){
	var numpad = document.forms[0].numpad;
	numpad.value = numpad.value.substring(0, numpad.value.length - 1);
}

var audioElement = new Audio();

//Grab keypad input value
function grabNumber(){
	var input = document.getElementById("numpadSearch").elements;
	var number = input['numpad'].value;
	contentSwitch(number);
}

//Switch bird content out based on result of speech input or numpad 
function contentSwitch(number){
	var result = document.getElementById("birdName");
	var factText = document.getElementById("facts");
	var photo1 = document.getElementById("birdPhoto1");
	var photo2 = document.getElementById("birdPhoto2");

	switch(number){
		case "1": case "one":
			factText.innerHTML = "The northern mockingbird (Mimus polyglottos) is the only mockingbird commonly found in North America. The northern mockingbird is known for its mimicking ability, as reflected, by the meaning of its scientific name, 'many-tounged mimic'. It has gray to brown upper feathers and a paler belly. Its tail and wings have white patches which are visible in flight.";
			photo1.innerHTML = "<img src='images/mockingbird.jpg' class='bird' alt='Left Photo of bird'/>";
			photo2.innerHTML = "<img src='images/mockingbird2.jpg' class='bird' alt='Right photo of bird'/>";
			result.innerHTML = "Mockingbird";
			var speakerIcon = document.createElement('span');
			speakerIcon.innerHTML = "&#x1f50a";
			speakerIcon.addEventListener('click', function(){playAudio('audio/mockingbirdAudio.mp3')});
			result.appendChild(speakerIcon);

			break;
		case "2": case "two":
			factText.innerHTML = "The American robin (Turdus migratorius) is a migratory songbird of the true thrush genus and Turdidae, the wider thrush family. It is named after the European robin because of its reddish-orange breast, though the two species are not closely related, with the European robin belonging to the Old World flycatcher family. The American robin is widely distributed throughout North America, wintering from southern Canada to central Mexico and along the Pacific Coast.";
			photo1.innerHTML = "<img src='images/robin.jpg' class='bird' alt='Left Photo of bird'/>";
			photo2.innerHTML = "<img src='images/robin2.jpg' class='bird' alt='Right photo of bird'/>";
			result.innerHTML = "Robin";
			var speakerIcon = document.createElement('span');
			speakerIcon.innerHTML = "&#x1f50a";
			speakerIcon.addEventListener('click', function(){playAudio('audio/robinAudio.mp3')});
			result.appendChild(speakerIcon);
			
			break;
	}
  
    //Reset numpad display value when user hits 'GO'
    document.getElementById("numpad").value = "";
}

//Play audio clip of selected bird
function playAudio(url) {
	audioElement.src = url;
	audioElement.play();
  }


//Screensaver functionality
var timer;
$(document).mousemove(function() {
    if (timer) {
        clearTimeout(timer);
		timer = 0;
    }
    $('#screensaver:visible').fadeOut();
    timer = setTimeout(function() {
		$('#screensaver').fadeIn()
		
		//Resets content of page
		document.getElementById("birdName").innerHTML = "Select an Egg!";
		document.getElementById("facts").innerHTML = "";
		document.getElementById("birdPhoto1").innerHTML = "";
		document.getElementById("birdPhoto2").innerHTML = "";

    }, 30000)
})