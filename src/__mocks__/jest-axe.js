const axe = jest.fn().mockResolvedValue({ violations: [] });

const toHaveNoViolations = {
  toHaveNoViolations(received) {
    const violations = received && received.violations ? received.violations : [];
    if (violations.length === 0) {
      return {
        message: () => 'expected axe results to have violations but found none',
        pass: true,
      };
    }
    return {
      message: () =>
        `expected no accessibility violations but found ${violations.length}:\n` +
        violations.map((v) => `  - ${v.id}: ${v.description}`).join('\n'),
      pass: false,
    };
  },
};

module.exports = { axe, toHaveNoViolations };
