const screen = document.getElementById('screen');
    const buttons = document.querySelector('.buttons');
    let expression = '';
    const operators = ['+','-','*','/'];

    const updateScreen = () => {
      screen.textContent = expression || '0';
    };

    const append = (val) => {
      if (operators.includes(val)) {
        if (expression === '' || operators.includes(expression.slice(-1))) return;
      }
      expression += val;
      updateScreen();
    };

    const calculate = () => {
      try {
        const result = Function(`"use strict";return (${expression})`)();
        expression = Number.isFinite(result) ? result.toString() : 'Error';
      } catch {
        expression = 'Error';
      }
      updateScreen();
    };
    const sqrt = () => {
      if (!expression) return;
      try {
        const value = Function(`"use strict";return (${expression})`)();
        const result = Math.sqrt(value);
        expression = Number.isFinite(result) ? result.toString() : 'Error';
      } catch {
        expression = 'Error';
      }
      updateScreen();
    };
    const percent=()=>{
        if(!expression)return;try{const value=Function(`"use strict";return (${expression})`)();
        const result=value/100;expression=Number.isFinite(result)?result.toString():'Error';}catch{expression='Error';}updateScreen();};

    const del = () => {
      expression = expression.slice(0, -1);
      updateScreen();
    };

    const clearone = () => {
      expression = '';
      updateScreen();
    };

    const ALLclear =() => {
        expression ='';
        updateScreen();
    };

    buttons.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (btn.dataset.value) append(btn.dataset.value);
      if (btn.dataset.action === 'equals') calculate();
      if (btn.dataset.action === 'clear') del();
      if (btn.dataset.action ==='allclear') ALLclear();
      if (btn.dataset.action === 'delete') del();
      if (btn.dataset.action === 'sqrt') sqrt();
      if (btn.dataset.action==='percent')percent();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.key >= '0' && e.key <= '9') || operators.includes(e.key) || e.key === '.') {
        append(e.key);
      } else if (e.key === 'Enter') {
        calculate();
      } else if (e.key === 'Backspace') {
        del();
      } else if (e.key === 'Escape') {
        clearAll();
      } else if (e.key === 'r') {
        sqrt();
      } else if (e.key === '%') {
      percent();
      }
    });

    updateScreen();