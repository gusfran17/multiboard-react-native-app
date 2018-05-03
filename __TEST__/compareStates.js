export const compareStatesValid = (state, newState, avoid) => {
    const keys = Object.keys(newState);
    for (let keysIndex = 0; keysIndex < keys.length; keysIndex++) {
        let avoidIt = false;
        for (let avoidIndex = 0; avoidIndex < avoid.length; avoidIndex++) {
            if (keys[keysIndex] === avoid[avoidIndex]) {
                avoidIt = true;

            }
        }
        if (!avoidIt) {
            if (newState[keys[keysIndex]] !== state[keys[keysIndex]]) {
                console.log('Attribute: ', keys[keysIndex]);
                console.log('Old state: ', state[keys[keysIndex]]);
                console.log('New state: ', newState[keys[keysIndex]] );
                return false;
            }
        }
    }
    return true;
};
