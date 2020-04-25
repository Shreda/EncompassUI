export const TOGGLE_DRAW = "TOGGLE_DRAW"

export function toggleDraw() {
    return function(dispatch) {
        dispatch({
            type: TOGGLE_DRAW
        })
    }
}
