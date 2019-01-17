let screenDate = new Date();

let formAddingEvent;
let eventName = '<input type="text" id="eventName">',
    eventDate = '<input type="text" id="eventDate">',
    eventNamesGroup = '<input type="text" id="eventNamesGroup">',
    eventDetail = '<textarea id="eventDetail"></textarea>',
    bttnsLine = '<div class="bttnsLine"><input type="button" id="addToDate" value="Готово"><input type="button" id="removeFromDate" value="Удалить">',
    closeForm = '<div class="close"><span></span><span></span></div>',eventModalContent = '<div class="in">' + closeForm + eventName + eventDate + eventNamesGroup + eventDetail + bttnsLine + '</div>';

document.addEventListener('DOMContentLoaded', () => {

    CreateCalendar();

    nextMonth.onclick = () => CreateCalendar(screenDate.setMonth(screenDate.getMonth() + 1));
    prevMonth.onclick = () => CreateCalendar(screenDate.setMonth(screenDate.getMonth() - 1));

})

const CreateCalendar = (month) => {

    let daysInMonth = new Date(screenDate.getFullYear(), screenDate.getMonth() + 1, 0).getDate(),
        daysInPrevMonth = new Date(screenDate.getFullYear(), screenDate.getMonth(), 0).getDate(),
        firstDay = new Date(screenDate.getFullYear(), screenDate.getMonth(), 1).getDay(),
        lastDay = new Date(screenDate.getFullYear(), screenDate.getMonth(), daysInMonth).getDay(),
        months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let constructorTable = '<tr>';

    if (firstDay != 0) {
        for (let i = 1; i < firstDay; i++) constructorTable += '<td><span>' + days[i] + ', ' + (new Date(screenDate.getFullYear(), screenDate.getMonth(), 0).getDate() - (firstDay - 1 - i)) + '</span></td>';
    } else {
        for (let i = 0; i < 6; i++) constructorTable += '<td><span>' + days[i + 1] + ', ' + (new Date(screenDate.getFullYear(), screenDate.getMonth(), 0).getDate() - 5 + i) + '</span></td>';
    }

    for (let i = 1; i <= daysInMonth; i++) {
        if (i == new Date().getDate() && screenDate.getFullYear() == new Date().getFullYear() && screenDate.getMonth() == new Date().getMonth()) {
            constructorTable += '<td class="today"><span>' + i + '</span></td>';
        } else {
            if (i <= 7 && new Date(screenDate.getFullYear(), screenDate.getMonth(), i).getDay() == 0) {
                constructorTable += '<td><span>' + days[new Date(screenDate.getFullYear(), screenDate.getMonth(), i).getDay()] + ', ' + i + '</span></td>';
            } else if (i <= new Date(screenDate.getFullYear(), screenDate.getMonth(), i).getDay()) {
                constructorTable += '<td><span>' + days[new Date(screenDate.getFullYear(), screenDate.getMonth(), i).getDay()] + ', ' + i + '</span></td>';
            } else {
                constructorTable += '<td><span>' + i + '</span></td>';
            }
        }
        if (new Date(screenDate.getFullYear(), screenDate.getMonth(), i).getDay() == 0 && i != daysInMonth) {
            constructorTable += '</tr><tr>';
        }
    }

    if (lastDay != 0) {
        for (let i = lastDay; i < 7; i++) constructorTable += '<td><span>' + new Date(screenDate.getFullYear(), screenDate.getMonth() + 2, i - lastDay + 1).getDate() + '</span></td>';
        constructorTable += '</tr>';
    } else {
        constructorTable += '</tr>';
    }

    document.getElementById('calendarBody').innerHTML = constructorTable;
    document.getElementById('choicingMonth').innerHTML = months[screenDate.getMonth()] + ' ' + screenDate.getFullYear();

    var cells = calendarBody.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function () {
            if (calendarBody.querySelectorAll('td.active')) {
                let allForms = calendarBody.getElementsByTagName("form");
                for (let j = 0; j < calendarBody.querySelectorAll('td.active').length; j++) {
                    calendarBody.querySelectorAll('td.active')[j].classList.remove('active');
                }
                for (let k = 0; k < allForms.length; k++) {
                    allForms[k].parentNode.removeChild(formAddingEvent);
                }
            }
            if (!this.classList.contains('active')) {
                openForm(this);
            } else {
                formAddingEvent.onclick = function (event) {
                    event.stopPropagation();
                };
                closeFormFunc(this);
                outFormClose(this)
            }
        })
    }
}

const openForm = (elem) => {
    elem.classList.add('active');
    formAddingEvent = document.createElement('form');
    formAddingEvent.classList.add('formEvent');
    formAddingEvent.innerHTML = eventModalContent;
    elem.appendChild(formAddingEvent);
    formAddingEvent.onclick = function (event) {
        event.stopPropagation();
    };
    formAddingEvent.addToDate.addEventListener('click', function (e) {
        let txtEventName = formAddingEvent.eventName.value,
            txtEventDate = formAddingEvent.eventDate.value,
            txtEventNamesGroup = formAddingEvent.eventNamesGroup.value,
            txtEventDetail = formAddingEvent.eventDetail.value;
            console.log(txtEventName,txtEventDate,txtEventNamesGroup,txtEventDetail)
    })
}

const closeFormFunc = (elem) => {
    elem.classList.remove('active');
    formAddingEvent.parentNode.removeChild(formAddingEvent);
}