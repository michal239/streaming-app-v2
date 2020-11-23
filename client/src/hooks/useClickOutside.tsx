import { useEffect, MutableRefObject } from 'react';

export const useClickOutside = (
	refs: MutableRefObject<any> | MutableRefObject<any>[],
	callback: Function,
) => {
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (Array.isArray(refs)) {
				const res = refs.every(ref => {
					if (ref.current) return !ref.current.contains(event.target);
					return false;
				});
				res && callback();
			} else {
				if (refs.current && !refs.current.contains(event.target)) {
					callback();
				}
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [refs]);
};
