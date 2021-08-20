
    window.onload = displayClock();
    function displayClock(){
      var display = new Date().toLocaleTimeString();
      let workingLiveTime = document.getElementById("workingLiveTime");
      let notWorkingLiveTime = document.getElementById("notWorkingLiveTime");
      workingLiveTime.innerHTML = display;
      notWorkingLiveTime.innerHTML = display;
      setTimeout(displayClock, 1000); 
    }
