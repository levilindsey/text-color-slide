/**
 * This module defines a constructor for objects that animate text color.
 *
 * @module textColorSlider
 */
(function () {
  // ------------------------------------------------------------------------------------------- //
  // Private static variables

  var config, util, log, textColorSlider;

  // ------------------------------------------------------------------------------------------- //
  // Private dynamic functions

  /**
   * TODO: doc
   *
   * @param {HTMLElement} element
   */
  function createElements(element) {
    var textColorSlider, originalElement, copyElement, containerElement;

    textColorSlider = this;

    // TODO:

    originalElement = ;
    copyElement = ;
    containerElement = ;

    textColorSlider.originalElement = originalElement;
    textColorSlider.copyElement = copyElement;
    textColorSlider.containerElement = containerElement;
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * TODO: doc
   *
   * @param {number} progress A number between 0 and 1.
   */
  function setColorSlideProgress(progress) {
    var textColorSlider;

    textColorSlider = this;

    // TODO:
  }

  /**
   * TODO: doc
   *
   * @param {boolean} useEndColor
   */
  function endColorSlide(useEndColor) {
    var textColorSlider;

    textColorSlider = this;

    // TOOD:
  }

  // ------------------------------------------------------------------------------------------- //
  // Private static functions

  // ------------------------------------------------------------------------------------------- //
  // Public static functions

  /**
   * Initializes some static state for this module.
   */
  function initStaticFields() {
    config = app.config;
    util = app.util;
    log = new app.Log('textColorSlider');
    log.d('initStaticFields', 'Module initialized');
  }

  // ------------------------------------------------------------------------------------------- //
  // Expose this constructor

  /**
   * @constructor
   * @global
   * @param {HTMLElement} element
   * @param {string} color
   */
  function TextColorSlider(element, color) {
    var textColorSlider;

    textColorSlider = this;

    textColorSlider.color = color;
    textColorSlider.originalElement = null;
    textColorSlider.copyElement = null;
    textColorSlider.containerElement = null;

    textColorSlider.setColorSlideProgress = setColorSlideProgress;
    textColorSlider.endColorSlide = endColorSlide;

    createElements.call(textColorSlider, element);
  }

  // Expose this module
  if (!window.app) window.app = {};
  window.app.TextColorSlider = TextColorSlider;
  TextColorSlider.initStaticFields = initStaticFields;

  console.log('textColorSlider module loaded');
})();
