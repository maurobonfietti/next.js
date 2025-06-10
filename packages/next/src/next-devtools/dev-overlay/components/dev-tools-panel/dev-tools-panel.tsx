import type { OverlayDispatch, OverlayState } from '../../shared'

import { Suspense, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogBody } from '../dialog'
import { Overlay } from '../overlay/overlay'
import { useFocusTrap } from '../errors/dev-tools-indicator/utils'
import { useDelayedRender } from '../../hooks/use-delayed-render'
import { ACTION_DEV_TOOLS_PANEL_TOGGLE } from '../../shared'

const transitionDurationMs = 200

export function DevToolsPanel({
  state,
  dispatch,
}: {
  state: OverlayState
  dispatch: OverlayDispatch
}) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // This hook lets us do an exit animation before unmounting the component
  const { mounted, rendered } = useDelayedRender(state.isDevToolsPanelOpen, {
    exitDelay: transitionDurationMs,
  })

  useFocusTrap(dialogRef, null, rendered)

  if (!mounted) {
    // Workaround React quirk that triggers "Switch to client-side rendering" if
    // we return no Suspense boundary here.
    return <Suspense />
  }

  const onClose = () => {
    dispatch({ type: ACTION_DEV_TOOLS_PANEL_TOGGLE })
  }

  // TODO: Replace "error-overlay" styles to dev tools style.
  return (
    <Overlay>
      <div className="error-overlay-dialog-container" ref={dialogRef}>
        <Dialog
          aria-labelledby="nextjs__container_dev_tools_panel_label"
          aria-describedby="nextjs__container_dev_tools_panel_desc"
          className="error-overlay-dialog-scroll"
          onClose={onClose}
        >
          <DialogContent>
            <DialogHeader></DialogHeader>
            <DialogBody>
              <div>DevToolsPanel</div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </div>
    </Overlay>
  )
}

export const DEV_TOOLS_PANEL_STYLES = `
  [data-nextjs-dialog-overlay] {
    padding: initial;
    top: 10vh;
  }

  [data-nextjs-dialog-backdrop] {
    opacity: 0;
  }
`
