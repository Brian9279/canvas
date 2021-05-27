var people = [
    'Peter',
    'Susan'
];


people.push('Sandra')

people[0] = 'Franz';
console.log(people);
console.log(people.length)


for (var i = 0; i < people.length; i++) {
    console.log(people[i] = people[i] + ' Meier')
}