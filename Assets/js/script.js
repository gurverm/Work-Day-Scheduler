// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs();


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var timeBlockBoxesEl = $('.time-block');

  $('.saveBtn').on('click', function(){
    var timeBlockEl = $(this).closest('.time-block'); // 'this' refers to any DOM element that triggered its event. In this case it is the saveBtn or button.
    var timeBlockElId = timeBlockEl.attr('id');
    var description = timeBlockEl.find('.description').val();

    localStorage.setItem(timeBlockElId,description);
  });


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  timeBlockBoxesEl.each(function(){

    var timeBlockEl = $(this);
    var timeBlockElId = timeBlockEl.attr("id");
    var hour = dayjs(timeBlockElId, "H"); // this 'H' represents the 24 hour format of dayjs. if we wanted to use the 12 hour format the syntax would be 'hA'

    if (hour.isBefore(today, "hour")) {
      timeBlockEl.addClass("past");
    } else if (hour.isSame(today, "hour")) {
      timeBlockEl.addClass("present");
    } else {
      timeBlockEl.addClass("future");
    }
  });


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  timeBlockBoxesEl.each(function () {

    var timeBlockEl = $(this); // 'this' will refer to the time block class but respond to this function
    var timeBlockElId = timeBlockEl.attr("id");

    var description = localStorage.getItem(timeBlockElId);

    if (description) {
      timeBlockEl.find(".description").val(description);
    }
  });


    // TODO: Add code to display the current date in the header of the page.
  
  var currentDate = $('#currentDay');
  currentDate.text(today.format("dddd MMMM D, YYYY. h:mm:ss:a"));
});

