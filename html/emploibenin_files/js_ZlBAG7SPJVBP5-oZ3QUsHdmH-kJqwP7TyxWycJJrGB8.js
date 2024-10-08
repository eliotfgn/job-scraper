(function($) {

/**
 * jQuery debugging helper.
 *
 * Invented for Dreditor.
 *
 * @usage
 *   $.debug(var [, name]);
 *   $variable.debug( [name] );
 */
jQuery.extend({
  debug: function () {
    // Setup debug storage in global window. We want to look into it.
    window.debug = window.debug || [];

    args = jQuery.makeArray(arguments);
    // Determine data source; this is an object for $variable.debug().
    // Also determine the identifier to store data with.
    if (typeof this == 'object') {
      var name = (args.length ? args[0] : window.debug.length);
      var data = this;
    }
    else {
      var name = (args.length > 1 ? args.pop() : window.debug.length);
      var data = args[0];
    }
    // Store data.
    window.debug[name] = data;
    // Dump data into Firebug console.
    if (typeof console != 'undefined') {
      console.log(name, data);
    }
    return this;
  }
});
// @todo Is this the right way?
jQuery.fn.debug = jQuery.debug;

})(jQuery);
;

(function($) {

  Drupal.Collapsiblock = Drupal.Collapsiblock || {};

  Drupal.behaviors.collapsiblock = {

    attach: function (context,settings) {
      var cookieData = Drupal.Collapsiblock.getCookieData();
      var slidetype = settings.collapsiblock.slide_type;
      var defaultState = settings.collapsiblock.default_state;
      var slidespeed = parseInt(settings.collapsiblock.slide_speed,10);
      var title = settings.collapsiblock.block_title;
      var block = settings.collapsiblock.block;
      var block_content = settings.collapsiblock.block_content;
      $(block + ':not(.collapsiblock-processed)', context).addClass('collapsiblock-processed').each(function () {
        var id = this.id.replace(/_/g, '-');
        var titleElt = $(title, this).not($('.content :header',this));
        if (titleElt.size()) {
          titleElt = titleElt[0];
          // Status values: 1 = not collapsible, 2 = collapsible and expanded, 3 = collapsible and collapsed, 4 = always collapsed
          var stat = settings.collapsiblock.blocks[id] ? settings.collapsiblock.blocks[id] : defaultState;
          if (stat == 1) {
            return;
          }

          titleElt.target = $(this).find(block_content);
          $(titleElt)
          .wrapInner('<a href="#' + id +'" role="link" />')
          .addClass('collapsiblock')
          .click(function (e) {
            e.preventDefault();  
            var st = Drupal.Collapsiblock.getCookieData();
            if ($(this).is('.collapsiblockCollapsed')) {
              $(this).removeClass('collapsiblockCollapsed');
              if (slidetype == 1) {
                $(this.target).slideDown(slidespeed).attr('aria-hidden', false);
              }
              else {
                $(this.target).animate({
                  height:'show',
                  opacity:'show'
                }, slidespeed);
              }

              // Don't save cookie data if the block is always collapsed.
              if (stat != 4) {
                st[id] = 1;
              }
            }
            else {
              $(this).addClass('collapsiblockCollapsed');
              if (slidetype == 1) {
                $(this.target).slideUp(slidespeed).attr('aria-hidden', true);
              }
              else {
                $(this.target).animate({
                  height:'hide',
                  opacity:'hide'
                }, slidespeed);
              }

              // Don't save cookie data if the block is always collapsed.
              if (stat != 4) {
                st[id] = 0;
              }
            }
            // Stringify the object in JSON format for saving in the cookie.
            var cookieString = '{ ';
            var cookieParts = [];
            $.each(st, function (id, setting) {
              cookieParts[cookieParts.length] = ' "' + id + '": ' + setting;
            });
            cookieString += cookieParts.join(', ') + ' }';
            $.cookie('collapsiblock', cookieString, {
              path: settings.basePath
            });
          });
          $('a[role=link]', titleElt).click(function (e) {
            e.preventDefault();
          });
          // Leave active blocks uncollapsed. If the block is expanded, do nothing.
          if (stat ==  4 || (cookieData[id] == 0 || (stat == 3 && cookieData[id] == undefined)) && !$(this).find('a.active').size()) {
            // Allow block content to assign class 'collapsiblock-force-open' to it's content to force
            // itself to stay open. E.g. useful if block contains a form that was just ajaxly updated and should be visible
            if (titleElt.target.hasClass('collapsiblock-force-open') || titleElt.target.find('.collapsiblock-force-open').size() > 0) {
              return;
            }
            $(titleElt).addClass('collapsiblockCollapsed');
            $(titleElt.target).hide();
          }
        }
      });
    }

  };

  Drupal.Collapsiblock.getCookieData = function () {
    if ($.cookie) {
      var cookieString = $.cookie('collapsiblock');
      return cookieString ? $.parseJSON(cookieString) : {};
    }
    else {
      return '';
    }
  };


})(jQuery);
;
(function ($) {
    'use strict';
    Drupal.behaviors.ACChangeEnterBehavior = {
        attach: function (context, settings) {
            $('input.form-autocomplete', context).once('ac-change-enter-behavior', function() {
                $(this).keypress(function(e) {
                    var ac = $('#autocomplete');
                    if (e.keyCode == 13 && typeof ac[0] != 'undefined') {
                        e.preventDefault();
                        ac.each(function () {
                            if(this.owner.selected == false){
                                this.owner.selectDown();
                            }
                            this.owner.hidePopup();
                        });
                        $(this).trigger('change');
                    }
                });
            });
        }
    };
}(jQuery));
;
