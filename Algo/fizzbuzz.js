const getFizzBuzzValue = (num) => {
    if (num % 5 === 0 && num % 3 === 0) return 'FizzBuzz';
    if (num % 3 === 0) return 'Fizz';
    if (num % 5 === 0) return 'Buzz';
    return num.toString();
}

const displayFizzBuzzSequence = (num) => {
    for (let i = 1; i <= num; i++) {
        const fizzBuzz = getFizzBuzzValue(i);
        console.log(fizzBuzz);
    }
}

displayFizzBuzzSequence(15);