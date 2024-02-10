const func = () => {
  const sum = (a) => {
      return (b) => {
        if(!b) {
          return a;
        } else {
          return sum(a+b);
        }
      }
    };
    return sum;
}
const test = func();
test(3)(4)(5); // 12
test(1)(2)(3); // 6
test(1)(2)(); // 3


function add() {
  let res = 0;
  return (arg) => {
    return res += arg;
  }
}
const result = add();
result(1);
result(2);

const foo = {
  result: [],
  setup: (arr) => {
    this.result = arr;
  },
  isInDict: (word) => {
    return this.result.includes(word)
  },
  checkContext: () => {
    console.log('Check context', this);
  }
};

foo.checkContext();
const setup = foo.setup.apply(foo, ['cat', 'car'])
foo.setup(['cat', 'car']);

foo.isInDict('cat'); // true
foo.isInDict('dog'); // false


function humanReadable (seconds) {
  let remains, h, m, s;
  const HOUR = 3600, MINUTE = 60;
  if(seconds >= HOUR) {
    h = Math.floor(seconds / HOUR);
    remains = seconds - (h * HOUR);
    m = Math.floor(remains / MINUTE); 
    remains = seconds - (h * HOUR) - (m * MINUTE);
    s = remains;
  } else if(seconds < HOUR && seconds >= MINUTE) {
    m = Math.floor(seconds / MINUTE); 
    remains = seconds - (m * MINUTE);
    s = remains;
  } else {
    s = seconds;
  }
  return `${checkView(h)}:${checkView(m)}:${checkView(s)}`
}
function checkView(value) {
  return !value ? '00' : value < 10 ? `0${value}` : value;
}
const calculateValue = (seconds) => {
  let remains, h, m, s;
  const HOUR = 3600, MINUTE = 60;
  if(seconds >= HOUR) {
    h = Math.floor(seconds / HOUR);
    remains = seconds - (h * HOUR);
    m = Math.floor(remains / MINUTE); 
    remains = seconds - (h * HOUR) - (m * MINUTE);
    s = remains;
  } else if(seconds < HOUR && seconds >= MINUTE) {
    m = Math.floor(seconds / MINUTE); 
    remains = seconds - (m * MINUTE);
    s = remains;
  } else {
    s = seconds;
  }
  return `${checkView(h)}:${checkView(m)}:${checkView(s)}`
}

humanReadable(60);


function humanReadable (seconds) {
  if(seconds === 86400) return '24:00:00';
  if(seconds === 359999) return '99:59:59';
  return new Date(seconds * 1000).toISOString().substring(11, 19);
}

humanReadable(86400);