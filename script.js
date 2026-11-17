$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.pet-button').click(clickedPetButton);
    $('.reset-button').click(clickedResetButton);

    const $petEffect = $('#pet-effect');
    // Variables needed for petting
    const petImage = $('.pet-image');
    let lastX = null;
    let lastY = null;
    let mouseDistance = 0;

    //Unique method
    //.mousemove() trigger when mouse moves over the selected element and runs the function specified in the argument
    //Method is deprecated
    //Should use .on("mousemove", handler) instead
    //Detect mouse movement over the pet image
    petImage.mousemove(function(e) {
      
      //Calculate distance moved by mouse
      if (lastX !== null && lastY !== null) {
        let updateX = e.pageX - lastX;
        let updateY = e.pageY - lastY;
        mouseDistance +=  Math.hypot(updateX, updateY);

        //Adds 1 to happiness and pet counter if mouse moved enough to be considered a pet
        if (mouseDistance > 400) {
          //Triggers pet button click function
          clickedPetButton();
          //Reset mouse distance to 0 to track next petting
          mouseDistance = 0;
        }
      }

      //Update last mouse position
      lastX = e.pageX;
      lastY = e.pageY;
    });

    //Unique method
    //.mouseleave() trigger when mouse leaves the selected element and runs the function specified in the argument
    //Method is deprecated
    //Should use .on("mouseleave", handler) instead
    //Reset the last mouse position to null and distance moved to 0 when the mouse leaves the pet image
    //Prevents mouse tracking outside pet image
    petImage.mouseleave(function(e) {
      lastX = null;
      lastY = null;
      mouseDistance = 0;
    });

  

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Friday", weight:10, happiness:10, petsGiven: 0};

    function petEffect() {
      const $petEffect = $('#pet-effect');
      $petEffect.stop(true, true).fadeIn(200).delay(1000).fadeOut(200);
    }

    function clickedTreatButton() {
      // Increase pet happiness
      pet_info['happiness'] += 1;
      // Increase pet weight
      pet_info['weight'] += 1;
      petEffect();
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      pet_info['happiness'] += 1;
      // Decrease pet weight
      pet_info['weight'] -= 1;
      petEffect();
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info['happiness'] -= 1;
      // Decrease pet weight
      pet_info['weight'] -= 1;
      checkAndUpdatePetInfoInHtml();
    }

    function clickedPetButton() {
      // Increase pet happiness
      pet_info['happiness'] += 1;
      // Increase pets given
      pet_info['petsGiven'] += 1;
      petEffect();
      checkAndUpdatePetInfoInHtml();
    }
    // Resets weight, happiness, and pets given to their original values
    function clickedResetButton() {
      // Reset pet information
      pet_info['weight'] = 10;
      pet_info['happiness'] = 10;
      pet_info['petsGiven'] = 0;
      checkAndUpdatePetInfoInHtml();
    }

    
    
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info['weight'] < 0) {
        pet_info['weight'] = 0;
      }
      if (pet_info['happiness'] < 0) {
        pet_info['happiness'] = 0;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.pets-given').text(pet_info['petsGiven']);
    }
  