export const copyIds = async (
  ids: string[],
  setCopied: (copied: boolean) => void
) => {
  if (!ids.length) {
    return;
  }

  const type = 'text/plain';
  const text = ids.map((id) => `'${id}'`).join(', ');
  const clipboardItem = new ClipboardItem({
    [type]: new Blob([text], { type })
  });
  
  await navigator?.clipboard?.write([clipboardItem]);

  setCopied(true);
};