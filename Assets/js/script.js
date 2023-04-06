$(function () {

  var today = dayjs();
  var timeBlockBoxesEl = $('.time-block');

  $('.saveBtn').on('click', function(){
    var timeBlockEl = $(this).closest('.time-block'); // 'this' refers to any DOM element that triggered its event. In this case it is the saveBtn or button.
    var timeBlockElId = timeBlockEl.attr('id');
    var description = timeBlockEl.find('.description').val();
    localStorage.setItem(timeBlockElId,description);
  });

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

  timeBlockBoxesEl.each(function () {
    var timeBlockEl = $(this); // 'this' will refer to the time block class but respond to this function
    var timeBlockElId = timeBlockEl.attr("id");
    var description = localStorage.getItem(timeBlockElId);
    if (description) {
      timeBlockEl.find(".description").val(description);
    }
  });

  var currentDate = $('#currentDay');
  currentDate.text(today.format("dddd MMMM D, YYYY. h:mm:ss:a"));
});

