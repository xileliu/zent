import { RefObject, useRef, useEffect, useMemo } from 'react';
import { BasicModel } from 'formulr';
import { useFormContext, IFormChild } from './context';
import { scrollToNode } from './utils';

class ScrollAnchor implements IFormChild {
  constructor(
    public model: BasicModel<any>,
    public anchorRef: RefObject<Element | undefined> | undefined,
    public scrollerRef: RefObject<HTMLElement | undefined>
  ) {}

  isValid() {
    return this.model.isValid();
  }

  scrollTo() {
    const anchor = this.anchorRef && this.anchorRef.current;
    const scroller = this.scrollerRef.current;
    if (anchor) {
      scrollToNode(anchor, scroller || document.body);
    }
  }
}

const dummyRef = {
  current: document.body,
};

export function useScrollAnchor(
  model: BasicModel<any>,
  anchorRef: RefObject<Element | undefined> | undefined,
  scrollRef: RefObject<HTMLElement | undefined> = dummyRef
) {
  const ctx = useFormContext();
  const posRef = useRef(ctx.children.length);
  const scrollAnchor = useMemo(
    () => new ScrollAnchor(model, anchorRef, scrollRef),
    []
  );
  scrollAnchor.model = model;
  scrollAnchor.anchorRef = anchorRef;
  scrollAnchor.scrollerRef = scrollRef;
  useEffect(() => {
    if (posRef.current < ctx.children.length) {
      ctx.children.splice(posRef.current, 0, scrollAnchor);
    } else {
      posRef.current = ctx.children.length;
      ctx.children.push(scrollAnchor);
    }
    return () => {
      const pos = ctx.children.indexOf(scrollAnchor);
      if (pos !== -1) {
        posRef.current = pos;
        ctx.children.splice(pos, 1);
      }
    };
  }, [ctx]);
}
