var docEl = doc.documentElement;

fn.extend({

  jqPosition(){
    var el = this[0];
    if (!el) {
      return;
    }

    var oP, cashOP, offset, doc;
    var cashEl = cash(el);
    var parentOffset = {top: 0, left: 0};

    if (cashEl.css('position') === 'fixed') {
      offset = el.getBoundingClientRect();
    } else {
      offset = this.offset();

      doc = el.ownerDocument;
      oP = el.offsetParent || docEl;
      cashOP = cash(oP);

      while (oP && (oP === doc.body || oP === docEl) &&
        cashOP.css('position') === 'static') {
        oP = oP.parentNode;
      }

      if (oP && oP !== el && oP.nodeType === 1) {
        parentOffset = cashOP.offset();
        parentOffset.top += parseInt(cashOP.css('borderTopWidth'), 10) || 0;
        parentOffset.left += parseInt(cashOP.css('borderLeftWidth'), 10) || 0;
      }
    }

    return {
      top: offset.top - parentOffset.top -
        (parseInt(cashEl.css('marginTop'), 10) || 0),
      left: offset.left - parentOffset.left -
        (parseInt(cashEl.css('marginLeft'), 10) || 0)
    };
  }

});
