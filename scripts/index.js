
// enables logging of timing related data.
const LOG_DATA = false;

//Map GUI elements to classes representing tracks and sample players
const BPM = 102;
var trackCollection = new SessionTrackCollection(BPM);
var trackElements = document.querySelectorAll('.track')
trackElements.forEach(function(trackElement) {
	//add track to collection
	var trackId = trackElement.getAttribute("id");
	track = new SessionTrack(trackId);
	trackCollection.addTrack(trackId, track);
	//add players to track
	var playerElements = trackElement.querySelectorAll('.player');
	playerElements.forEach(function(playerElement) {
		var playerId = playerElement.getAttribute("id")
		var url = playerElement.getAttribute("url")
		track.addPlayer(playerId, url);
		playerElement.addEventListener('click', function() {
			if ( playerElement.classList.contains("playing")
				|| playerElement.classList.contains("queued")) {
				trackCollection.stop(trackId, playerId);
			} 
			else {
				trackCollection.play(trackId, playerId);
			}
		})
	});

}); 

// Create Effects controls
document.querySelectorAll(".effect-controls").forEach(function(effectControls) {
	var effectName = effectControls.getAttribute("effect-name");
	var fgColor = "white";
	switch(effectName) {
		case "gain":
		fgColor = "#A6BE00";
		break;
		case "distortion":
		fgColor = "#3DC300";
		break;
		case "delay":
		fgColor = "#25FFA8";
		break;
		case "reverb":
		fgColor = "#1AFF2F";
		break;
	}
	effectControls.querySelectorAll(".dial-container")
	.forEach(function(element){
		var trackId = element.getAttribute("track-id");
		$(element).find(".dial").knob({
			'min': 0,
			'max' : 1,
			'step' : 0.01,
			'displayInput' : false,
			'fgColor' : fgColor,
			'change' : function (value) {
				trackCollection.setEffectValueForTrack(effectName, trackId, value)
			}
		});
	});
});

// once all audio buffers loaded render the playback and effect controls
Tone.Buffer.on('load', function(){
	document.querySelector("#loader").className += " hidden";
	document.querySelector("#player-grid").classList.remove("hidden");
	document.querySelector("#effects-grid").classList.remove("hidden-but-rendered");
})









