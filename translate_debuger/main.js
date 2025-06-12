class TranslateDebuger {
            static GET_PARAM_FLAG_NAME = 'translation_debug'
            static PREFIX = "__translate_debug"
            static TRANSLATE_ELEM_CLASS_PREFIX = "text_"
            static CLASS_NAME = TranslateDebuger.PREFIX
            static CLASS_NAME_ADDITIONAL = `${TranslateDebuger.PREFIX}_additional`
            // colors
            static CLASS_NAME_RED = `${TranslateDebuger.PREFIX}_red`
            static CLASS_NAME_BLUE = `${TranslateDebuger.PREFIX}_blue`
            static CLASS_NAME_YELLOW = `${TranslateDebuger.PREFIX}_yellow`
            static COLOR_CLASS_MAP = {
                red: TranslateDebuger.CLASS_NAME_RED,
                blue: TranslateDebuger.CLASS_NAME_BLUE,
                yellow: TranslateDebuger.CLASS_NAME_YELLOW,
            }

            constructor() {
                this._additionalClasses = new Set()

                this._init_()
            }

            _init_() {
                this._createStyle()
            }

            _getTranslateElems() {
                var prefixSelector = `[class*=${TranslateDebuger.TRANSLATE_ELEM_CLASS_PREFIX}]`
                return document.querySelectorAll(prefixSelector)
            }

            _getAdditionaltranslateElems() {
                var selectors = []
                this._additionalClasses.forEach(className => {
                    selectors.push('.' + className)
                })
                var selector = selectors.join(',')
                return document.querySelectorAll(selector)
            }

            _createStyle() {
                const style = document.createElement('style');
                style.textContent = `
                    .${TranslateDebuger.CLASS_NAME} {
                        background-color: #55ff63;
                    }
                    .${TranslateDebuger.CLASS_NAME_ADDITIONAL} {
                        background-color: #006e09;
                    }
                    .${TranslateDebuger.CLASS_NAME}.${TranslateDebuger.CLASS_NAME_RED} {
                        background-color: #ff5555;
                    }
                    .${TranslateDebuger.CLASS_NAME_ADDITIONAL}.${TranslateDebuger.CLASS_NAME_RED} {
                        background-color: #6e0000;
                    }
                    .${TranslateDebuger.CLASS_NAME}.${TranslateDebuger.CLASS_NAME_BLUE} {
                        background-color: #5574ff;
                    }
                    .${TranslateDebuger.CLASS_NAME_ADDITIONAL}.${TranslateDebuger.CLASS_NAME_BLUE} {
                        background-color: #1e22ff;
                    }
                    .${TranslateDebuger.CLASS_NAME}.${TranslateDebuger.CLASS_NAME_YELLOW} {
                        background-color: #fff455;
                    }
                    .${TranslateDebuger.CLASS_NAME_ADDITIONAL}.${TranslateDebuger.CLASS_NAME_YELLOW} {
                        background-color: #6e6c00;
                    }
                `;
                document.head.appendChild(style);
            }

            addAdditionalClasses(classes) {
                for (const className of classes) {
                    if (typeof className !== 'string') {
                        console.warn(`IncorrectType: ${className} is not a string`);
                        continue;
                    }
                    if (className.startsWith(TranslateDebuger.TRANSLATE_ELEM_CLASS_PREFIX)) {
                        console.warn(`${className} contains prefix ${TranslateDebuger.TRANSLATE_ELEM_CLASS_PREFIX}`);
                        continue;
                    }
                    this._additionalClasses.add(className);
                }
            }

            show(colorName) {
                var elementsWithTranslate = this._getTranslateElems()
                elementsWithTranslate.forEach(elem => {
                    elem.classList.add(TranslateDebuger.CLASS_NAME)
                    if (colorName && TranslateDebuger.COLOR_CLASS_MAP[colorName]) {
                        elem.classList.add(TranslateDebuger.COLOR_CLASS_MAP[colorName])
                    }
                })
                var additionalElements = this._getAdditionaltranslateElems()
                additionalElements.forEach(elem => {
                    elem.classList.add(TranslateDebuger.CLASS_NAME_ADDITIONAL)
                    if (colorName && TranslateDebuger.COLOR_CLASS_MAP[colorName]) {
                        elem.classList.add(TranslateDebuger.COLOR_CLASS_MAP[colorName])
                    }
                })
            }
            hide() {
                var classesToRemove = [
                    TranslateDebuger.CLASS_NAME,
                    TranslateDebuger.CLASS_NAME_ADDITIONAL,
                    TranslateDebuger.CLASS_NAME_RED,
                    TranslateDebuger.CLASS_NAME_BLUE,
                    TranslateDebuger.CLASS_NAME_YELLOW,
                ]
                var selector = `[class*=${TranslateDebuger.CLASS_NAME}]`
                document.querySelectorAll(selector).forEach(elem => {
                    elem.classList.remove(...classesToRemove)
                })
            }

            listenGetParamFlag() {
                var url = new URLSearchParams(document.location.search)
                var colorName = url.get(TranslateDebuger.GET_PARAM_FLAG_NAME)
                if (colorName != null){
                    this.show(colorName)
                }
            }
        }
