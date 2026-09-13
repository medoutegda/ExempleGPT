export type AngleMode = 'DEG' | 'RAD' | 'GRAD';

export type CalculatorResult = {
  value: number;
  formatted: string;
};

const functions: Record<string, (x: number) => number> = {
  sqrt: Math.sqrt,
  abs: Math.abs,
  ln: Math.log,
  log: Math.log10,
  exp: Math.exp,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
};

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0 || n > 170) throw new Error('Invalid factorial');
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function normalizeExpression(expression: string, angleMode: AngleMode): string {
  let source = expression
    .replaceAll('×', '*')
    .replaceAll('÷', '/')
    .replaceAll('π', 'PI')
    .replace(/\bans\b/gi, 'ANS');

  source = source.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
  source = source.replace(/(\d+(?:\.\d+)?)!/g, 'fact($1)');

  const angleFactor = angleMode === 'DEG' ? '(Math.PI/180)' : angleMode === 'GRAD' ? '(Math.PI/200)' : '1';
  for (const name of ['sin', 'cos', 'tan']) {
    source = source.replace(new RegExp(`\\b${name}\\(`, 'g'), `fn_${name}(`);
  }
  source = source.replace(/\b(asin|acos|atan)\(/g, 'inv_$1(');
  source = source.replace(/\bsqrt\(/g, 'Math.sqrt(');
  source = source.replace(/\bln\(/g, 'Math.log(');
  source = source.replace(/\blog\(/g, 'Math.log10(');
  source = source.replace(/\bexp\(/g, 'Math.exp(');
  source = source.replace(/\babs\(/g, 'Math.abs(');
  source = source.replace(/\^/g, '**');
  source = `(${source})`;

  return `(()=>{const PI=Math.PI; const ANS=0; const fact=${factorial.toString()}; const fn_sin=(x)=>Math.sin(x*${angleFactor}); const fn_cos=(x)=>Math.cos(x*${angleFactor}); const fn_tan=(x)=>Math.tan(x*${angleFactor}); const inv_asin=(x)=>Math.asin(x)/${angleFactor}; const inv_acos=(x)=>Math.acos(x)/${angleFactor}; const inv_atan=(x)=>Math.atan(x)/${angleFactor}; return ${source}})()`;
}

export function calculate(expression: string, angleMode: AngleMode = 'DEG'): CalculatorResult {
  if (!expression.trim()) return { value: 0, formatted: '0' };
  if (expression.length > 500) throw new Error('Expression too long');
  if (!/^[0-9+\-*/%()., π×÷^!A-Za-z_]+$/.test(expression)) throw new Error('Unsupported character');
  const normalized = normalizeExpression(expression.replaceAll(',', '.'), angleMode);
  // The expression is first restricted to a calculator grammar/character set.
  // For production, replace this bootstrap evaluator with a full tokenizer/parser/AST evaluator.
  const value = Function(`"use strict"; return ${normalized}`)();
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('Math error');
  return { value, formatted: new Intl.NumberFormat('en-US', { maximumFractionDigits: 12 }).format(value) };
}
