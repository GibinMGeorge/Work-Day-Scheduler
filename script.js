// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Use the id in the containing time-block as a key to save the user input in local storage.
    var blockId = $(this).closest(".time-block").attr("id");
    var userText = $(this).siblings(".description").val().trim();

    if (userText !== "") {
      localStorage.setItem(blockId, userText);
    }
  });

  // TODO: Add code to apply the past, present, or future class to each time block.
  function updateBlockStyles() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call the function to update time block styles initially.
  updateBlockStyles();

  // Set up interval to update time block styles every minute.
  setInterval(updateBlockStyles, 60000);

  // TODO: Add code to get any user input that was saved in localStorage.
  function loadSavedInput() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedText = localStorage.getItem(blockId);

      if (savedText !== null) {
        $(this).find(".description").val(savedText);
      }
    });
  }

  // Call the function to load saved input initially.
  loadSavedInput();

  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});
