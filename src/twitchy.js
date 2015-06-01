'use strict';
(function(angular){

  /* global sanitizeText: false */

  /**
   * @ngdoc filter
   * @name twitchy
   * @kind function
   *
   * @description
   * Finds twitch emotes in text input and turns them into css icons.
   *
   * Extendable with paralin/twitch-chat-emoticon-sprites, generate the sprites you want and specify the extra emotes to detect.
   *
   * @param {string} text Input text.
   * @returns {string} Html-linkified text.
   *
   * @usage <span ng-bind-html="twitch_expression | twitchy"></span>
   */
  var module = angular.module('twitchy', ['ngSanitize']);
  var prov = {
    emotes: {{EMOTES}},
    addEmotes: function(emots){
      emots.forEach(function(emo){
        if(prov.emotes.indexOf(emo)==-1) prov.emotes.push(emo);
      });
    }
  };

  module.factory("twitchyConfig", function() {
    return prov;
  });

  module.filter('twitchy', ['$sanitize', function($sanitize) {
    return function(text, target) {
      if (!text) return text;
      text = $sanitize(text);

      prov.emotes.forEach(function(emot){
        var reg = new RegExp(emot, 'g');
        text = text.replace(reg, "<i class=\"twitch "+emot+"\"/>");
      });

      return text;
    };
  }]);
})(angular);
