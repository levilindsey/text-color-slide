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
    var textColorSlider, parentElement, copyElement, containerElement, offsetLeft, offsetTop,
        width, height;

    textColorSlider = this;

    parentElement = element.parentNode;
    if (getComputedStyle(parentElement).getPropertyValue('position') === 'static') {
      parentElement.style.position = 'relative';
    }

    containerElement = document.createElement('div');
    parentElement.appendChild(containerElement);
    containerElement.style.position = 'absolute';
    containerElement.style.overflow = 'hidden';

    copyElement = element.cloneNode(true);
    containerElement.appendChild(copyElement);
    copyElement.style.position = 'absolute';
    copyElement.style.borderColor = 'transparent';
    copyElement.style.backgroundColor = 'transparent';
    copyElement.style.color = textColorSlider.color;
    copyElement.id += '-copy';

    offsetLeft = element.offsetLeft;
    offsetTop = element.offsetTop;
    width = element.offsetWidth;
    height = element.offsetHeight;

    copyElement.style.width = width + 'px';
    copyElement.style.height = height + 'px';
    copyElement.style.left = '0px';
    copyElement.style.top = height + 'px';

    containerElement.style.width = width + 'px';
    containerElement.style.height = height + 'px';
    containerElement.style.left = offsetLeft + 'px';
    containerElement.style.top = offsetTop - height + 'px';

    textColorSlider.originalElement = element;
    textColorSlider.copyElement = copyElement;
    textColorSlider.containerElement = containerElement;
    textColorSlider.offsetHeight = height;
    textColorSlider.offsetTop = offsetTop;
  }

  // ------------------------------------------------------------------------------------------- //
  // Public dynamic functions

  /**
   * TODO: doc
   *
   * @param {number} progress A number between 0 and 1.
   */
  function setColorSlideProgress(progress) {
    var textColorSlider, containerOffset, copyOffset;

    textColorSlider = this;

    containerOffset = textColorSlider.offsetTop - (1 - progress) * textColorSlider.offsetHeight;
    copyOffset = (1 - progress) * textColorSlider.offsetHeight;

    textColorSlider.containerElement.style.top = containerOffset + 'px';
    textColorSlider.copyElement.style.top = copyOffset + 'px';
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
    textColorSlider.offsetHeight = 0;
    textColorSlider.offsetTop = 0;

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
