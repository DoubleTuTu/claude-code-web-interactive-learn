const d = require('../src/data/courses.json');
d.levels.forEach(l => l.chapters.forEach(c => c.lessons.forEach(lesson => {
  if (lesson.id.startsWith('s') || lesson.id === 'l3-1') {
    console.log('\n=== ' + lesson.id + ': ' + lesson.title + ' ===');
    let stepNum = 1;
    lesson.steps.forEach(s => {
      if (s.type === 'guide' || s.type === 'terminal') {
        const type = s.type === 'terminal' ? '[TERMINAL]' : ' [GUIDE]  ';
        const lines = s.instruction ? s.instruction.split('\n') : [];
        const cmdLines = lines.filter(l => l.includes('`') || l.includes('$ ') || l.includes('输入'));
        if (cmdLines.length > 0 || s.type === 'terminal') {
          console.log(type + ' Step ' + (stepNum++) + ' (' + s.id + '):');
          if (s.type === 'terminal') console.log('  expectedInput: ' + s.expectedInput.substring(0, 80));
          cmdLines.forEach(l => console.log('  > ' + l.trim().substring(0, 120)));
        } else {
          stepNum++;
        }
      }
    });
  }
}));
