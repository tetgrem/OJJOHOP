// Custom Scripts
$(document).ready(function(){
    $('.block__title').click(function (event) {
        if($('.block').hasClass('one')){
            $('.block__title').not($(this)).removeClass('active_accordion');
            $('.block__text').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active_accordion').next().slideToggle(300);
    })
});


function burgerMenu() {
    const burger = document.querySelector('.burger')
    const menu = document.querySelector('.menu')
    const body = document.querySelector('body')
    burger.addEventListener('click', () => {
        if (!menu.classList.contains('active')) {
            menu.classList.add('active')
            burger.classList.add('active-burger')
            body.classList.add('locked')
        } else {
            menu.classList.remove('active')
            burger.classList.remove('active-burger')
            body.classList.remove('locked')
        }
    })
    // Вот тут мы ставим брейкпоинт навбара
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991.98) {
            menu.classList.remove('active')
            burger.classList.remove('active-burger')
            body.classList.remove('locked')
        }
    })
}
burgerMenu()


function catalogSelect() {
    const getTemplate = (data = [], placeholder, selectedId) => {
        let text = placeholder ?? 'placeholder не указан'

        const items = data.map(item => {
            let cls = ''
            if (item.id === selectedId) {
                text = item.value
                cls = 'selected'
            }
            return `
            <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
        `
        })
        return `
        <input type="hidden" class="hidden__input">
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${text}</span>
            <img src="./img/down-arrow.svg" alt="arrow" data-type="arrow" class="select__arrow">
        </div>
        <div class="select__dropdown">
            <ul class="select__list">
                ${items.join('')}
            </ul>
        </div>
    `
    }
    class Select {
        constructor(selector, options) {
            this.$el = document.querySelector(selector)
            this.options = options
            this.selectedId = options.selectedId

            this.render()
            this.setup()
        }

        render() {
            const { placeholder, data } = this.options
            this.$el.classList.add('select')
            this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
        }
        setup() {
            this.clickHandler = this.clickHandler.bind(this)
            this.$el.addEventListener('click', this.clickHandler)
            this.$arrow = this.$el.querySelector('[data-type="arrow"]')
            this.$value = this.$el.querySelector('[data-type="value"]')
        }

        clickHandler(event) {
            const { type } = event.target.dataset
            if (type === 'input') {
                this.toggle()
            } else if (type === 'item') {
                const id = event.target.dataset.id
                this.select(id)
            }  else if (type === 'backdrop') {
                this.close()
            }
        }

        get isOpen() {
            return this.$el.classList.contains('open')
        }

        get current() {
            return this.options.data.find(item => item.id === this.selectedId)
        }

        select(id) {
            this.selectedId = id
            this.$value.textContent = this.current.value

            this.$el.querySelectorAll(`[data-type="item"]`).forEach( el => el.classList.remove('selected'))
            this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

            this.options.onSelect ? this.options.onSelect(this.current) : null
            this.close()
        }

        toggle() {
            this.isOpen ? this.close() : this.open()
        }

        open() {
            this.$el.classList.add('open')
            this.$arrow.classList.add('open')
        }

        close() {
            this.$el.classList.remove('open')
            this.$arrow.classList.remove('open')
        }

        destroy() {
            this.$el.removeEventListener('click', this.clickHandler)
            this.$el.innerHTML = ''
        }
    }


// Инициализация плагина
    const select = new Select('#select1', {
        placeholder: 'Бренд',
        data: [
            {id: '1', value: 'Бренд 1'},
            {id: '2', value: 'Бренд 2'},
        ],
        onSelect(item) {
            const input = document.querySelector('.hidden__input')
            input.value = item.value
        }
    })

    const select2 = new Select('#select2', {
        placeholder: 'Цена',
        data: [
            {id: '1', value: 'Цена 1'},
            {id: '2', value: 'Цена 2'},
        ],
        onSelect(item) {
            const input = document.querySelector('.hidden__input')
            input.value = item.value
        }
    })

    const select3 = new Select('#select3', {
        placeholder: 'Для кого',
        data: [
            {id: '1', value: 'Для девушки'},
            {id: '2', value: 'Для парня'},
        ],
        onSelect(item) {
            const input = document.querySelector('.hidden__input')
            input.value = item.value
        }
    })

    const select4 = new Select('#select4', {
        placeholder: 'Коллекция',
        data: [
            {id: '1', value: 'Для девушки'},
            {id: '2', value: 'Для парня'},
            {id: '3', value: 'Для парня'},
            {id: '4', value: 'Для парня'},

        ],
        onSelect(item) {
            const input = document.querySelector('.hidden__input')
            input.value = item.value
        }
    })

    const select5 = new Select('#select5', {
        placeholder: 'Сезон',
        data: [
            {id: '1', value: 'Для девушки'},
            {id: '2', value: 'Для парня'},
        ],
        onSelect(item) {
            const input = document.querySelector('.hidden__input')
            input.value = item.value
        }
    })

    const select6 = new Select('#select6', {
        placeholder: 'Событие',
        data: [
            {id: '1', value: 'Свадьба'},
            {id: '2', value: 'Помолка'},
        ],
        onSelect(item) {
            const input = document.querySelector('.hidden__input')
            input.value = item.value
        }
    })
}


function readMore() {

    const readmore = document.querySelector('.read__more')
    const test = document.querySelector('.test')
    readmore.addEventListener('click', () => {
       if (test.classList.contains('test')) {
           readmore.classList.add('active')
           setTimeout(function() {
               readmore.innerHTML = 'Закрыть'
           }, 1);
           setTimeout(function() {
               test.classList.remove('test')
           }, 221);

           test.classList.add('test2')
           readmore.classList.remove('no-active')

       }
       else {
           test.classList.add('test')
           test.classList.remove('test2')
           readmore.classList.remove('active')
           readmore.classList.add('no-active')
           setTimeout(function() {
               readmore.innerHTML = 'читать полностью'
           }, 250);
       }
    })
}


function viewMore() {

    const viewmore = document.querySelector('.see-more')
    const hideBlock = document.querySelector('.hide__block')

    viewmore.addEventListener('click', () => {
        if (hideBlock.classList.contains('hide__block')) {
            hideBlock.classList.remove('hide__block')
            viewmore.classList.add('see-more-active')
        }
    })
}


function fixedNav() {
    const nav = document.querySelector('.nav__fix')
    const logo = document.querySelector('.fix_logo')
    const navbar = document.querySelector('.fix_navbar')

    const breakpoint = 129
    if (window.scrollY >= breakpoint) {
        nav.classList.add('fixed__nav')
        logo.classList.add('fix__logo')
        navbar.classList.add('fix__navbar')
    } else {
        nav.classList.remove('fixed__nav')
        logo.classList.remove('fix__logo')
        navbar.classList.remove('fix__navbar')
    }
}

function functionNavFix() {
    if (document.querySelector('body').classList.contains('main__body')) return false
    else window.addEventListener('scroll', fixedNav)
}

functionNavFix()

function functionStart() {
    if (document.querySelector('body').classList.contains('body__catalog')) {
        catalogSelect()
        viewMore()
        readMore()
    }

    if (document.querySelector('body').classList.contains('body__viewitem')) readMore()

    else return false
}

functionStart()





