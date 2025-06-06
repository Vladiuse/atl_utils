class WaitPoints {
    /**
     * Предназначен для отображения эффекта "ожидания" на HTML-элементе.
     * К тексту элемента анимированно добавляются точки (.), имитируя процесс загрузки.
     * 
     * ⚠️ Ограничения:
     * - Элемент **не должен содержать дочерних тегов**, только текст.
     * - Эффект не будет применён повторно, если уже активен на элементе.
     * 
     * Использование:
     *   WaitPoints.show(elem);    // Запускает эффект
     * 
     * @param {HTMLElement} elem - Элемент, на котором показывается эффект загрузки.
     * @param {Object} [options] - Опции настройки эффекта.
     * @param {number} [options.timeOut=200] - Интервал обновления эффекта в миллисекундах.
     * @param {string} [options.text=this.defaultWaitText] - Текст, который отображается перед эффектом загрузки.
     * 
     *   WaitPoints.hide(elem);    // Останавливает эффект и восстанавливает текст
     * @param {HTMLElement} elem - Элемент, на котором показывается эффект загрузки.
     */
    static defaultWaitText = "Wait"
    static maxPointCount = 3

    static _isElemCantBeWaitOn(elem) {
        // проверяем нет ли дочерних элементов
        if (elem.children.length) {
            console.warn(`${elem.outerHTML} не должен содержать дочерних элементов, только текст!`)
            return false
        }
        if (this._isElemHasWaiting(elem)) {
            console.warn(`${elem.outerHTML} уже отображает эффект загрузки`)
            return false
        }
        return true
    }

    static _isElemHasWaiting(elem) {
        // проверяем не уснановлен ли эффект загрузки на элементе
        return elem.dataset.waitOn == "true"
    }

    static show(elem, options = {}) {
        if (!this._isElemCantBeWaitOn(elem)) {
            return
        }
        const {
            timeOut = 200,
            text = this.defaultWaitText,
        } = options;
        elem.dataset.origText = elem.innerText
        elem.innerText = text;
        elem.dataset.waitOn = "true"
        let pointCount = 0;
        const intervalId = setInterval(() => {
            for (let i = 0; i <= pointCount; i++) {
                elem.dataset.waitPoints = '.'.repeat(pointCount);
            }
            pointCount++;
            if (pointCount > this.maxPointCount) {
                pointCount = 0;
            }
        }, timeOut);
        elem.dataset.waitIntervalId = intervalId;
    }

    static hide(elem) {
        if (!this._isElemHasWaiting(elem)) {
            console.warn(`${elem.outerHTML} не имеет эффекта загрузки`)
            return
        }
        elem.dataset.waitOn == "false"
        elem.innerText = elem.dataset.origText
        const intervalId = elem.dataset.waitIntervalId;
        if (intervalId) {
            clearInterval(Number(intervalId));
            delete elem.dataset.waitIntervalId;
        }
        delete elem.dataset.waitPoints;
    }
}