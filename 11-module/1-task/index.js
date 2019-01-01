(function () {

    class Tooltip {

        /**
         * Имя компонента
         * @property {string}
         */
        get name() {
            return 'tooltip';
        }

        /**
         * Обязательный отступ
         */
        get indent() {
            return 5;
        }

        constructor() {
            /**
             * Данное свойство содержит ссылку на
             * елемент содержащий подсказку
             * @type {HTMLDivElement}
             */
            this.el = document.createElement('div');
            this.el.style.position = 'absolute';

            this.el.classList.add(this.name);
            document.body.appendChild(this.el);
            this._attached = [];
            this._showTooltipEventHandler = e => {
                let target = e.target.closest("[data-tooltip]");
                if (!target)
                {
                    Tooltip.hideTooltip(this.el);
                }
                else if (e.target === target || !e.target.contains(target))
                {
                    Tooltip.showTooltip(this.el, target, this.indent);
                }
            };
            this._hideTooltipEventHandler = e => { Tooltip.hideTooltip(this.el); };
        }

        /**
         * Метод подключает включает работу подсказок
         * на элементе
         *
         * @param {Element} root - элемент, внутри которого, нужно включить работу подсказок
         */
        attach(root) {

            if (this._attached.length == 0)
            {
                document.body.addEventListener("mouseover", this._showTooltipEventHandler);
                document.body.addEventListener("mouseout", this._hideTooltipEventHandler);
            }

            this._attached.push(root);
        }

        /**
         * Удаляет все обработчики событий
         */
        detach() {

            if (this._attached.length > 0)
            {
                document.body.removeEventListener("mouseover", this._showTooltipEventHandler);
                document.body.removeEventListener("mouseout", this._hideTooltipEventHandler);
            }

            this._attached = [];
        }

        static showTooltip(tooltipElem, holderElem, indent) {
            let holderRect = holderElem.getBoundingClientRect();
            tooltipElem.style.top = holderRect.top + pageYOffset + "px";
            tooltipElem.style.left = holderRect.left + pageXOffset + "px";
            let text = holderElem.dataset.tooltip;
            tooltipElem.textContent = text;
            tooltipElem.classList.toggle("tooltip_active", true);
            let tooltipFullHeight = tooltipElem.getBoundingClientRect().height + indent;
            let dy = (holderRect.top - tooltipFullHeight > 0) ? (-tooltipFullHeight) : (holderRect.height + indent);
            tooltipElem.style.top = holderRect.top + pageYOffset + dy + "px";
        }

        static hideTooltip(tooltipElem) {    

            tooltipElem.classList.toggle("tooltip_active", false);
        }
    }

    window.Tooltip = Tooltip;
})();