const years = ['Licenta-1', 'Licenta-2', 'Licenta-3', 'Licenta-4', 'Master-1', 'Master-2'];
const departments = ['CTI-ACS', 'IS-ACS'];
let grades = [];
for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 5; j++) {
        grades.push(`3${i}${j}CA`);
        grades.push(`3${i}${j}CB`);
        grades.push(`3${i}${j}CC`);
        grades.push(`3${i}${j}CD`);
        grades.push(`3${i}${j}AA`);
        grades.push(`3${i}${j}AB`);
        grades.push(`3${i}${j}AC`);
    }
}

module.exports = { years, departments, grades };