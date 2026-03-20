function task1(){

    let fruits = ["яблуко", "банан", "груша", "апельсин"];

    let removed = fruits.pop();

    fruits.unshift("ананас");

    let sorted = [...fruits].sort();

    let reversed = [...sorted].reverse();

    let index = fruits.indexOf("яблуко");

    return {
        original: ["яблуко","банан","груша","апельсин"],
        removed,
        afterUnshift: fruits,
        sorted,
        reversed,
        index
    }
}

function task2(){

    let colors = ["червоний", "синій", "зелений", "темно-синій", "жовтий"];

    let longest = colors.reduce((a,b)=> a.length > b.length ? a : b);

    let shortest = colors.reduce((a,b)=> a.length < b.length ? a : b);

    let blueColors = colors.filter(color => color.includes("синій"));

    let joined = blueColors.join(", ");

    return {
        colors,
        longest,
        shortest,
        blueColors,
        joined
    }

}

function task3(){

    let employees = [
        {name:"Іван", age:25, position:"розробник"},
        {name:"Марія", age:30, position:"дизайнер"},
        {name:"Олег", age:28, position:"розробник"}
    ];

    let sorted = [...employees].sort((a,b)=> a.name.localeCompare(b.name));

    let developers = employees.filter(emp => emp.position === "розробник");

    let removedAge30 = employees.filter(emp => emp.age !== 30);

    removedAge30.push({name:"Анна", age:24, position:"тестувальник"});

    return {
        original: employees,
        sorted,
        developers,
        updated: removedAge30
    }

}

function task4(){

    let students = [
        {name:"Іван", age:20, course:2},
        {name:"Олексій", age:22, course:3},
        {name:"Марія", age:19, course:1}
    ];

    let withoutOleksii = students.filter(student => student.name !== "Олексій");

    withoutOleksii.push({name:"Анна", age:21, course:3});

    let sorted = [...withoutOleksii].sort((a,b)=> b.age - a.age);

    let thirdCourse = sorted.find(student => student.course === 3);

    return {
        original: students,
        updated: withoutOleksii,
        sorted,
        thirdCourse
    }

}

function task5(){

    let numbers = [1,2,3,4,5,6];

    let squares = numbers.map(n => n*n);

    let evenNumbers = numbers.filter(n => n%2 === 0);

    let sum = numbers.reduce((total,n)=> total + n,0);

    let extra = [7,8,9,10,11];

    let combined = numbers.concat(extra);

    let spliced = [...combined];

    spliced.splice(0,3);

    return {
        original:numbers,
        squares,
        evenNumbers,
        sum,
        combined,
        spliced
    }

}

function libraryManagement(){

    let books = [
        {title:"1984", author:"Джордж Орвелл", genre:"антиутопія", pages:500, isAvailable:true},
        {title:"Гаррі Поттер", author:"Дж. Роулінг", genre:"фентезі", pages:400, isAvailable:true}
    ];

    function getBooks(){
        return [...books] ;
    }

    function addBook(title,author,genre,pages){
        books.push({title,author,genre,pages,isAvailable:true});
    }

    function removeBook(title){
        books = books.filter(book => book.title !== title);
    }

    function findBooksByAuthor(author){
        return books.filter(book => book.author === author);
    }

    function toggleBookAvailability(title,isBorrowed){
        let book = books.find(b => b.title === title);
        if(book){
            if (book.isAvailable = true)
            {
                book.isAvailable = false;
            }
            else book.isAvailable = true;
        }
    }

    function sortBooksByPages(){
        books.sort((a,b)=> a.pages - b.pages);
    }

    

    function getStatistics(){

        let total = books.length;

        let available = books.filter(b => b.isAvailable).length;

        let borrowed = total - available;

        let avgPages = books.reduce((sum,b)=> sum + b.pages,0)/total;

        return {
            total,
            available,
            borrowed,
            avgPages
        }
    }

    return {
        addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooks,
        getStatistics
    }

}

function task7(){

    let student = {
        name: "Іван",
        age: 20,
        course: 2
    };

    let studentWithSubjects = {
        ...student,
        subjects: ["Математика", "Програмування", "Фізика"]
    };

    let studentWithoutAge = {...studentWithSubjects};
    delete studentWithoutAge.age;

    return {
        original: student,
        withSubjects: studentWithSubjects,
        final: studentWithoutAge
    };
}

console.log("=================================");
console.log("TASK 1");
console.log("=================================");

let t1 = task1();

console.log("Початковий:", t1.original);
console.log("Видалений елемент:", t1.removed);
console.log("Після unshift:", t1.afterUnshift);
console.log("sort:", t1.sorted);
console.log("reverse:", t1.reversed);
console.log("indexOf яблуко:", t1.index);


console.log("\n=================================");
console.log("TASK 2");
console.log("=================================");

let t2 = task2();

console.log("Кольори:", t2.colors);
console.log("Найдовший:", t2.longest);
console.log("Найкоротший:", t2.shortest);
console.log("Сині:", t2.blueColors);
console.log("join:", t2.joined);


console.log("\n=================================");
console.log("TASK 3");
console.log("=================================");

let t3 = task3();

console.log("Початкові:", t3.original);
console.log("sort:", t3.sorted);
console.log("Розробники:", t3.developers);
console.log("Оновлений список:", t3.updated);


console.log("\n=================================");
console.log("TASK 4");
console.log("=================================");

let t4 = task4();

console.log("Початкові:", t4.original);
console.log("Після змін:", t4.updated);
console.log("Сортування:", t4.sorted);
console.log("Студент 3 курсу:", t4.thirdCourse);


console.log("\n=================================");
console.log("TASK 5");
console.log("=================================");

let t5 = task5();

console.log("Початкові:", t5.original);
console.log("Квадрати:", t5.squares);
console.log("Парні:", t5.evenNumbers);
console.log("Сума:", t5.sum);
console.log("concat:", t5.combined);
console.log("splice:", t5.spliced);


console.log("\n=================================");
console.log("TASK 6");
console.log("=================================");

let library = libraryManagement();

console.log("Книги:", library.getBooks());

library.addBook("Карти на стіл","Агата Крісті","детектив",200);
console.log("Після додавання:", library.getBooks());

library.sortBooksByPages();
console.log("Сортування:", library.getBooks());

console.log("Книги автора:", library.findBooksByAuthor("Агата Крісті"));

library.toggleBookAvailability("Карти на стіл", false);
console.log("Після позичення:", library.getBooks());

library.removeBook("Карти на стіл");
console.log("Після видалення:", library.getBooks());

console.log("Статистика:", library.getStatistics());


console.log("=================================");
console.log("ЗАВДАННЯ 7");
console.log("=================================");

let result7 = task7();

console.log("1. Початковий об'єкт студента:");
console.log(result7.original);

console.log("2. Після додавання предметів:");
console.log(result7.withSubjects);

console.log("3. Після видалення властивості age:");
console.log(result7.final);