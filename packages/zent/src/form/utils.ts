// import {} from 'sche'
// import isFunction from 'lodash-es/isFunction';
// import scroll from '../utils/scroll';

// export function scrollToNode(
//   element: Element,
//   scroller: HTMLElement = document.body
// ) {
//   // Skip if element is not a DOM node or text node
//   if (
//     !element ||
//     element.nodeType !== Node.ELEMENT_NODE ||
//     !isFunction((element as Element).getBoundingClientRect)
//   ) {
//     return;
//   }

//   const elementBound = (element as Element).getBoundingClientRect();
//   const y = elementBound.top + window.pageYOffset;
//   const x = elementBound.left + window.pageXOffset;
//   scroll(scroller, x, y);
// }

export type $MergeParams<T> = (T extends any
  ? (t: T) => void
  : never) extends ((t: infer V) => void)
  ? V
  : never;
