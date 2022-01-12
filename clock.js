const offsets = [
    {offset: -8, city: 'LA'},
    {offset: -7, city: 'Denver'},
    {offset: -6, city: 'Chicago'},
    {offset: -5, city: 'New York City'},
    {offset: 0, city: 'London'},
    {offset: 1, city: 'Berlin'},
    {offset: 2, city: 'Cairo'},
    {offset: 3, city: 'Doha'}
];

function setTimeWithOffset() {
  const now = new Date();

  offsets.forEach(offset => {
    const secondHand = document.querySelector(`.second-offset${offset.offset}`);
    const minsHand = document.querySelector(`.min-offset${offset.offset}`);
    const hourHand = document.querySelector(`.hour-offset${offset.offset}`);

    const seconds = now.getUTCSeconds();
    const mins = now.getUTCMinutes();
    const hours = now.getUTCHours() + offset.offset;

    const secondsDegrees = ((seconds / 60) * 360) + 90;
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    const hoursDegrees = ((hours / 12) * 360) + ((mins/60)*30) + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  })
}

function createElementWithClass(element, classNames) {
    const el = document.createElement(element);
    classNames.forEach(className => el.classList.add(className));
    return el;
}

function initializeClocks() {
    offsets.forEach(offset => {
        const clock = createElementWithClass('div', ['clock']);
        const city = createElementWithClass('div', ['city']);
        const cityName = document.createTextNode(offset.city + ` ${offset.offset < 0 ? offset.offset : '+' + offset.offset}`);
        const clockFace = createElementWithClass('div', ['outer-clock-face']);
        const markOne = createElementWithClass('div', ['marking', 'marking-one']);
        const markTwo = createElementWithClass('div', ['marking', 'marking-two']);
        const markThree = createElementWithClass('div', ['marking', 'marking-three']);
        const markFour = createElementWithClass('div', ['marking', 'marking-four']);
        const innerFace = createElementWithClass('div', ['inner-clock-face']);
        const hourHand = createElementWithClass('div', ['hand', 'hour-hand', `hour-offset${offset.offset}`])
        const minuteHand = createElementWithClass('div', ['hand', 'min-hand', `min-offset${offset.offset}`]);
        const secondHand = createElementWithClass('div', ['hand', 'second-hand', `second-offset${offset.offset}`]);
        clock.appendChild(clockFace);
        clock.appendChild(city);
        city.appendChild(cityName);
        clockFace.appendChild(markOne);
        clockFace.appendChild(markTwo);
        clockFace.appendChild(markThree);
        clockFace.appendChild(markFour);
        clockFace.appendChild(innerFace);
        innerFace.appendChild(hourHand);
        innerFace.appendChild(minuteHand);
        innerFace.appendChild(secondHand);
        document.body.appendChild(clock);

    })
}

initializeClocks();
setInterval(setTimeWithOffset, 1000);
setTimeWithOffset();
