const d = require('../src/data/courses.json');
let count = 0;
d.levels.forEach(l => l.chapters.forEach(c => c.lessons.forEach(ls => {
  ls.steps.forEach(s => {
    if (s.type === 'terminal') {
      count++;
      const hasLiteralNewline = s.output.includes('\n');
      const hasBackslashN = s.output.includes('\\n');
      if (hasLiteralNewline || hasBackslashN) {
        console.log(ls.id, s.id, 'literal:', hasLiteralNewline, 'escaped:', hasBackslashN);
        console.log('  output:', JSON.stringify(s.output).substring(0, 150));
      }
    }
  });
})));
console.log('Total terminal steps:', count);
