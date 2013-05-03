var emptyFunc = function () {};

//////////////////////////////////////////////////////////////////////
// bootstrap popover (for bootstrapx-clickover)
//////////////////////////////////////////////////////////////////////

!function ($) {

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  Popover.prototype = $.extend({}, {
    constructor: Popover
  , init: emptyFunc
  , setContent: emptyFunc
  , hasContent: emptyFunc
  , getContent: emptyFunc
  , tip: emptyFunc
  , destroy: emptyFunc
  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover;
    
}(window.jQuery);  // end bootstrap popover stub
