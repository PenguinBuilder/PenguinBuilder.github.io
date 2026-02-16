function icon_tokenize(state, silent) {
  const start = state.pos;
  const src = state.src;

  if (src[start] !== ':' || src[start + 1] !== ':') return false;

  const end = src.indexOf('::', start + 2);
  if (end === -1) return false;
  if (silent) return true;

  const iconName = src.slice(start + 2, end).trim();
  if (!iconName) return false;

  const token = state.push('sl_icon', '', 0);
  token.meta = { name: iconName };

  state.pos = end + 2;
  return true;
}

export default {
  tokenize: icon_tokenize,
};
