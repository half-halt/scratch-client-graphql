
const MINIMUM_TIME_MSEC = 500;

/**
 * This function is used to ensure a state change (for example, showing a loader)
 * stays visible for enough that the user can see the change.  This ensure that 
 * we will render a smooth tranistion.  
 * 
 * You can also use it to test the async workflows by increasing the time
 * to something like 3000ms.
 */
export function ensureTransitionTime(startTime: number, fn: CallableFunction)
{
	setTimeout(fn, Math.max(0, MINIMUM_TIME_MSEC - (Date.now() - startTime)));
}
