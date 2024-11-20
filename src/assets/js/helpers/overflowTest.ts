import testImg from '@image/test/test-1.jpg';

function getTextNodesIn(element: Node) {
  let textNodes: CharacterData[] = [];
  for (let nodes = element.childNodes, i = nodes.length; i--; ) {
    const node = nodes[i];
    const nodeType = node.nodeType;
    if (node instanceof CharacterData) {
      node.data.trim() && textNodes.push(node);
    } else if (nodeType == 1 || nodeType == 0 || nodeType == 11) {
      textNodes = textNodes.concat(getTextNodesIn(node));
    }
  }

  return textNodes;
}

function getImgElementIn(element: Node) {
  let imgElements: HTMLImageElement[] = [];
  for (let nodes = element.childNodes, i = nodes.length; i--; ) {
    const node = nodes[i];
    const nodeType = node.nodeType;
    if (node instanceof HTMLImageElement) {
      imgElements.push(node);
    } else if (nodeType == 1 || nodeType == 0 || nodeType == 11) {
      imgElements = imgElements.concat(getImgElementIn(node));
    }
  }

  return imgElements;
}

export function testTextOverflow(string?: string) {
  const defaultString =
    'I have several clients who made an appointment with me for a haircut without even having time to enter the salon.';
  const testString = string ?? defaultString;
  getTextNodesIn(document.body).forEach((item) => {
    item.textContent = testString;
  });
}

export function testImageOverflow(src?: string) {
  const defaultSrc = testImg;
  const testSrc = src ?? defaultSrc;
  getImgElementIn(document.body).forEach((image) => {
    image.srcset = '';
    image.src = testSrc;
  });
}
