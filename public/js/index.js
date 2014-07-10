/**
 * This static module is the starting point of the app.
 *
 * @module index
 */
(function () {

  var config, util, log, TextColorSlider;

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  /**
   * Initializes this app.
   */
  function init() {
    config = app.config;
    util = app.util;
    app.Log.initStaticFields();
    log = new app.Log('index');

    log.d('init');

    config.init();
    util.init();

    util.listen(window, 'load', onDocumentLoad);
  }

  /**
   * Resets all of the state for this app.
   */
  function reset() {
    TextColorSlider = app.TextColorSlider;
    TextColorSlider.initStaticFields();

    log.i('reset', 'All modules initialized');

    checkBrowserCompatibility();

    setUpColorSlider();
  }

  /**
   * TODO: doc
   */
  function setUpColorSlider() {
    var textColorSlider, element, button, color, updateDelay, slideDuration, reverseSlide, interval;

    element = document.getElementById('recipe');
    button = document.getElementById('slide-color-trigger');

    color = '#334488';
    slideDuration = 3000;
    updateDelay = 100;
    reverseSlide = false;

    textColorSlider = new TextColorSlider(element, color);

    button.addEventListener('click', function () {
      clearInterval(interval);
      interval = slideColor(textColorSlider, reverseSlide, slideDuration, updateDelay);
      reverseSlide = !reverseSlide;
    }, false);
  }

  /**
   * TODO: doc
   *
   * @param {TextColorSlider} textColorSlider
   * @param {boolean} reverseSlide
   * @param {number} slideDuration In milliseconds.
   * @param {number} updateDelay In milliseconds.
   * @returns {number} Interval ID.
   */
  function slideColor(textColorSlider, reverseSlide, slideDuration, updateDelay) {
    var startTime, interval;

    startTime = Date.now();

    interval = setInterval(function () {
      var deltaTime, currentProgress;

      // Calculate the color slide progress
      deltaTime = Date.now() - startTime;
      currentProgress = deltaTime / slideDuration;
      currentProgress = currentProgress >= 1 ? 1 : currentProgress;
      currentProgress = reverseSlide ? 1 - currentProgress : currentProgress;

      // Update the color slide
      textColorSlider.setColorSlideProgress(currentProgress);

      // Check if the slide is done
      if (currentProgress >= 1) {
        clearInterval(interval);
        reverseSlide = !reverseSlide;
      }
    }, updateDelay);

    return interval;
  }

  /**
   * This is the event handler for the completion of the DOM loading.
   */
  function onDocumentLoad() {
    log.i('onDocumentLoad');

    reset();
    util.stopListening(window, 'load', onDocumentLoad);
  }

  /**
   * Checks browser compatibility with some of the features that this app requires.
   */
  function checkBrowserCompatibility() {
    if (!util.isBrowserCompatible) {
      showErrorMessage(config.L18N.EN.BAD_BROWSER_MESSAGE);
    }
  }

  /**
   * Adds an error message ribbon overtop of the document body. This message can be closed by
   * tapping on it.
   *
   * @param {string} message The text to show in the error display.
   */
  function showErrorMessage(message) {
    var body, errorMessageElement;

    body = document.getElementsByTagName('body')[0];

    errorMessageElement = util.createElement('div', body, null, ['errorMessage']);
    errorMessageElement.innerHTML = message;
    errorMessageElement.onclick = function () {
      body.removeChild(errorMessageElement);
    };
  }

  // ------------------------------------------------------------------------------------------- //

  if (!window.app) window.app = {};

  console.log('index module loaded');

  init();
})();
