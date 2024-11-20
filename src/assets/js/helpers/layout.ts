export function positionInDocumentLayout(element: HTMLElement): 'left' | 'right' {
  const documentCenterX = window.innerWidth / 2;
  const elementCenterX = element.offsetLeft + element.clientWidth / 2;
  return elementCenterX > documentCenterX ? 'right' : 'left';
}
