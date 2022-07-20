function generatePlanner(time, time_24, timeText) {
    //defines rows for each hour block
    var $rowEl = $('<div>').addClass("row py-1");
    $rowEl.attr("value", time_24);

    //creates a 3 coloumn block to display time, text and save button
    //display time
    var $col1El = $('<div>').addClass("col-2 py-3 bg-warning align-middle");
    var $timeEl = $('<h5>').addClass("text-center").text(time + timeText);
    //append column to the time block
    $col1El.append($timeEl);
    //write text
    var $col2El = $('<textarea>').addClass("col-8 py-3 overflow-auto border border-primary");
    $col2El.attr("id", "id" + time_24)
    //save button-icon
    var $col3El = $('<button>').addClass("saveBtn col-1 py-3 btn btn-success btn-block");
    var $saveIconEl = $('<i>').addClass('fas fa-save');
    $col3El.append($saveIconEl);
    //append all three coloumns in a row
    $rowEl.append($col1El, $col2El, $col3El);

    //grabs current time
    var currentTime = parseInt(moment().format('H'));
    if (currentTime === time_24)//3==3
    {
        $col2El.css("background", "white")    //present
    }
    else if (currentTime > time_24)//3>1
    {
        $col2El.css("background", "red")    //past
    }
    else if (currentTime < time_24)//3>1)
    {
        $col2El.css("background", "green")    //future    
    }
    $(".container").append($rowEl);
}

//saves the plan for the time of day into the local storage
function setPlan(timeOfday, plan) {
    localStorage.setItem(timeOfday, plan);
}

//get the plan from local storage
function getPlan(time) {
    let plan = localStorage.getItem(time)
    if (true) {
        var text = $(`#id` + time).val(plan)
    }
}
$(document).ready(function () {
    //display current day on the top
    $('#currentDay').css("font-weight", "bold").text(moment().format('dddd, MMMM Do, YYYY'));

    var time = 0;
    //Business hrs 9am-5pm
    for (var i = 9; i <= 17; i++) {
        //when time is before 12 pm
        if (i < 12) { 
            //it will be morning
            generatePlanner(i, i, ":00 AM")
        }
        //when time is 12 pm change am to pm
        else if (i === 12) { 
            //it will be noon
            generatePlanner(i, i, ":00 PM")
        }
        else {
            //when time has past 12 pm change am to pm and start with 1 
            time++;
            //passing i to change the bgcolor using time-24hr
            generatePlanner(time, i, ":00 PM")
        }
        getPlan(i)
    }
 
    //When you click save button
    $(".saveBtn").on('click', function () {
        //grab the time using current row
        var timeOfday = $(this).parent().attr("value");
        //get plan from textarea at that time
        var plan = $(this).siblings('textArea').val()
        //saves user data to local storage
        if (plan) {
            setPlan(timeOfday, plan);
        }
        else {
            alert("Please enter your plan first!")
        }
    });
});