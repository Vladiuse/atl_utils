async function waitForTranslation(){
    console.warn("waitForTranslation must be rewrite")
}

class TranslateDebuger {
    static GET_PARAM_FLAG_NAME = 'translation_debug'
    static STYLE_ID = `${TranslateDebuger.GET_PARAM_FLAG_NAME}_style`
    static TRANSLATE_ELEM_CLASS_PREFIX = "text_"
    static CSSRULES = {
        green: `{
                  background-color: #55ff63 !important;
                  border: 1px dashed red !important;
                }`,
        red: `{
                  background-color: #ff5555 !important;
                  color: black !important;
                  border: 1px dashed blue !important;
                }`,
        blue: `{
                  background-color: #5574ff !important;
                  border: 1px dashed red !important;
                }`,
        yellow: `{
                  background-color: #fff455 !important;
                  color: black !important;
                  border: 1px dashed red !important;
                }`,
    }

    static CSS_RULES_ADDITIONAL = {
        green: `{
                  background-color: #006e09 !important;
                  border: 1px dashed red !important;
                }`,
        red: `{
                  background-color: #6e0000 !important;
                  border: 1px dashed blue !important;
                }`,
        blue: `{
                  background-color: #1e22ff !important;
                  border: 1px dashed red !important;
                }`,
        yellow: `{
                  background-color: #6e6c00 !important;
                  color: black !important;
                  border: 1px dashed red !important;
                }`,
    }


    constructor() {
        this._additionalClasses = new Set()

    }
    _removeStyles() {
        var style = document.getElementById(TranslateDebuger.STYLE_ID)
        if (style) {
            style.remove()
        }
    }

    _getStyleElem() {
        this._removeStyles()
        var styleElem = document.createElement('style')
        styleElem.id = TranslateDebuger.STYLE_ID
        document.querySelector('body').appendChild(styleElem)
        return styleElem
    }

    addAdditionalClasses(classes) {
        for (const className of classes) {
            if (typeof className !== 'string') {
                console.warn(`IncorrectType: ${className} is not a string`);
                continue;
            }
            if (className.startsWith(TranslateDebuger.TRANSLATE_ELEM_CLASS_PREFIX)) {
                continue;
            }
            this._additionalClasses.add(className);
        }
    }

    show(colorName) {
        var styleElem = this._getStyleElem()
        var cssRule = TranslateDebuger.CSSRULES[colorName]
        if (cssRule == undefined) {
            cssRule = TranslateDebuger.CSSRULES.green
        }
        var rule = `[class*="${TranslateDebuger.TRANSLATE_ELEM_CLASS_PREFIX}"]${cssRule}`
        styleElem.sheet.insertRule(rule)

        var cssRuleAditional = TranslateDebuger.CSS_RULES_ADDITIONAL[colorName]
        if (cssRuleAditional == undefined) {
            cssRuleAditional = TranslateDebuger.CSS_RULES_ADDITIONAL.green
        }
        this._additionalClasses.forEach(className => {
            var rule = `.${className}${cssRuleAditional}`
            styleElem.sheet.insertRule(rule)
        })
    }
    hide() {
        this._removeStyles()
    }

    async listenGetParamFlag() {
        await waitForTranslation()
        var url = new URLSearchParams(document.location.search)
        var colorName = url.get(TranslateDebuger.GET_PARAM_FLAG_NAME)
        if (colorName != null) {
            this.show(colorName)
        }
    }
}