function compareArray(a1, a2) {
  if (a1 === a2) return true;
  if ((!a1 && a2) || (a1 && !a2)) return false;
  if (a1.length !== a2.length) return false;
  for (var i = 0, n = a1.length; i < n; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}

export { compareArray };
