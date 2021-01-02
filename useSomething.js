import { useEffect, useState } from 'react';

export default function useSomething(ref) {
    const [range, setRange] = useState(null);

    useEffect(() => {
        if (ref && ref.current) {
            const checkSelection = () => {
                const currentSelection = window.getSelection();
                if (!currentSelection.isCollapsed && currentSelection.rangeCount > 0) {
                    const currentRange = currentSelection.getRangeAt(0);
                    const containsStart = ref.current.contains(currentRange.startContainer);
                    const containsEnd = ref.current.contains(currentRange.endContainer);
                    if (containsStart && containsEnd) {
                        setRange(currentRange);
                    }
                } else {
                    setRange(null);
                }
            };

            document.addEventListener('selectionchange', checkSelection, { passive: true });
            return () => document.removeEventListener('selectionchange', checkSelection);
        }
        return undefined;
    }, [ref]);

    return range;
}

