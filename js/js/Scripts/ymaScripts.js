if (typeof (Yma) == "undefined") {
    Yma = { __namespace: true };
}

Yma.Opportunity = {
    _currentStage: null,
    _probabilityInfo: null,
    _formContext: null,

    onFormLoad: function (e) {
        var self = Yma.Opportunity;

        if (Xrm.Page.ui.getFormType() == 1) {
            //Create
            self._currentStage = -1; //this will trigger seting default probability
        }
     
        self._addOnChangeToAttr("aba_stage", self.);
     
    },
    _getAttrVal: function (attrName) {
        var val = null;
        var attr = Xrm.Page.getAttribute(attrName);

        if (attr != null)
            val = attr.getValue();

        return val;
    },

    _getLookupId: function (attrName) {
        var id = null;
        var attr = Xrm.Page.getAttribute(attrName);
        var lookUpValue = attr.getValue();
        if (attr != null) {
            if (!(lookUpValue == null || lookUpValue.length == 0)) {
                id = lookUpValue[0].id;
                id = id.substr(1, id.length - 2)
            }
        }
        return id;
    },

    _setAttrValue: function (attrName, val, fireOnChange) {
        if (typeof fireOnChange == "undefined")
            fireOnChange = true;

        var attr = Xrm.Page.getAttribute(attrName);
        if (attr != null) {
            attr.setValue(val);
            if (fireOnChange)
                attr.fireOnChange();
        }
    },

    _addOnChangeToAttr: function (attrName, func) {
        var attr = Xrm.Page.getAttribute(attrName);
        if (attr != null) {
            attr.addOnChange(func);
        }
    }
};